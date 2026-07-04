import { generateCode } from '../generator/generator.js';
import { getUsbConfigH } from '../templates/usb-config.js';

/**
 * 设置打包状态提示
 * @param {string} text - 状态文本
 * @param {string} [type=''] - 'active' | 'done' | 'error'
 */
function setZipStatus(text, type = '') {
    const el = document.getElementById('zipStatus');
    if (!el) return;
    el.textContent = text;
    el.className = 'zip-status ' + type;
}

window.copyToClipboard = function (elementId) {
    const text = document.getElementById(elementId).textContent;
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
};

export function downloadFile(FileNameElementName = new String, DataElementName = new String) {
    const fileName = document.getElementById(FileNameElementName).value;
    const dataString = document.getElementById(DataElementName).textContent;

    const blob = new Blob([dataString], { type: 'text/plain;charset=utf-8' });
    // 创建对象URL
    const url = URL.createObjectURL(blob);

    // 创建隐藏的下载链接
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    // 将链接添加到文档中
    document.body.appendChild(link);

    // 模拟点击下载
    link.click();

    // 清理资源
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

/**
 * 创建USB包 - 从GitHub获取CherryUSB
 * @param {Object} additionalFiles - 额外添加的文件内容
 * @param {string} chip - 芯片选择
 * @returns {Promise} 返回Promise，成功时触发下载
 */
async function createUSBPackage(additionalFiles = {}, chip = 'STM32') {
    try {
        // 创建ZIP实例
        const zip = new JSZip();
        const usbFolder = zip.folder('USBD');

        // 从GitHub获取CherryUSB文件夹
        setZipStatus('正在从 GitHub 获取 CherryUSB ...', 'active');
        await fetchFromGitHub(usbFolder, chip);

        // 添加额外的文件
        setZipStatus('正在添加生成的文件 ...', 'active');
        for (const [filename, content] of Object.entries(additionalFiles)) {
            usbFolder.file(filename, content);
        }

        // 生成ZIP文件并下载
        setZipStatus('正在打包压缩 ...', 'active');
        const zipContent = await usbFolder.generateAsync({ type: 'blob' });
        saveAs(zipContent, 'USB.zip');
        setZipStatus('下载完成', 'done');

        // 3秒后清除状态
        setTimeout(() => setZipStatus('', ''), 3000);
        console.log('USB包下载完成');
    } catch (error) {
        console.error('创建USB包失败:', error);
        setZipStatus('打包失败: ' + error.message, 'error');
        throw error;
    }
}

/**
 * 判断是否应跳过某个 port 子文件夹
 * @param {string} itemName - 文件夹名称 (如 "fsdev", "ch32")
 * @param {string} parentPath - 父路径
 * @param {string} chip - 芯片选择
 * @returns {boolean}
 */
function shouldSkipPortFolder(itemName, parentPath, chip) {
    // Only filter inside CherryUSB/port/ folder
    if (!parentPath.match(/CherryUSB\/port\/?$/i)) {
        return false;
    }
    const isCHx = (chip === 'CH58x' || chip === 'CH59x');
    if (isCHx) {
        // CH58x/CH59x: include ch32, exclude fsdev
        return itemName.toLowerCase().startsWith('fsdev');
    } else {
        // STM32/CH32F10x: include fsdev, exclude ch32
        return itemName.toLowerCase().startsWith('ch32');
    }
}

/**
 * 从GitHub获取CherryUSB文件夹
 * @param {JSZip} usbFolder - JSZip文件夹实例
 * @param {string} chip - 芯片选择
 */
async function fetchFromGitHub(usbFolder, chip) {
    try {
        // GitHub仓库信息
        const repo = 'serverwei/USB-Descriptor-Generator-for-CherryUSB';
        const branch = 'main';
        const cherryUSBPath = 'CherryUSB';

        // 获取CherryUSB文件夹内容
        const apiUrl = `https://api.github.com/repos/${repo}/contents/${cherryUSBPath}?ref=${branch}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`GitHub API请求失败: ${response.status} ${response.statusText}`);
        }

        const items = await response.json();

        // 递归处理GitHub文件夹内容
        await processGitHubItems(items, usbFolder.folder('CherryUSB'), cherryUSBPath, repo, branch, chip);
    } catch (error) {
        console.error('从GitHub获取CherryUSB失败:', error);
        throw error;
    }
}

/**
 * 递归处理GitHub文件夹内容
 * @param {Array} items - GitHub API返回的文件/文件夹列表
 * @param {JSZip} zipFolder - JSZip文件夹实例
 * @param {string} currentPath - 当前路径
 * @param {string} repo - 仓库路径
 * @param {string} branch - 分支名称
 * @param {string} chip - 芯片选择
 */
async function processGitHubItems(items, zipFolder, currentPath, repo, branch, chip) {
    for (const item of items) {
        if (item.type === 'file') {
            // 下载文件内容
            try {
                const fileResponse = await fetch(item.download_url);
                if (fileResponse.ok) {
                    const fileContent = await fileResponse.blob();
                    // 在ZIP中创建文件，保持相对路径
                    const relativePath = item.path.replace(`${currentPath}/`, '');
                    zipFolder.file(relativePath, fileContent);
                }
            } catch (error) {
                console.warn(`无法下载文件 ${item.path}:`, error);
            }
        } else if (item.type === 'dir') {
            // 检查是否需要跳过该文件夹
            const parentPath = currentPath + '/';
            if (shouldSkipPortFolder(item.name, parentPath, chip)) {
                console.log(`跳过文件夹 (${chip}): ${item.path}`);
                continue;
            }
            // 递归处理子文件夹
            const subFolderUrl = `https://api.github.com/repos/${repo}/contents/${item.path}?ref=${branch}`;
            try {
                const subResponse = await fetch(subFolderUrl);
                if (subResponse.ok) {
                    const subItems = await subResponse.json();
                    const subFolder = zipFolder.folder(item.name);
                    await processGitHubItems(subItems, subFolder, item.path, repo, branch, chip);
                }
            } catch (error) {
                console.warn(`无法访问子文件夹 ${item.path}:`, error);
            }
        }
    }
}

export function downloadZip() {
    if (document.getElementsByClassName("Interface").length == 0) {
        alert("No interface.");
        return;
    }

    const btn = document.getElementById('downloadZipBtn');
    if (btn) btn.disabled = true;
    setZipStatus('正在生成代码 ...', 'active');

    generateCode();

    const usb_descriptor_c_data = document.getElementById("DescriptorcFileData").textContent;
    const usb_descriptor_h_data = document.getElementById("DescriptorhFileData").textContent;
    const usb_device_c_data = document.getElementById("DevicecFileData").textContent;
    const usb_device_h_data = document.getElementById("DevicehFileData").textContent;

    const usb_descriptor_c_name = document.getElementById("DescriptorcFileNameInput").value;
    const usb_descriptor_h_name = document.getElementById("DescriptorhFileNameInput").value;
    const usb_device_c_name = document.getElementById("DevicecFileNameInput").value;
    const usb_device_h_name = document.getElementById("DevicehFileNameInput").value;

    const chip = document.getElementById('chipSelect')?.value || 'STM32';
    const stm32Sub = document.getElementById('stm32SubSelect')?.value || 'Other';

    const additionalFiles = {
        'usb_config.h': getUsbConfigH(chip, stm32Sub),

        [usb_device_c_name]: usb_device_c_data,

        [usb_device_h_name]: usb_device_h_data,

        [usb_descriptor_c_name]: usb_descriptor_c_data,

        [usb_descriptor_h_name]: usb_descriptor_h_data
    };

    createUSBPackage(additionalFiles, chip).finally(() => {
        if (btn) btn.disabled = false;
    });
}
