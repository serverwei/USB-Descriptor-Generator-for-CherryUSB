/**
 * 将 JavaScript 字符串转换为 USB 字符串描述符的 C 字节数组（小端序宽字符 + 注释）
 * @param {string} str 
 * @returns {[string, number]} [result string, total bytes]
 */
export function stringToWcharArrayStringComplete(str) {
    let result = "";
    let totalBytes = 0;

    for (let i = 0; i < str.length; i++) {
        let codePoint = str.charCodeAt(i);
        let originalChar = str[i];
        let charBytes = 2;

        // 检查是否是高代理项（用于UTF-16代理对）
        if (codePoint >= 0xD800 && codePoint <= 0xDBFF && i + 1 < str.length) {
            const nextCodePoint = str.charCodeAt(i + 1);
            // 检查是否是低代理项
            if (nextCodePoint >= 0xDC00 && nextCodePoint <= 0xDFFF) {
                // 计算完整的Unicode码点
                codePoint = (codePoint - 0xD800) * 0x400 + (nextCodePoint - 0xDC00) + 0x10000;
                originalChar = str.substring(i, i + 2);
                i++;
                charBytes = 4;
            }
        } else if (codePoint > 0xFFFF) {
            charBytes = 4;
        }

        // 处理特殊字符的显示
        let charDisplay = originalChar;
        switch (originalChar) {
            case '\r': charDisplay = '\\r'; break;
            case '\n': charDisplay = '\\n'; break;
            case '\t': charDisplay = '\\t'; break;
            case '\\': charDisplay = '\\\\'; break;
        }

        // 对于16位wchar，使用小端序输出两个字节（低位在前）
        if (codePoint <= 0xFFFF) {
            const lowByte = codePoint & 0xFF;
            const highByte = (codePoint & 0xFF00) >> 8;
            result += `0x${lowByte.toString(16).padStart(2, '0').toUpperCase()}, 0x${highByte.toString(16).padStart(2, '0').toUpperCase()},\t\t// ${charDisplay}\r\n`;
        } else {
            const byte4 = codePoint & 0xFF;
            const byte3 = (codePoint & 0xFF00) >> 8;
            const byte2 = (codePoint & 0xFF0000) >> 16;
            const byte1 = (codePoint & 0xFF000000) >> 24;
            result += `0x${byte4.toString(16).padStart(2, '0').toUpperCase()}, 0x${byte3.toString(16).padStart(2, '0').toUpperCase()}, 0x${byte2.toString(16).padStart(2, '0').toUpperCase()}, 0x${byte1.toString(16).padStart(2, '0').toUpperCase()},\t\t// ${charDisplay}\r\n`;
        }

        totalBytes += charBytes;
    }

    return [result, totalBytes];
}
