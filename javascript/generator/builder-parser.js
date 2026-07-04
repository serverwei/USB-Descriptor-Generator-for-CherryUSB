import { toHexFormat } from '../utils/hex.js';
import { stringToWcharArrayStringComplete } from '../utils/string.js';

export function parseAndBuildDescriptors(doc) {
    if (doc.getElementsByClassName("Interface").length == 0) {
        alert("No interface.");
        return null;
    }

    let intf = doc.getElementsByClassName("Interface");
    console.log("intf.length: " + intf.length);
    let tmp;
    let deviceString;
    let ManufacturerStringSource = doc.getElementById("ManufacturerString").value;
    let ProductStringSource = doc.getElementById("ProductString").value;
    let SerialNumberStringSource = doc.getElementById("SerialNumberString").value;

    //device descriptor
    {
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
        if (ManufacturerStringSource.length) {
            deviceString += `0x01,\t\t// iManufacturer\r\n`;
        } else {
            deviceString += `0x00,\t\t// iManufacturer\r\n`;
        }
        if (ProductStringSource.length) {
            deviceString += `0x02,\t\t// iProduct\r\n`;
        } else {
            deviceString += `0x00,\t\t// iProduct\r\n`;
        }
        if (SerialNumberStringSource.length) {
            deviceString += `0x03,\t\t// iSerialNumber\r\n`;
        } else {
            deviceString += `0x00,\t\t// iSerialNumber\r\n`;
        }
        deviceString += `0x01,\t\t// bNumConfigurations\r\n`;
    }

    //Inteface handle
    let interfaceNum = 0;//接口数量
    let interfaceConfigString = [];//接口配置字符串
    let interfaceConfigTotalLength = 0;//接口配置总字节长度
    let interfaceDescriptorString = [];//接口描述符集合
    let interfaceDescriptorStringLength = [];//接口描述符长度集合
    let interfaceInfo = [];//接口信息集合
    if (intf.length) {
        for (let i = 0; i < intf.length; i++) {
            const interfaceNode = intf[i];
            interfaceConfigString[i] = "";
            interfaceDescriptorStringLength[i] = 0;


            switch (interfaceNode.value) {
                case "HID":
                    {
                        interfaceInfo[i] = {};
                        interfaceInfo[i]["Type"] = "HID";

                        const InEpAddr = interfaceNode.getElementsByClassName("InEpAddr")[0].value | 0x80;
                        const OutEpAddr = interfaceNode.getElementsByClassName("OutEpAddr")[0].value | 0x00;
                        const InEpInterval = interfaceNode.getElementsByClassName("InEpInterval")[0].value | 0x00;
                        const OutEpInterval = interfaceNode.getElementsByClassName("OutEpInterval")[0].value | 0x00;
                        let needInEp = false;
                        let needOutEp = false;
                        let InEpSize = 0;
                        let OutEpSize = 0;

                        let stringTmp = "";
                        let stringLen = 0;
                        //Check vendor define
                        interfaceInfo[i]["VendorDefine"] = {};
                        interfaceInfo[i]["VendorDefine"]["Enabled"] = interfaceNode.getElementsByClassName("vendorDefineEnabled")[0].checked;
                        if (interfaceInfo[i]["VendorDefine"]["Enabled"]) {
                            stringLen = 0;
                            const inReId = interfaceNode.getElementsByClassName("vendorDefineInReId")[0].value & 0xFF;
                            let inSize = interfaceNode.getElementsByClassName("vendorDefineInSize")[0].value | 0x00;
                            const outReId = interfaceNode.getElementsByClassName("vendorDefineOutReId")[0].value & 0xFF;
                            let outSize = interfaceNode.getElementsByClassName("vendorDefineOutSize")[0].value | 0x00;
                            stringTmp += "\r\n/* Vendor Define Descriptor */\r\n";
                            stringTmp += "0x06, 0x00, 0xFF,\t// Usage page (Vendor Defined Page 0)\r\n";
                            stringLen += 3;
                            stringTmp += "0x09, 0x01,\t\t// Usage (Vendor Usage 1)\r\n";
                            stringLen += 2;
                            stringTmp += "0xA1, 0x01,\t\t// Collection (Application)\r\n";
                            stringLen += 2;

                            interfaceInfo[i]["VendorDefine"]["Input"] = {};
                            interfaceInfo[i]["VendorDefine"]["Input"]["Enabled"] = inSize ? true : false;
                            interfaceInfo[i]["VendorDefine"]["Input"]["Id"] = inReId;
                            if (inSize) {
                                if (inReId) {
                                    stringTmp += `0x85, 0x${toHexFormat(inReId)},\t\t// Report ID\r\n`;
                                    stringLen += 2;
                                }
                                needInEp = true;
                                InEpSize = InEpSize < (inSize + (inReId ? 1 : 0)) ? (inSize + (inReId ? 1 : 0)) : InEpSize;

                                stringTmp += `0x09, 0x01,\t\t// Usage (Vendor Usage 1)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x00,\t\t// Logical minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0xFF,\t\t// Logical maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report size\r\n`;
                                stringLen += 2;
                                if (inSize <= 255) {
                                    stringTmp += `0x95, 0x${toHexFormat(inSize)},\t\t// Report count\r\n`;
                                    stringLen += 2;
                                } else if (inSize <= 65535) {
                                    stringTmp += `0x96, 0x${toHexFormat(inSize & 0xFF)}, 0x${toHexFormat(inSize >> 8)},\t// Report count\r\n`;
                                    stringLen += 3;
                                }
                                stringTmp += `0x81, 0x02,\t\t// Input (Data,Var,Abs)\r\n`;
                                stringLen += 2;
                            }

                            interfaceInfo[i]["VendorDefine"]["Output"] = {};
                            interfaceInfo[i]["VendorDefine"]["Output"]["Enabled"] = outSize ? true : false;
                            interfaceInfo[i]["VendorDefine"]["Output"]["Id"] = outReId;
                            if (outSize) {
                                if (outReId) {
                                    stringTmp += `0x85, 0x${toHexFormat(outReId)},\t\t// Report ID\r\n`;
                                    stringLen += 2;
                                }
                                needOutEp = true;
                                OutEpSize = OutEpSize < (outSize + (outReId ? 1 : 0)) ? (outSize + (outReId ? 1 : 0)) : OutEpSize;

                                stringTmp += `0x09, 0x01,\t\t// Usage (Vendor Usage 1)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x00,\t\t// Logical minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0xFF,\t\t// Logical maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report size\r\n`;
                                stringLen += 2;
                                if (outSize <= 255) {
                                    stringTmp += `0x95, 0x${outSize.toString(16)},\t\t// Report count\r\n`;
                                    stringLen += 2;
                                } else if (outSize <= 65535) {
                                    stringTmp += `0x96, 0x${toHexFormat(outSize & 0xFF)}, 0x${toHexFormat(outSize >> 8)},\t// Report count\r\n`;
                                    stringLen += 3;
                                }
                                stringTmp += `0x91, 0x02,\t\t// Output (Data,Var,Abs)\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0xC0,\t\t\t// End collection */\r\n`;
                            stringLen += 1;
                            interfaceInfo[i]["VendorDefine"]["Input"]["Size"] = inSize;
                            interfaceInfo[i]["VendorDefine"]["Output"]["Size"] = outSize;
                            interfaceInfo[i]["AutoStartRead"] = interfaceNode.getElementsByClassName("autoStartRead")[0]?.checked ?? true;
                            interfaceInfo[i]["AutoReRead"] = interfaceNode.getElementsByClassName("autoReRead")[0]?.checked ?? true;

                            interfaceDescriptorStringLength[i] += stringLen;
                        }

                        //Check mouse
                        interfaceInfo[i]["Mouse"] = {};
                        interfaceInfo[i]["Mouse"]["Enabled"] = interfaceNode.getElementsByClassName("mouseEnabled")[0].checked;
                        if (interfaceInfo[i]["Mouse"]["Enabled"]) {
                            stringLen = 0;
                            let reportSize = 0;
                            const reportId = interfaceNode.getElementsByClassName("mouseReId")[0].value * 1;
                            let buttonNum = interfaceNode.getElementsByClassName("mouseBtnNum")[0].value * 1;
                            let xMin = interfaceNode.getElementsByClassName("mouseXMin")[0].value * 1;
                            let xMax = interfaceNode.getElementsByClassName("mouseXMax")[0].value * 1;
                            let yMin = interfaceNode.getElementsByClassName("mouseYMin")[0].value * 1;
                            let yMax = interfaceNode.getElementsByClassName("mouseYMax")[0].value * 1;
                            const wheel = Boolean(interfaceNode.getElementsByClassName("mouseWheelEnabled")[0].checked);
                            const acPan = Boolean(interfaceNode.getElementsByClassName("mouseAcPanEnabled")[0].checked);

                            stringTmp += "\r\n/* Mouse Descriptor */\r\n";
                            stringTmp += `0x05, 0x01,\t\t// Usage Page (Generic Desktop)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x02,\t\t// Usage (Mouse)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x01,\t\t// Collection (Application)\r\n`;
                            stringLen += 2;

                            interfaceInfo[i]["Mouse"]["Id"] = {};
                            interfaceInfo[i]["Mouse"]["Id"]["Value"] = reportId;
                            interfaceInfo[i]["Mouse"]["Id"]["Shift"] = 0;
                            if (reportId) {
                                reportSize += 1;
                                stringTmp += `0x85, 0x${toHexFormat(reportId)},\t\t// Report ID\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0x09, 0x01,\t\t// Usage (Pointer)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x00,\t\t// Collection (Physical))\r\n`;
                            stringLen += 2;

                            interfaceInfo[i]["Mouse"]["Button"] = {};
                            interfaceInfo[i]["Mouse"]["Button"]["Enabled"] = buttonNum ? true : false;
                            interfaceInfo[i]["Mouse"]["Button"]["Count"] = buttonNum;
                            if (buttonNum) {
                                let bytes = 0;
                                buttonNum = buttonNum > 16 ? 16 : buttonNum;
                                bytes = buttonNum > 8 ? 2 : 1;
                                reportSize += bytes;

                                stringTmp += `0x05, 0x09,\t\t// Usage Page (Button)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x19, 0x01,\t\t// Usage Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x29, 0x${toHexFormat(buttonNum)},\t\t// Usage Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x00,\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x01,\t\t// Logical Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x01,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x${toHexFormat(buttonNum)},\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x02,\t\t// Input (Data, Var, Abs)\r\n`;
                                stringLen += 2;
                                if (buttonNum & 0b111) {
                                    let bits = buttonNum & 0b111;
                                    bits = 8 - bits;
                                    stringTmp += `0x75, 0x01,\t\t// Report Size\r\n`;
                                    stringLen += 2;
                                    stringTmp += `0x95, 0x${toHexFormat(bits)},\t\t// Report Count\r\n`;
                                    stringLen += 2;
                                    stringTmp += `0x81, 0x03,\t\t// Input (Const, Var, Abs)\r\n`;
                                    stringLen += 2;
                                }
                                interfaceInfo[i]["Mouse"]["Button"]["Shift"] = reportId ? 1 : 0;
                                interfaceInfo[i]["Mouse"]["Button"]["Bytes"] = bytes;
                            } else {
                                interfaceInfo[i]["Mouse"]["Button"]["Shift"] = 0;
                                interfaceInfo[i]["Mouse"]["Button"]["Bytes"] = 0;
                            }

                            // X
                            interfaceInfo[i]["Mouse"]["X"] = {};
                            interfaceInfo[i]["Mouse"]["X"]["Max"] = xMax;
                            interfaceInfo[i]["Mouse"]["X"]["Min"] = xMin;
                            interfaceInfo[i]["Mouse"]["X"]["Shift"] = reportSize;
                            stringTmp += `0x05, 0x01,\t\t// Usage Page (Generic Desktop)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x30,\t\t// Usage (X)\r\n`;
                            stringLen += 2;
                            if ((xMin >= -128 && xMin < 128) && (xMax >= -128 && xMax < 128)) {
                                interfaceInfo[i]["Mouse"]["X"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x15, 0x${toHexFormat(xMin)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x${toHexFormat(xMax)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["X"]["Bytes"] = 2;
                                reportSize += 2;

                                stringTmp += `0x16, 0x${toHexFormat((xMin >>> 0) & 0xFF)}, 0x${toHexFormat(((xMin >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x26, 0x${toHexFormat((xMax >>> 0) & 0xFF)}, 0x${toHexFormat(((xMax >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x75, 0x10,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            }

                            // Y
                            interfaceInfo[i]["Mouse"]["Y"] = {};
                            interfaceInfo[i]["Mouse"]["Y"]["Max"] = yMax;
                            interfaceInfo[i]["Mouse"]["Y"]["Min"] = yMin;
                            interfaceInfo[i]["Mouse"]["Y"]["Shift"] = reportSize;
                            stringTmp += `0x09, 0x31,\t\t// Usage (Y)\r\n`;
                            stringLen += 2;
                            if ((yMin >= -128 && yMin < 128) && (yMax >= -128 && yMax < 128)) {
                                interfaceInfo[i]["Mouse"]["Y"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x15, 0x${toHexFormat(yMin)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x${toHexFormat(yMax)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["Y"]["Bytes"] = 2;
                                reportSize += 2;

                                stringTmp += `0x16, 0x${toHexFormat((yMin >>> 0) & 0xFF)}, 0x${toHexFormat(((yMin >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x26, 0x${toHexFormat((yMax >>> 0) & 0xFF)}, 0x${toHexFormat(((yMax >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x75, 0x10,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            }

                            interfaceInfo[i]["Mouse"]["Wheel"] = {};
                            interfaceInfo[i]["Mouse"]["Wheel"]["Enabled"] = wheel;
                            if (wheel) {
                                interfaceInfo[i]["Mouse"]["Wheel"]["Shift"] = reportSize;
                                interfaceInfo[i]["Mouse"]["Wheel"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x09, 0x38,\t\t// Usage (Wheel)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x81,\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x7F,\t\t// Logical Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["Wheel"]["Shift"] = 0;
                                interfaceInfo[i]["Mouse"]["Wheel"]["Bytes"] = 0;
                            }

                            interfaceInfo[i]["Mouse"]["AcPan"] = {};
                            interfaceInfo[i]["Mouse"]["AcPan"]["Enabled"] = acPan;
                            if (acPan) {
                                interfaceInfo[i]["Mouse"]["AcPan"]["Shift"] = reportSize;
                                interfaceInfo[i]["Mouse"]["AcPan"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x05, 0x0C,\t\t// Usage Page (Consumer Page)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x0A, 0x38, 0x02,\t// Usage (AC Pan)\r\n`;
                                stringLen += 3;
                                stringTmp += `0x15, 0x81,\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x7F,\t\t// Logical Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["AcPan"]["Shift"] = 0;
                                interfaceInfo[i]["Mouse"]["AcPan"]["Bytes"] = 0;
                            }

                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;
                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;

                            interfaceDescriptorStringLength[i] += stringLen;
                            needInEp = true;
                            InEpSize = InEpSize < reportSize ? reportSize : InEpSize;
                        }

                        //Check keyboard
                        interfaceInfo[i]["Keyboard"] = {};
                        interfaceInfo[i]["Keyboard"]["Enabled"] = interfaceNode.getElementsByClassName("keyboardEnabled")[0].checked;
                        if (interfaceInfo[i]["Keyboard"]["Enabled"]) {
                            stringLen = 0;
                            let reportSize = 0;
                            let reportId = interfaceNode.getElementsByClassName("keyboardReId")[0].value & 0xFF;
                            let keyNum = interfaceNode.getElementsByClassName("keyboardKeyNumber")[0].value & 0xFF;

                            stringTmp += "\r\n/* Keyboard Descriptor */\r\n";
                            stringTmp += `0x05, 0x01,\t\t// Usage Page (Generic Desktop)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x06,\t\t// Usage (Keyboard)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x01,\t\t// Collection (Application)\r\n`;
                            stringLen += 2;
                            interfaceInfo[i]["Keyboard"]["Id"] = {};
                            interfaceInfo[i]["Keyboard"]["Id"]["Value"] = reportId;
                            interfaceInfo[i]["Keyboard"]["Id"]["Shift"] = 0;
                            if (reportId) {
                                stringTmp += `0x85, 0x${toHexFormat(reportId)},\t\t// Report ID\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0x05, 0x07,\t\t// Usage Page (Key Codes)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x19, 0xE0,\t\t// Usage Minimum (224)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x29, 0xE7,\t\t// Usage Maximum (231)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x15, 0x00,\t\t// Logical Minimum (0)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x25, 0x01,\t\t// Logical Maximum (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x01,\t\t// Report Size (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x08,\t\t// Report Count (8)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x02,\t\t// Input (Data,Variable,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x01,\t\t// Report Count (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x08,\t\t// Report Size (8)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x01,\t\t// Input (Constant)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x01,\t\t// Report Size (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x03,\t\t// Report Count (3)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x05, 0x08,\t\t// Usage Page (LEDs)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x19, 0x01,\t\t// Usage Minimum (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x29, 0x03,\t\t// Usage Maximum (3)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x91, 0x02,\t\t// Output (Data,Variable,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x01,\t\t// Report Size (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x05,\t\t// Report Count (5)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x91, 0x01,\t\t// Output (Constant,Array,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x26, 0xFF, 0x00,\t// Logical Maximum (255)\r\n`;
                            stringLen += 3;
                            stringTmp += `0x05, 0x07,\t\t// Usage Page (Key Codes)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x19, 0x00,\t\t// Usage Minimum (0)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x2A, 0xDD, 0x00,\t// Usage Maximum (221)\r\n`;
                            stringLen += 3;
                            stringTmp += `0x75, 0x08,\t\t// Report Size (8)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x${toHexFormat(keyNum)},\t\t// Report Count (${keyNum})\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x00,\t\t// Input(Data,Array,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;

                            interfaceInfo[i]["Keyboard"]["FunctionKey"] = {};
                            interfaceInfo[i]["Keyboard"]["FunctionKey"]["Shift"] = reportId ? 1 : 0;
                            interfaceInfo[i]["Keyboard"]["FunctionKey"]["Bytes"] = 1;
                            interfaceInfo[i]["Keyboard"]["NormalKey"] = {};
                            interfaceInfo[i]["Keyboard"]["NormalKey"]["Shift"] = 2 + (reportId ? 1 : 0);
                            interfaceInfo[i]["Keyboard"]["NormalKey"]["Bytes"] = keyNum;
                            interfaceInfo[i]["Keyboard"]["NormalKey"]["Number"] = keyNum;

                            interfaceDescriptorStringLength[i] += stringLen;
                            needInEp = true;
                            reportSize = 2 + keyNum + (reportId ? 1 : 0);
                            InEpSize = InEpSize < reportSize ? reportSize : InEpSize;
                        }

                        //Consumer
                        interfaceInfo[i]["Consumer"] = {};
                        interfaceInfo[i]["Consumer"]["Enabled"] = interfaceNode.getElementsByClassName("consumerEnabled")[0].checked;
                        if (interfaceInfo[i]["Consumer"]["Enabled"]) {
                            stringLen = 0;
                            let reportSize = 0;
                            let reportId = interfaceNode.getElementsByClassName("consumerReId")[0].value & 0xFF;
                            let keyNum = interfaceNode.getElementsByClassName("consumerKeyNumber")[0].value & 0xFF;
                            keyNum = keyNum > 2 ? 2 : keyNum;

                            stringTmp += "\r\n/* Comsumer Descriptor */\r\n";
                            stringTmp += `0x05, 0x0C,\t\t// Usage Page (Consumer Page)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x01,\t\t// Usage (Consumer Control)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x01,\t\t// Collection (Application)\r\n`;
                            stringLen += 2;
                            interfaceInfo[i]["Consumer"]["Id"] = {};
                            interfaceInfo[i]["Consumer"]["Id"]["Value"] = reportId;
                            interfaceInfo[i]["Consumer"]["Id"]["Shift"] = 0;
                            if (reportId) {
                                stringTmp += `0x85, 0x${toHexFormat(reportId)},\t\t// Report ID\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0x15, 0x01,\t\t// Logical Minimum\r\n`;
                            stringLen += 2;
                            stringTmp += `0x26, 0xFF, 0x02,\t// Logical Maximum\r\n`;
                            stringLen += 3;
                            stringTmp += `0x19, 0x01,\t\t// Usage Minimum\r\n`;
                            stringLen += 2;
                            stringTmp += `0x2A, 0xFF, 0x02,\t// Usage Maximum\r\n`;
                            stringLen += 3;
                            stringTmp += `0x75, 0x10,\t\t// Report Size\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x${toHexFormat(keyNum)},\t\t// Report Count\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x00,\t\t// Input (Data, Array, Abs)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;
                            interfaceInfo[i]["Consumer"]["Key"] = {};
                            interfaceInfo[i]["Consumer"]["Key"]["Shift"] = reportId ? 1 : 0;
                            interfaceInfo[i]["Consumer"]["Key"]["Number"] = keyNum;
                            interfaceInfo[i]["Consumer"]["Key"]["Bytes"] = keyNum * 2;

                            interfaceDescriptorStringLength[i] += stringLen;

                            needInEp = true;
                            reportSize = (reportId ? 1 : 0) + keyNum * 2;
                            InEpSize = InEpSize < reportSize ? reportSize : InEpSize;
                        }

                        //System Control
                        interfaceInfo[i]["SystemControl"] = {};
                        interfaceInfo[i]["SystemControl"]["Enabled"] = interfaceNode.getElementsByClassName("systemControlEnabled")[0].checked;
                        if (interfaceInfo[i]["SystemControl"]["Enabled"]) {
                            stringLen = 0;
                            let reportSize = 0;
                            let reportId = interfaceNode.getElementsByClassName("systemControlReId")[0].value & 0xFF;
                            let keyNum = interfaceNode.getElementsByClassName("systemControlKeyNumber")[0].value & 0xFF;
                            keyNum = keyNum > 2 ? 2 : keyNum;
                            let padding = 8 - keyNum * 2;

                            stringTmp += "\r\n/* System Control Descriptor */\r\n";
                            stringTmp += `0x05, 0x01,\t\t// Usage Page (Generic Desktop)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x80,\t\t// Usage (System Control)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x01,\t\t// Collection (Application)\r\n`;
                            stringLen += 2;
                            interfaceInfo[i]["SystemControl"]["Id"] = {};
                            interfaceInfo[i]["SystemControl"]["Id"]["Value"] = reportId;
                            interfaceInfo[i]["SystemControl"]["Id"]["Shift"] = 0;
                            if (reportId) {
                                stringTmp += `0x85, 0x${toHexFormat(reportId)},\t\t// Report ID\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0x75, 0x02,\t\t// Report Size\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x${toHexFormat(keyNum)},\t\t// Report Count\r\n`;
                            stringLen += 2;
                            stringTmp += `0x15, 0x01,\t\t// Logical Minimum\r\n`;
                            stringLen += 2;
                            stringTmp += `0x25, 0x03,\t\t// Logical Maximum\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x82,\t\t// Usage (System Sleep)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x81,\t\t// Usage (System Power Down)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x83,\t\t// Usage (System Wake Up)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x60,\t\t// Input (Data, Var, Relative)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x${toHexFormat(padding)},\t\t// Report Size (padding)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x03,\t\t// Input (Const, Var, Abs)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;
                            interfaceInfo[i]["SystemControl"]["Key"] = {};
                            interfaceInfo[i]["SystemControl"]["Key"]["Shift"] = reportId ? 1 : 0;
                            interfaceInfo[i]["SystemControl"]["Key"]["Number"] = keyNum;
                            interfaceInfo[i]["SystemControl"]["Key"]["Bytes"] = 1;

                            interfaceDescriptorStringLength[i] += stringLen;

                            needInEp = true;
                            reportSize = (reportId ? 1 : 0) + 1;
                            InEpSize = InEpSize < reportSize ? reportSize : InEpSize;
                        }

                        console.log(interfaceInfo[i]);

                        // interfaceDescriptorString[i] = stringTmp;

                        interfaceInfo[i]["Descriptor"] = {};
                        interfaceInfo[i]["Descriptor"]["String"] = stringTmp;
                        interfaceInfo[i]["Descriptor"]["Bytes"] = interfaceDescriptorStringLength[i];

                        //Full interface descriptor
                        {
                            stringLen = 0;
                            stringTmp = "\r\n/* Interface Descriptor */\r\n"

                            stringTmp += `0x09,\t\t\t// bLength\r\n`;
                            stringLen += 1;
                            stringTmp += `0x04,\t\t\t// bDescriptorType (Interface)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat(interfaceNum)},\t\t\t// bInterfaceNumber: Interface number\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bAlternateSetting: Alternate setting\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat((needInEp ? 1 : 0) + (needOutEp ? 1 : 0))},\t\t\t// bNumEndpoints\r\n`;
                            stringLen += 1;
                            stringTmp += `0x03,\t\t\t// bInterfaceClass: HID\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat((interfaceInfo[i]["VendorDefine"]["Enabled"] && (interfaceInfo[i]["VendorDefine"]["Input"]["Id"] || interfaceInfo[i]["VendorDefine"]["Output"]["Id"])) || (interfaceInfo[i]["Mouse"]["Enabled"] && interfaceInfo[i]["Mouse"]["Id"]["Value"]) || (interfaceInfo[i]["Keyboard"]["Enabled"] && interfaceInfo[i]["Keyboard"]["Id"]["Value"]) || (interfaceInfo[i]["Consumer"]["Enabled"] && interfaceInfo[i]["Consumer"]["Id"]["Value"]) || (interfaceInfo[i]["SystemControl"]["Enabled"] && interfaceInfo[i]["SystemControl"]["Id"]["Value"]) ? 0 : 1)},\t\t\t// bInterfaceSubClass\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bInterfaceProtocol: 0=none, 1=keyboard, 2=mouse\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// iInterface: Index of string descriptor\r\n`;
                            stringLen += 1;

                            stringTmp += "\r\n/* HID Descriptor */\r\n";
                            stringTmp += `0x09,\t\t\t// bLength\r\n`;
                            stringLen += 1;
                            stringTmp += `0x21,\t\t\t// bDescriptorType (HID)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x11, 0x01,\t// bcdHID\r\n`;
                            stringLen += 2;
                            stringTmp += `0x00,\t\t\t// bCountryCode\r\n`;
                            stringLen += 1;
                            stringTmp += `0x01,\t\t\t// bNumDescriptors: Number of HID class descriptors to follow\r\n`;
                            stringLen += 1;
                            stringTmp += `0x22,\t\t\t// bDescriptorType (Report)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat(interfaceDescriptorStringLength[i] & 0xFF)}, 0x${toHexFormat(interfaceDescriptorStringLength[i] >> 8)},\t// wItemLength\r\n`;
                            stringLen += 2;

                            interfaceInfo[i]["Endpoint"] = {};
                            interfaceInfo[i]["Endpoint"]["In"] = {};
                            interfaceInfo[i]["Endpoint"]["In"]["Enabled"] = needInEp;
                            if (needInEp) {
                                stringTmp += "\r\n/* Input Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(InEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x03,\t\t\t// bmAttributes: Interrupt endpoint\r\n`;
                                stringLen += 1;
                                const inEpPktSize = InEpSize > 64 ? 64 : InEpSize; // FS interrupt EP max 64 bytes
                                stringTmp += `0x${toHexFormat(inEpPktSize & 0xFF)}, 0x${toHexFormat(inEpPktSize >> 8)},\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x${toHexFormat(InEpInterval)},\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;

                                interfaceInfo[i]["Endpoint"]["In"]["Addr"] = InEpAddr;
                                interfaceInfo[i]["Endpoint"]["In"]["Size"] = InEpSize;
                                interfaceInfo[i]["Endpoint"]["In"]["Interval"] = InEpInterval;
                            } else {
                                interfaceInfo[i]["Endpoint"]["In"]["Addr"] = 0;
                                interfaceInfo[i]["Endpoint"]["In"]["Size"] = 0;
                                interfaceInfo[i]["Endpoint"]["In"]["Interval"] = 0;
                            }

                            interfaceInfo[i]["Endpoint"]["Out"] = {};
                            interfaceInfo[i]["Endpoint"]["Out"]["Enabled"] = needOutEp;
                            if (needOutEp) {
                                stringTmp += "\r\n/* Output Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(OutEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x03,\t\t\t// bmAttributes: Interrupt endpoint\r\n`;
                                stringLen += 1;
                                const outEpPktSize = OutEpSize > 64 ? 64 : OutEpSize; // FS interrupt EP max 64 bytes
                                stringTmp += `0x${toHexFormat(outEpPktSize & 0xFF)}, 0x${toHexFormat(outEpPktSize >> 8)},\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x${toHexFormat(OutEpInterval)},\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;

                                interfaceInfo[i]["Endpoint"]["Out"]["Addr"] = OutEpAddr;
                                interfaceInfo[i]["Endpoint"]["Out"]["Size"] = OutEpSize;
                                interfaceInfo[i]["Endpoint"]["Out"]["Interval"] = OutEpInterval;
                            } else {
                                interfaceInfo[i]["Endpoint"]["Out"]["Addr"] = 0;
                                interfaceInfo[i]["Endpoint"]["Out"]["Size"] = 0;
                                interfaceInfo[i]["Endpoint"]["Out"]["Interval"] = 0;
                            }
                        }

                        interfaceConfigString[i] = stringTmp;
                        interfaceConfigTotalLength += stringLen;
                        interfaceNum += 1;

                    }
                    break;

                case "CDC-ACM":
                    {
                        interfaceInfo[i] = {};
                        interfaceInfo[i]["Type"] = "CDC-ACM";
                        const InEpAddr = interfaceNode.getElementsByClassName("InEpAddr")[0].value | 0x80;
                        const OutEpAddr = interfaceNode.getElementsByClassName("OutEpAddr")[0].value | 0x00;
                        const IntEpAddr = interfaceNode.getElementsByClassName("IntEpAddr")[0].value | 0x80;
                        const RxLength = interfaceNode.getElementsByClassName("CDC_RX_Length")[0].value * 1;
                        const TxLength = interfaceNode.getElementsByClassName("CDC_TX_Length")[0].value * 1;
                        const MaxMps = interfaceNode.getElementsByClassName("CDC_MAX_MPS")[0].value * 1;

                        interfaceInfo[i]["IntEpAddr"] = IntEpAddr;
                        interfaceInfo[i]["InEpAddr"] = InEpAddr;
                        interfaceInfo[i]["OutEpAddr"] = OutEpAddr;
                        interfaceInfo[i]["RxLength"] = RxLength;
                        interfaceInfo[i]["TxLength"] = TxLength;
                        interfaceInfo[i]["MaxMps"] = MaxMps;
                        interfaceInfo[i]["AutoStartRead"] = interfaceNode.getElementsByClassName("autoStartRead")[0]?.checked ?? true;
                        interfaceInfo[i]["AutoReRead"] = interfaceNode.getElementsByClassName("autoReRead")[0]?.checked ?? true;

                        let stringTmp = "\r\n/* CDC-ACM Interface */\r\n";
                        let byteCount = 0;
                        {

                            stringTmp += `\r\n0x08,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x0B,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum},\t/* bFirstInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bInterfaceCount */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bFunctionClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bFunctionSubClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bFunctionProtocol */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* iFunction */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x09,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x04,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum},\t/* bInterfaceNumber */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bAlternateSetting */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x01,\t/* bNumEndpoints */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bInterfaceClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bInterfaceSubClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bInterfaceProtocol */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* iInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x10, 0x01,\t/* bcdCDC */`;
                            byteCount += 2;

                            stringTmp += `\r\n0x05,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x01,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bmCapabilities */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum + 1},\t/* bDataInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x04,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bmCapabilities */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x06,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum},\t/* bMasterInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum + 1},\t/* bSlaveInterface0 */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x07,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(IntEpAddr)},\t/* bEndpointAddress */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x03,\t/* bmAttributes */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x08, 0x00,\t/* wMaxPacketSize */`;
                            byteCount += 2;

                            stringTmp += `\r\n0x01,\t/* bInterval */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x09,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x04,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum + 1},\t/* bInterfaceNumber */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bAlternateSetting */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bNumEndpoints */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x0A,\t/* bInterfaceClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bInterfaceSubClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bInterfaceProtocol */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* iInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x07,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(OutEpAddr)},\t/* bEndpointAddress */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bmAttributes */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(MaxMps & 0xFF)}, 0x${toHexFormat(MaxMps >> 8)},\t/* wMaxPacketSize */`;
                            byteCount += 2; // WBVAL占用2字节

                            stringTmp += `\r\n0x00,\t/* bInterval */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x07,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(InEpAddr)},\t/* bEndpointAddress */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bmAttributes */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(MaxMps & 0xFF)}, 0x${toHexFormat(MaxMps >> 8)},\t/* wMaxPacketSize */`;
                            byteCount += 2;

                            stringTmp += `\r\n0x00,\t/* bInterval */`;
                            byteCount += 1;
                        }
                        interfaceConfigString[i] = stringTmp + `\r\n`;
                        interfaceConfigTotalLength += byteCount;
                        interfaceNum += 2;
                    }
                    break;

                case "WinUSB":
                    {
                        const InEpEnabled = interfaceNode.getElementsByClassName("WinUSB_Enabled_InEp")[0].checked;
                        const OutEpEnabled = interfaceNode.getElementsByClassName("WinUSB_Enabled_OutEp")[0].checked;
                        const InEpAddr = interfaceNode.getElementsByClassName("InEpAddr")[0].value | 0x80;
                        const OutEpAddr = interfaceNode.getElementsByClassName("OutEpAddr")[0].value | 0x00;
                        const RxLength = interfaceNode.getElementsByClassName("WinUSB_RX_Length")[0].value * 1;
                        const TxLength = interfaceNode.getElementsByClassName("WinUSB_TX_Length")[0].value * 1;
                        let GUID0 = interfaceNode.getElementsByClassName("WinUSB_GUID_0")[0].value;
                        let GUID1 = interfaceNode.getElementsByClassName("WinUSB_GUID_1")[0].value;
                        let GUID2 = interfaceNode.getElementsByClassName("WinUSB_GUID_2")[0].value;
                        let GUID3 = interfaceNode.getElementsByClassName("WinUSB_GUID_3")[0].value;
                        let GUID4 = interfaceNode.getElementsByClassName("WinUSB_GUID_4")[0].value;
                        while (GUID0.length < 8) {
                            GUID0 = "0" + GUID0;
                        }
                        while (GUID1.length < 4) {
                            GUID1 = "0" + GUID1;
                        }
                        while (GUID2.length < 4) {
                            GUID2 = "0" + GUID2;
                        }
                        while (GUID3.length < 4) {
                            GUID3 = "0" + GUID3;
                        }
                        while (GUID4.length < 12) {
                            GUID4 = "0" + GUID4;
                        }
                        let stringLen = 0;
                        let stringTmp = "";

                        if (!InEpEnabled && !OutEpEnabled) {
                            // skip this interface
                        } else {
                            interfaceInfo[i] = {};
                        interfaceInfo[i]["Type"] = "WinUSB";
                        interfaceInfo[i]["InEpEnabled"] = InEpEnabled;
                        interfaceInfo[i]["OutEpEnabled"] = OutEpEnabled;
                        interfaceInfo[i]["InEpAddr"] = InEpAddr;
                        interfaceInfo[i]["OutEpAddr"] = OutEpAddr;
                        interfaceInfo[i]["RxLength"] = RxLength;
                        interfaceInfo[i]["TxLength"] = TxLength;
                        interfaceInfo[i]["AutoStartRead"] = interfaceNode.getElementsByClassName("autoStartRead")[0]?.checked ?? true;
                        interfaceInfo[i]["AutoReRead"] = interfaceNode.getElementsByClassName("autoReRead")[0]?.checked ?? true;

                        {
                            stringTmp = "\r\n/* WinUSB */\r\n";
                            stringTmp += "\r\n/* Interface */\r\n";
                            stringTmp += `0x09,\t\t\t// bLength\r\n`;
                            stringLen += 1;
                            stringTmp += `0x04,\t\t\t// bDescriptorType (Interface)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat(interfaceNum)},\t\t\t// bInterfaceNumber: Interface number\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bAlternateSetting: Alternate setting\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat((InEpEnabled ? 1 : 0) + (OutEpEnabled ? 1 : 0))},\t\t\t// bNumEndpoints\r\n`;
                            stringLen += 1;
                            stringTmp += `0xFF,\t\t\t// bInterfaceClass\r\n`;
                            stringLen += 1;
                            stringTmp += `0xFF,\t\t\t// bInterfaceSubClass\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bInterfaceProtocol\r\n`;
                            stringLen += 1;
                            stringTmp += `0x04,\t\t\t// iInterface: Index of string descriptor\r\n`;
                            stringLen += 1;

                            if (InEpEnabled) {
                                stringTmp += "\r\n/* Input Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(InEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x02,\t\t\t// bmAttributes: bulk endpoint\r\n`;
                                stringLen += 1;
                                stringTmp += `0x40, 0x00,\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x00,\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;
                            }

                            if (OutEpEnabled) {
                                stringTmp += "\r\n/* Input Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(OutEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x02,\t\t\t// bmAttributes: bulk endpoint\r\n`;
                                stringLen += 1;
                                stringTmp += `0x40, 0x00,\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x00,\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;
                            }
                        }
                        interfaceConfigString[i] = stringTmp + `\r\n`;
                        interfaceConfigTotalLength += stringLen;

                        {
                            //WinUSB descriptor
                            stringTmp = "\r\n/* WinUSB Descriptor*/\r\n";
                            stringTmp += `\
                            \r\n#pragma pack(push, 4)
                            \r\nconst unsigned char Intf${interfaceNum}_WCID_StringDescriptor_MSOS[18] = {\
                            \r\n///////////////////////////////////////\
                            \r\n/// MS OS string descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x12,   /* bLength */\
                            \r\n0x03,   /* bDescriptorType */\
                            \r\n/* MSFT100 */\
                            \r\n'M', 0x00, 'S', 0x00, 'F', 0x00, 'T', 0x00, /* wcChar_7 */\
                            \r\n'1', 0x00, '0', 0x00, '0', 0x00,            /* wcChar_7 */\
                            \r\n0x17,                                       /* bVendorCode */\
                            \r\n0x00,                                       /* bReserved */\
                            \r\n};\
                            \r\n\
                            \r\nconst unsigned char Intf${interfaceNum}_WINUSB_WCIDDescriptor[40] = {
                            \r\n///////////////////////////////////////\
                            \r\n/// WCID descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x28, 0x00, 0x00, 0x00,                   /* dwLength */\
                            \r\n0x00, 0x01,                               /* bcdVersion */\
                            \r\n0x04, 0x00,                               /* wIndex */\
                            \r\n0x01,                                     /* bCount */\
                            \r\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* bReserved_7 */\
                            \r\n\
                            \r\n///////////////////////////////////////\
                            \r\n/// WCID function descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x00, /* bFirstInterfaceNumber */\
                            \r\n0x01, /* bReserved */\
                            \r\n/* WINUSB */\
                            \r\n'W', 'I', 'N', 'U', 'S', 'B', 0x00, 0x00, /* cCID_8 */\
                            \r\n/*  */\
                            \r\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* cSubCID_8 */\
                            \r\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00,             /* bReserved_6 */\
                            \r\n};\
                            \r\n\
                            \r\nconst unsigned char Intf${interfaceNum}_WINUSB_IF0_WCIDProperties [142] = {\
                            \r\n///////////////////////////////////////\
                            \r\n/// WCID property descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x8e, 0x00, 0x00, 0x00,                           /* dwLength */\
                            \r\n0x00, 0x01,                                       /* bcdVersion */\
                            \r\n0x05, 0x00,                                       /* wIndex */\
                            \r\n0x01, 0x00,                                       /* wCount */\
                            \r\n\
                            \r\n///////////////////////////////////////\
                            \r\n/// registry propter descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x84, 0x00, 0x00, 0x00,                           /* dwSize */\
                            \r\n0x01, 0x00, 0x00, 0x00,                           /* dwPropertyDataType */\
                            \r\n0x28, 0x00,                                       /* wPropertyNameLength */\
                            \r\n/* DeviceInterfaceGUID */\
                            \r\n'D', 0x00, 'e', 0x00, 'v', 0x00, 'i', 0x00,       /* wcName_20 */\
                            \r\n'c', 0x00, 'e', 0x00, 'I', 0x00, 'n', 0x00,       /* wcName_20 */\
                            \r\n't', 0x00, 'e', 0x00, 'r', 0x00, 'f', 0x00,       /* wcName_20 */\
                            \r\n'a', 0x00, 'c', 0x00, 'e', 0x00, 'G', 0x00,       /* wcName_20 */\
                            \r\n'U', 0x00, 'I', 0x00, 'D', 0x00, 0x00, 0x00,      /* wcName_20 */\
                            \r\n0x4e, 0x00, 0x00, 0x00,                           /* dwPropertyDataLength */\
                            \r\n/* {${GUID0}-${GUID1}-${GUID2}-${GUID3}-${GUID4}} */\
                            \r\n'{', 0x00, '${GUID0[0]}', 0x00, '${GUID0[1]}', 0x00, '${GUID0[2]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID0[3]}', 0x00, '${GUID0[4]}', 0x00, '${GUID0[5]}', 0x00, '${GUID0[6]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID0[7]}', 0x00, '-', 0x00, '${GUID1[0]}', 0x00, '${GUID1[1]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID1[2]}', 0x00, '${GUID1[3]}', 0x00, '-', 0x00, '${GUID2[0]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID2[1]}', 0x00, '${GUID2[2]}', 0x00, '${GUID2[3]}', 0x00, '-', 0x00,       /* wcData_39 */\
                            \r\n'${GUID3[0]}', 0x00, '${GUID3[1]}', 0x00, '${GUID3[2]}', 0x00, '${GUID3[3]}', 0x00,       /* wcData_39 */\
                            \r\n'-', 0x00, '${GUID4[0]}', 0x00, '${GUID4[1]}', 0x00, '${GUID4[2]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID4[3]}', 0x00, '${GUID4[4]}', 0x00, '${GUID4[5]}', 0x00, '${GUID4[6]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID4[7]}', 0x00, '${GUID4[8]}', 0x00, '${GUID4[9]}', 0x00, '${GUID4[10]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID4[11]}', 0x00, '}', 0x00, 0x00, 0x00,                 /* wcData_39 */\
                            \r\n};\
                            \r\n\
                            \r\nconst unsigned char *Intf${interfaceNum}_WINUSB_IFx_WCIDProperties[] = {\
                            \r\n    Intf${interfaceNum}_WINUSB_IF0_WCIDProperties,\
                            \r\n};\
                            \r\n\
                            \r\n#pragma pack(pop)\
                            \r\n\
                            `;

                            interfaceInfo[i]["msosv1_desc"] = stringTmp;

                        }

                        interfaceNum += 1;
                        } // end else (skip case)
                    }
                    break;

                default:
                    break;
            }
        }
    }

    //Configuration descriptor
    let configString = "\r\n/* Configuration Descriptor */\r\n";
    {

        let configLen = 0;
        const busPower = doc.getElementById("busPowered").checked ? 0 : 1;
        const remoteWakeup = doc.getElementById("remoteWakeup").checked ? 1 : 0;
        let bmAttributes = 0x80 | (busPower << 6) | (remoteWakeup << 5);
        const maxPower = doc.getElementById("maxPower").value | 0x00;

        interfaceConfigTotalLength += 9;
        configString += `0x09,\t\t\t// bLength\r\n`;
        configLen += 1;
        configString += `0x02,\t\t\t// bDescriptorType (Configuration)\r\n`;
        configLen += 1;
        configString += `0x${toHexFormat(interfaceConfigTotalLength & 0xFF)}, 0x${toHexFormat(interfaceConfigTotalLength >> 8)},\t\t// wTotalLength\r\n`;
        configLen += 2;
        configString += `0x${toHexFormat(interfaceNum)},\t\t\t// bNumInterfaces: Total number of interface\r\n`;
        configLen += 1;
        configString += `0x01,\t\t\t// bConfigurationValue\r\n`;
        configLen += 1;
        configString += `0x00,\t\t\t// iConfiguration\r\n`;
        configLen += 1;
        configString += `0x${toHexFormat(bmAttributes)},\t\t\t// bmAttributes: Bus Powered; Remote Wakeup\r\n`;
        configLen += 1;
        configString += `0x${toHexFormat(maxPower >> 1)},\t\t\t// MaxPower\r\n`;
        configLen += 1;
    }

    let lenguageIdString = "\r\n/* Language Id */\r\n";
    let lenguageIdLen = 0;
    lenguageIdString += "0x04,\t\t\t// bLength\r\n";
    lenguageIdLen += 1;
    lenguageIdString += "0x03,\t\t\t// bDescriptorType\r\n";
    lenguageIdLen += 1;
    lenguageIdString += "0x33, 0x10,\t\t\t// bLength\r\n";
    lenguageIdLen += 2;

    let ManufacturerString = "";
    let ManufacturerStringLen = 0;
    if (ManufacturerStringSource.length) {
        let tmp = stringToWcharArrayStringComplete(ManufacturerStringSource);
        ManufacturerStringLen = tmp[1] + 2;
        ManufacturerString = "\r\n/* Manufacturer Descriptor */\r\n"
        ManufacturerString += `0x${toHexFormat(ManufacturerStringLen)},\t\t\t// bLength\r\n`;
        ManufacturerString += "0x03,\t\t\t// bDescriptorType\r\n";
        ManufacturerString += tmp[0];
    }

    let ProductString = "";
    let ProductStringLen = 0;
    if (ProductStringSource.length) {
        let tmp = stringToWcharArrayStringComplete(ProductStringSource);
        ProductStringLen = tmp[1] + 2;
        ProductString = "\r\n/* Product Descriptor */\r\n"
        ProductString += `0x${toHexFormat(ProductStringLen)},\t\t\t// bLength\r\n`;
        ProductString += "0x03,\t\t\t// bDescriptorType\r\n";
        ProductString += tmp[0];
    }

    let SerialNumberString = "";
    let SerialNumberStringLen = 0;
    if (SerialNumberStringSource.length) {
        let tmp = stringToWcharArrayStringComplete(SerialNumberStringSource);
        SerialNumberStringLen = tmp[1] + 2;
        SerialNumberString = "\r\n/* SerialNumber Descriptor */\r\n"
        SerialNumberString += `0x${toHexFormat(SerialNumberStringLen)},\t\t\t// bLength\r\n`;
        SerialNumberString += "0x03,\t\t\t// bDescriptorType\r\n";
        SerialNumberString += tmp[0];
    }

    let cFileData = "";
    let cFileName = doc.getElementById("DescriptorcFileNameInput").value + "";
    let hFileName = doc.getElementById("DescriptorhFileNameInput").value + "";
    let DescriptorLength = 18 + 9 + interfaceConfigTotalLength + 4 + 1 + ManufacturerStringLen + ProductStringLen + SerialNumberStringLen;//USB报告符长度
    let cFileDataLen = DescriptorLength;
    // if (interfaceDescriptorStringLength.length) {
    //     for (let i = 0; i < interfaceDescriptorStringLength.length; i++) {
    //         cFileDataLen += interfaceDescriptorStringLength[i];
    //     }
    // }

    let hFileData = "";
    let handleString = "";
    let typedefString = "";
    let defineString = "";
    if (interfaceInfo.length) {
        let InterfaceNum = 0;
        defineString = `\
        \r\n.Descriptor.buffer = USBD_DESC,\
        \r\n.Descriptor.Length = ${DescriptorLength},\
        `;
        //生成interface结构体
        for (let i = 0; i < interfaceInfo.length; i++) {

            let stringTmp = ``;
            switch (interfaceInfo[i]["Type"]) {
                case "HID":
                    {
                        let inputString = "";
                        let outputString = "";


                        defineString += `\
                        \r\n.Intf${InterfaceNum}.Type = 0,\
                        \r\n.Intf${InterfaceNum}.Descriptor.buffer = Intf${i}Desc,\
                        \r\n.Intf${InterfaceNum}.Descriptor.Length = ${interfaceDescriptorStringLength[i]},\
                        \r\n.Intf${InterfaceNum}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["In"]["Addr"])},\
                        \r\n.Intf${InterfaceNum}.InEndpoint.Size = ${interfaceInfo[i]["Endpoint"]["In"]["Size"]},\
                        `;

                        if (interfaceInfo[i]["Endpoint"]["In"]["Enabled"]) {
                            inputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} InEndpoint;\
                            `;
                        }

                        if (interfaceInfo[i]["Endpoint"]["Out"]["Enabled"]) {
                            defineString += `\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["Out"]["Addr"])},\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Size = ${interfaceInfo[i]["Endpoint"]["Out"]["Size"]},\
                            `;

                            outputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} OutEndpoint;\
                            `;
                        }

                        stringTmp = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nunsigned char Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned char *buffer;\
                            \r\nconst unsigned int Length;\
                            \r\n} Descriptor;\
                            ${inputString}\
                            ${outputString}\
                            \r\n} Intf${InterfaceNum};\r\n\
                            `;

                        InterfaceNum += 1;
                    }
                    break;

                case "CDC-ACM":
                    {
                        let inputString = "";
                        let outputString = "";
                        let intString = "";

                        intString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst unsigned int Address : 8;\
                        \r\nconst unsigned int Size : 24;\
                        \r\n} IntEndpoint;\
                        `;

                        inputString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst unsigned int Address : 8;\
                        \r\nconst unsigned int Size : 24;\
                        \r\n} InEndpoint;\
                        `;

                        outputString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst unsigned int Address : 8;\
                        \r\nconst unsigned int Size : 24;\
                        \r\n} OutEndpoint;\
                        `;

                        stringTmp = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nunsigned char Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                            ${intString}\
                            ${inputString}\
                            ${outputString}\
                            \r\n} Intf${InterfaceNum};\r\n\
                            `;

                        defineString += `\
                        \r\n.Intf${InterfaceNum}.Type = 1,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["IntEpAddr"])},\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Size = 10,\
                        \r\n.Intf${InterfaceNum}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                        \r\n.Intf${InterfaceNum}.InEndpoint.Size = ${(interfaceInfo[i]["MaxMps"])},\
                        \r\n.Intf${InterfaceNum}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                        \r\n.Intf${InterfaceNum}.OutEndpoint.Size = ${(interfaceInfo[i]["MaxMps"])},\
                        `;

                        InterfaceNum += 2;
                    }
                    break;

                case "WinUSB":
                    {
                        let inputString = "";
                        let outputString = "";

                        if (interfaceInfo[i]["InEpEnabled"]) {
                            inputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} InEndpoint;\
                            `;
                        }

                        if (interfaceInfo[i]["OutEpEnabled"]) {
                            outputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} OutEndpoint;\
                            `;
                        }

                        stringTmp = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nunsigned char Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                            \r\nconst unsigned char *WCID_StringDescriptor_MSOS;\
                            \r\nconst unsigned char *WINUSB_WCIDDescriptor;\
                            \r\nconst unsigned char **WINUSB_IFx_WCIDProperties;\
                            ${inputString}\
                            ${outputString}\
                            \r\n} Intf${InterfaceNum};\r\n\
                            `;

                        defineString += `\
                        \r\n.Intf${InterfaceNum}.Type = 2,\
                        \r\n.Intf${InterfaceNum}.WCID_StringDescriptor_MSOS = Intf${InterfaceNum}_WCID_StringDescriptor_MSOS,\
                        \r\n.Intf${InterfaceNum}.WINUSB_WCIDDescriptor = Intf${InterfaceNum}_WINUSB_WCIDDescriptor,\
                        \r\n.Intf${InterfaceNum}.WINUSB_IFx_WCIDProperties = Intf${InterfaceNum}_WINUSB_IFx_WCIDProperties,\
                        \r\n${interfaceInfo[i]["InEpEnabled"] ? `\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Size = 64,\
                            ` : ""}\
                        \r\n${interfaceInfo[i]["OutEpEnabled"] ? `\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Size = 64,\
                            ` : ""}\
                        `;

                        InterfaceNum += 1;
                    }
                    break;

                default:
                    break;
            }
            typedefString += stringTmp;
        }
        typedefString = `\
        \r\ntypedef struct\
        \r\n{\
        \r\nstruct\
        \r\n{\
        \r\nconst unsigned char *buffer;\
        \r\nconst unsigned int Length;\
        \r\n} Descriptor;\
        ${typedefString}\
        \r\n} USBD_DescriptorTypeDef;\r\n\
        `;
    }

    //生成USBD_DescriptorTypeDef句柄并初始化值
    handleString = `\
    ${defineString != "" ? `\
    \r\nconst USBD_DescriptorTypeDef usbddesc = {\
    ${defineString}\
    \r\n};\
    ` : ""}\
    `;

    let interfaceConfigStringTmp = "";
    if (interfaceConfigString.length) {
        for (let i = 0; i < interfaceConfigString.length; i++) {
            interfaceConfigStringTmp += interfaceConfigString[i];
        }
    }
    cFileData = `#include "${hFileName}"\r\n`;
    cFileData += `\
    \r\nconst unsigned char USBD_DESC[${DescriptorLength}] = \r\n{\
        \r\n${deviceString}\
        ${configString}\
        ${interfaceConfigStringTmp}\
        ${lenguageIdString}\
        ${ManufacturerString}\
        ${ProductString}\
        ${SerialNumberString}\
        \r\n/* Descriptor End */\
        \r\n0x00,\
        \r\n};\
        \r\n\
        ${interfaceInfo.length ? `\
        \r\n/* Interface Content Descriptor */\r\n\
        ${(() => {
                let stringTmp = "";
                for (let i = 0; i < interfaceInfo.length; i++) {
                    if (interfaceInfo[i]["Type"] == "HID") {
                        stringTmp += `\
                        \r\nconst unsigned char Intf${i}Desc[${interfaceInfo[i]["Descriptor"]["Bytes"]}] = {\
                        \r\n${interfaceInfo[i]["Descriptor"]["String"]}\
                        \r\n};\
                        \r\n\
                        `;
                    } else if (interfaceInfo[i]["Type"] == "WinUSB") {
                        stringTmp += interfaceInfo[i]["msosv1_desc"];
                    }
                }
                return stringTmp;
            })()}\
        ` : ""}\
        ${handleString}\r\n\
        `;

    hFileData = `\#ifndef ${hFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n#define ${hFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n\
    \r\n#ifdef __cplusplus\
    \r\nextern "C" {\
    \r\n#endif\
    \r\n
    ${typedefString}\
    \r\nextern const USBD_DescriptorTypeDef usbddesc;\
    \r\n\
    \r\n#ifdef __cplusplus\
    \r\n}\
    \r\n#endif\
    \r\n\
    \r\n#endif`;

    doc.getElementById("DescriptorcFileData").textContent = cFileData;
    doc.getElementById("DescriptorhFileData").textContent = hFileData;

    return { interfaceInfo, interfaceDescriptorStringLength, cFileName, hFileName, ManufacturerStringSource, ProductStringSource, SerialNumberStringSource };
}
