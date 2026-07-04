// ============================================================
// USB Device Descriptor Generator for CherryUSB — 入口模块
// ============================================================

// 导入工具函数
import { hexValueInput, toHexFormat } from './utils/hex.js';

// 导入 UI 构建函数
import { addHidInterface } from './ui/hid.js';
import { addCdcInterface } from './ui/cdc.js';
import { addWinUsbInterface } from './ui/winusb.js';

// 导入代码生成器
import { generateCode } from './generator/generator.js';

// 导入下载功能
import { downloadFile, downloadZip } from './download/zip.js';

// ============================================================
// Ctrl+A 在代码框内全选代码文本
// ============================================================
document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        const focused = document.activeElement;
        if (focused && focused.closest('.output-code')) {
            e.preventDefault();
            const range = document.createRange();
            range.selectNodeContents(focused);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
});

// ============================================================
// Chip 选择联动：STM32 时显示子选择框
// ============================================================
function initChipSelectToggle() {
    const chipSelect = document.getElementById('chipSelect');
    const stm32Sub = document.getElementById('stm32SubSelect');
    if (chipSelect && stm32Sub) {
        // 初始状态
        stm32Sub.style.display = (chipSelect.value === 'STM32') ? '' : 'none';
        // 切换时联动
        chipSelect.addEventListener('change', function () {
            stm32Sub.style.display = (this.value === 'STM32') ? '' : 'none';
            if (this.value !== 'STM32') {
                stm32Sub.value = 'Other';
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChipSelectToggle);
} else {
    initChipSelectToggle();
}

// ============================================================
// 暴露给 HTML onclick 的全局函数
// ============================================================
window.hexValueInput = hexValueInput;
window.randomHex4 = function (inputId) {
    const v = (Math.random() * 0x10000 | 0).toString(16).toUpperCase().padStart(4, '0');
    document.getElementById(inputId).value = v;
};
window.addHidInterface = addHidInterface;
window.addCdcInterface = addCdcInterface;
window.addWinUsbInterface = addWinUsbInterface;
window.generateCode = generateCode;
window.downloadZip = downloadZip;
window.downloadFile = downloadFile;

/**
 * 复制文本框内容到剪贴板
 * @param {string} textareaId - 目标 textarea 元素的 ID
 */
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
