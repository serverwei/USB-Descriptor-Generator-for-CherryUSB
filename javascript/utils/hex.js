/**
 * 限制输入框只能输入十六进制字符
 * @param {Element} element 
 * @param {number} number 
 */
export function hexValueInput(element, number) {
    const string = element.value;
    const hexOnly = String(string).toUpperCase().replace(/[^0-9A-F]/g, '');
    element.value = hexOnly;
}

/**
 * 将数字转换为指定宽度的零填充大写十六进制字符串
 * @param {number} number 
 * @param {number} width 
 * @returns {string}
 */
export function toHexFormat(number = 0, width = 2) {
    number >>>= 0;
    let hex = number.toString(16).toUpperCase();
    while (hex.length < width) {
        hex = "0" + hex;
    }

    if (hex.length > width) {
        hex = hex.slice(hex.length - width, hex.length);
    }
    return hex;
}
