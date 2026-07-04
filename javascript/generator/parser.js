import { toHexFormat } from '../utils/hex.js';

/**
 * 解析设备描述符字段
 * @param {object} doc - document
 * @returns {{ deviceString: string, manufacturer: string, product: string, serial: string }}
 */
function parseDeviceFields(doc) {
    let tmp;
    let deviceString;
    const ManufacturerStringSource = doc.getElementById("ManufacturerString").value;
    const ProductStringSource = doc.getElementById("ProductString").value;
    const SerialNumberStringSource = doc.getElementById("SerialNumberString").value;

    deviceString = "/* Device Descriptor */\r\n";
    deviceString += "0x12,\t\t// bLength\r\n";
    deviceString += "0x01,\t\t// bDescriptorType\r\n";
    tmp = doc.getElementById("bcdUSB").value;
    deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// bcdUSB\r\n`;
    tmp = doc.getElementById("bDeviceClass").value;
    deviceString += `0x${tmp},\t\t// bDeviceClass\r\n`;
    tmp = doc.getElementById("bDeviceSubClass").value;
    deviceString += `0x${tmp},\t\t// bDeviceSubClass\r\n`;
    tmp = doc.getElementById("bDeviceProtocol").value;
    deviceString += `0x${tmp},\t\t// bDeviceProtocol\r\n`;
    tmp = doc.getElementById("bMaxPacketSize0").value * 1;
    deviceString += `0x${tmp.toString(16)},\t\t// bMaxPacketSize0\r\n`;
    tmp = doc.getElementById("vendorId").value;
    deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// idVendor\r\n`;
    tmp = doc.getElementById("productId").value;
    deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// idProduct\r\n`;
    tmp = doc.getElementById("bcdDevice").value;
    deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// bcdDevice\r\n`;
    deviceString += ManufacturerStringSource.length ? `0x01,\t\t// iManufacturer\r\n` : `0x00,\t\t// iManufacturer\r\n`;
    deviceString += ProductStringSource.length ? `0x02,\t\t// iProduct\r\n` : `0x00,\t\t// iProduct\r\n`;
    deviceString += SerialNumberStringSource.length ? `0x03,\t\t// iSerialNumber\r\n` : `0x00,\t\t// iSerialNumber\r\n`;
    deviceString += `0x01,\t\t// bNumConfigurations\r\n`;

    return { deviceString, ManufacturerStringSource, ProductStringSource, SerialNumberStringSource };
}

/**
 * 解析一个 HID 接口
 */
function parseHIDInterface(interfaceNode, i, interfaceInfo, interfaceDescriptorStringLength, interfaceConfigString, interfaceNum, interfaceConfigTotalLength, toHex) {
    // Returns { needInEp, needOutEp, InEpSize, OutEpSize, stringLen, written }
    // Modifies interfaceInfo[i], interfaceDescriptorStringLength[i], interfaceConfigString[i], interfaceConfigTotalLength
}

/**
 * 解析一个 CDC-ACM 接口
 */
function parseCDCInterface(interfaceNode, i, interfaceInfo, interfaceDescriptorStringLength, interfaceConfigString, interfaceNum, interfaceConfigTotalLength, toHex) {
}

/**
 * 解析一个 WinUSB 接口
 */
function parseWinUSBInterface(interfaceNode, i, interfaceInfo, interfaceDescriptorStringLength, interfaceConfigString, interfaceNum, interfaceConfigTotalLength, toHex) {
}

/**
 * 主解析函数：读取所有 DOM 输入，返回中间数据结构
 * @param {object} doc - document
 * @returns {{
 *   interfaceInfo: Array,
 *   interfaceConfigString: string[],
 *   interfaceConfigTotalLength: number,
 *   interfaceDescriptorStringLength: number[],
 *   interfaceNum: number,
 *   deviceString: string,
 *   ManufacturerStringSource: string,
 *   ProductStringSource: string,
 *   SerialNumberStringSource: string,
 *   configBmAttributes: number,
 *   configMaxPower: number
 * }}
 */
export function parseInterfaces(doc) {
    if (doc.getElementsByClassName("Interface").length == 0) {
        alert("No interface.");
        return null;
    }

    const deviceFields = parseDeviceFields(doc);

    let intf = doc.getElementsByClassName("Interface");
    let interfaceNum = 0;
    let interfaceConfigString = [];
    let interfaceConfigTotalLength = 0;
    let interfaceDescriptorStringLength = [];
    let interfaceInfo = [];

    for (let i = 0; i < intf.length; i++) {
        const interfaceNode = intf[i];
        interfaceConfigString[i] = "";
        interfaceDescriptorStringLength[i] = 0;

        switch (interfaceNode.value) {
            case "HID":
                parseHIDInterfaceInternal(interfaceNode, i, interfaceInfo, interfaceDescriptorStringLength,
                    interfaceConfigString, interfaceNum, interfaceConfigTotalLength);
                interfaceNum += 1;
                break;
            case "CDC-ACM":
                parseCDCInterfaceInternal(interfaceNode, i, interfaceInfo, interfaceDescriptorStringLength,
                    interfaceConfigString, interfaceNum, interfaceConfigTotalLength);
                interfaceNum += 2;
                break;
            case "WinUSB":
                parseWinUSBInterfaceInternal(interfaceNode, i, interfaceInfo, interfaceDescriptorStringLength,
                    interfaceConfigString, interfaceNum, interfaceConfigTotalLength);
                interfaceNum += 1;
                break;
        }
    }

    const busPower = doc.getElementById("busPowered").checked ? 0 : 1;
    const remoteWakeup = doc.getElementById("remoteWakeup").checked ? 1 : 0;
    const bmAttributes = 0x80 | (busPower << 6) | (remoteWakeup << 5);
    const maxPower = doc.getElementById("maxPower").value | 0x00;

    return {
        interfaceInfo,
        interfaceConfigString,
        interfaceConfigTotalLength,
        interfaceDescriptorStringLength,
        interfaceNum,
        deviceString: deviceFields.deviceString,
        ManufacturerStringSource: deviceFields.ManufacturerStringSource,
        ProductStringSource: deviceFields.ProductStringSource,
        SerialNumberStringSource: deviceFields.SerialNumberStringSource,
        configBmAttributes: bmAttributes,
        configMaxPower: maxPower
    };
}
