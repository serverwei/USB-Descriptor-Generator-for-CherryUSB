const KeyBoard_Map_H = `\
/**
 * @file Keyboard_Map.h
 * @brief HID Usage Tables - Keyboard/Keypad Page (0x07) Macro Definitions
 */

#ifndef KEYBOARD_MAP_H
#define KEYBOARD_MAP_H

#ifdef __cplusplus
extern "C" {
#endif

/*──────────────────────────────────────────────────────
 * 0x00 - 0x03: 特殊状态码
 *──────────────────────────────────────────────────────*/
#define HID_KB_RESERVED           0x00    /* 保留 (未按键状态) */
#define HID_KB_ERROR_ROLL_OVER    0x01    /* 键盘报错：按键冲突 */
#define HID_KB_POST_FAIL          0x02    /* 键盘报错：上电自检失败 */
#define HID_KB_ERROR_UNDEFINED    0x03    /* 键盘报错：未定义错误 */

/*──────────────────────────────────────────────────────
 * 0x04 - 0x1D: 字母键 A - Z
 *──────────────────────────────────────────────────────*/
#define HID_KB_A    0x04
#define HID_KB_B    0x05
#define HID_KB_C    0x06
#define HID_KB_D    0x07
#define HID_KB_E    0x08
#define HID_KB_F    0x09
#define HID_KB_G    0x0A
#define HID_KB_H    0x0B
#define HID_KB_I    0x0C
#define HID_KB_J    0x0D
#define HID_KB_K    0x0E
#define HID_KB_L    0x0F
#define HID_KB_M    0x10
#define HID_KB_N    0x11
#define HID_KB_O    0x12
#define HID_KB_P    0x13
#define HID_KB_Q    0x14
#define HID_KB_R    0x15
#define HID_KB_S    0x16
#define HID_KB_T    0x17
#define HID_KB_U    0x18
#define HID_KB_V    0x19
#define HID_KB_W    0x1A
#define HID_KB_X    0x1B
#define HID_KB_Y    0x1C
#define HID_KB_Z    0x1D

/*──────────────────────────────────────────────────────
 * 0x1E - 0x27: 数字键 1 - 0
 *──────────────────────────────────────────────────────*/
#define HID_KB_1        0x1E    /* ! */
#define HID_KB_2        0x1F    /* @ */
#define HID_KB_3        0x20    /* # */
#define HID_KB_4        0x21    /* $ */
#define HID_KB_5        0x22    /* % */
#define HID_KB_6        0x23    /* ^ */
#define HID_KB_7        0x24    /* & */
#define HID_KB_8        0x25    /* * */
#define HID_KB_9        0x26    /* ( */
#define HID_KB_0        0x27    /* ) */

/*──────────────────────────────────────────────────────
 * 0x28 - 0x38: 控制与标点符号
 *──────────────────────────────────────────────────────*/
#define HID_KB_ENTER             0x28    /* 回车键 */
#define HID_KB_ESCAPE            0x29    /* 取消键 */
#define HID_KB_BACKSPACE         0x2A    /* 退格键 */
#define HID_KB_TAB               0x2B    /* 制表键 */
#define HID_KB_SPACE             0x2C    /* 空格键 */
#define HID_KB_MINUS             0x2D    /* - _ */
#define HID_KB_EQUAL             0x2E    /* = + */
#define HID_KB_LEFT_BRACE        0x2F    /* [ { */
#define HID_KB_RIGHT_BRACE       0x30    /* ] } */
#define HID_KB_BACKSLASH         0x31    /* \ | */
#define HID_KB_NON_US_HASH       0x32    /* # ~ (非美式) */
#define HID_KB_SEMICOLON         0x33    /* ; : */
#define HID_KB_APOSTROPHE        0x34    /* ' " */
#define HID_KB_GRAVE             0x35    /* \` ~ */
#define HID_KB_COMMA             0x36    /* , < */
#define HID_KB_DOT               0x37    /* . > */
#define HID_KB_SLASH             0x38    /* / ? */
#define HID_KB_CAPS_LOCK         0x39    /* 大写锁定 */

/*──────────────────────────────────────────────────────
 * 0x3A - 0x45: 功能键 F1 - F12
 *──────────────────────────────────────────────────────*/
#define HID_KB_F1    0x3A
#define HID_KB_F2    0x3B
#define HID_KB_F3    0x3C
#define HID_KB_F4    0x3D
#define HID_KB_F5    0x3E
#define HID_KB_F6    0x3F
#define HID_KB_F7    0x40
#define HID_KB_F8    0x41
#define HID_KB_F9    0x42
#define HID_KB_F10   0x43
#define HID_KB_F11   0x44
#define HID_KB_F12   0x45

/*──────────────────────────────────────────────────────
 * 0x46 - 0x52: 系统与导航键
 *──────────────────────────────────────────────────────*/
#define HID_KB_PRINT_SCREEN      0x46    /* 印屏键 */
#define HID_KB_SCROLL_LOCK       0x47    /* 滚动锁定 */
#define HID_KB_PAUSE             0x48    /* 暂停/中断 */
#define HID_KB_INSERT            0x49    /* 插入键 */
#define HID_KB_HOME              0x4A    /* 起始键 */
#define HID_KB_PAGE_UP           0x4B    /* 向上翻页 */
#define HID_KB_DELETE            0x4C    /* 删除键 */
#define HID_KB_END               0x4D    /* 结束键 */
#define HID_KB_PAGE_DOWN         0x4E    /* 向下翻页 */
#define HID_KB_RIGHT             0x4F    /* 方向键：右 */
#define HID_KB_LEFT              0x50    /* 方向键：左 */
#define HID_KB_DOWN              0x51    /* 方向键：下 */
#define HID_KB_UP                0x52    /* 方向键：上 */

/*──────────────────────────────────────────────────────
 * 0x53 - 0x64: 数字小键盘与非美式键
 *──────────────────────────────────────────────────────*/
#define HID_KB_NUM_LOCK          0x53    /* 小键盘锁定 */
#define HID_KB_KP_SLASH          0x54    /* 小键盘 / */
#define HID_KB_KP_ASTERISK       0x55    /* 小键盘 * */
#define HID_KB_KP_MINUS          0x56    /* 小键盘 - */
#define HID_KB_KP_PLUS           0x57    /* 小键盘 + */
#define HID_KB_KP_ENTER          0x58    /* 小键盘回车 */
#define HID_KB_KP_1              0x59    /* End */
#define HID_KB_KP_2              0x5A    /* Down */
#define HID_KB_KP_3              0x5B    /* PageDown */
#define HID_KB_KP_4              0x5C    /* Left */
#define HID_KB_KP_5              0x5D    /* 无触发 */
#define HID_KB_KP_6              0x5E    /* Right */
#define HID_KB_KP_7              0x5F    /* Home */
#define HID_KB_KP_8              0x60    /* Up */
#define HID_KB_KP_9              0x61    /* PageUp */
#define HID_KB_KP_0              0x62    /* Insert */
#define HID_KB_KP_DOT            0x63    /* Delete */
#define HID_KB_NON_US_BACKSLASH  0x64    /* \ | (非美式) */

/*──────────────────────────────────────────────────────
 * 0x65 - 0x84: 扩展功能键、F13 - F24 及系统控制键
 *──────────────────────────────────────────────────────*/
#define HID_KB_APPLICATION       0x65    /* 菜单/应用键 (ContextMenu) */
#define HID_KB_POWER             0x66    /* 电源键 */
#define HID_KB_KP_EQUAL          0x67    /* 小键盘 = */
#define HID_KB_F13               0x68    /* 功能键 F13 */
#define HID_KB_F14               0x69    /* 功能键 F14 */
#define HID_KB_F15               0x6A    /* 功能键 F15 */
#define HID_KB_F16               0x6B    /* 功能键 F16 */
#define HID_KB_F17               0x6C    /* 功能键 F17 */
#define HID_KB_F18               0x6D    /* 功能键 F18 */
#define HID_KB_F19               0x6E    /* 功能键 F19 */
#define HID_KB_F20               0x6F    /* 功能键 F20 */
#define HID_KB_F21               0x70    /* 功能键 F21 */
#define HID_KB_F22               0x71    /* 功能键 F22 */
#define HID_KB_F23               0x72    /* 功能键 F23 */
#define HID_KB_F24               0x73    /* 功能键 F24 */
#define HID_KB_EXECUTE           0x74    /* 执行键 */
#define HID_KB_HELP              0x75    /* 帮助键 */
#define HID_KB_MENU              0x76    /* 菜单键 */
#define HID_KB_SELECT            0x77    /* 选择键 */
#define HID_KB_STOP              0x78    /* 停止键 */
#define HID_KB_AGAIN             0x79    /* 重做键 */
#define HID_KB_UNDO              0x7A    /* 撤销键 */
#define HID_KB_CUT               0x7B    /* 剪切键 */
#define HID_KB_COPY              0x7C    /* 复制键 */
#define HID_KB_PASTE             0x7D    /* 粘贴键 */
#define HID_KB_FIND              0x7E    /* 查找键 */
#define HID_KB_MUTE              0x7F    /* 静音键 (键盘特有) */
#define HID_KB_VOLUME_UP         0x80    /* 音量加 (键盘特有) */
#define HID_KB_VOLUME_DOWN       0x81    /* 音量减 (键盘特有) */
#define HID_KB_LOCKING_CAPS      0x82    /* 锁定大写键 */
#define HID_KB_LOCKING_NUM       0x83    /* 锁定小键盘键 */
#define HID_KB_LOCKING_SCROLL    0x84    /* 锁定滚动键 */

/*──────────────────────────────────────────────────────
 * 0x85 - 0x9F: 国际化与语言键、系统专用键
 *──────────────────────────────────────────────────────*/
#define HID_KB_KP_COMMA          0x85    /* 小键盘逗号 */
#define HID_KB_KP_EQUAL_AS400    0x86    /* 小键盘等号 (AS/400 格式) */
#define HID_KB_INTERNATIONAL_1   0x87    /* 国际键 1 (日系键盘 Ro) */
#define HID_KB_INTERNATIONAL_2   0x88    /* 国际键 2 (日系键盘 Katakana/Hiragana) */
#define HID_KB_INTERNATIONAL_3   0x89    /* 国际键 3 (日系键盘 Yen) */
#define HID_KB_INTERNATIONAL_4   0x8A    /* 国际键 4 (日系键盘 Henkan) */
#define HID_KB_INTERNATIONAL_5   0x8B    /* 国际键 5 (日系键盘 Muhenkan) */
#define HID_KB_INTERNATIONAL_6   0x8C    /* 国际键 6 (PC-9800 Keypad 逗号) */
#define HID_KB_INTERNATIONAL_7   0x8D    /* 国际键 7 */
#define HID_KB_INTERNATIONAL_8   0x8E    /* 国际键 8 */
#define HID_KB_INTERNATIONAL_9   0x8F    /* 国际键 9 */
#define HID_KB_LANG_1            0x90    /* 语言键 1 (韩系键盘 Hangul/English) */
#define HID_KB_LANG_2            0x91    /* 语言键 2 (韩系键盘 Hanja) */
#define HID_KB_LANG_3            0x92    /* 语言键 3 (日系键盘 Katakana) */
#define HID_KB_LANG_4            0x93    /* 语言键 4 (日系键盘 Hiragana) */
#define HID_KB_LANG_5            0x94    /* 语言键 5 (日系键盘 Zenkaku/Hankaku) */
#define HID_KB_LANG_6            0x95    /* 语言键 6 */
#define HID_KB_LANG_7            0x96    /* 语言键 7 */
#define HID_KB_LANG_8            0x97    /* 语言键 8 */
#define HID_KB_LANG_9            0x98    /* 语言键 9 */
#define HID_KB_ALTERNATE_ERASE   0x99    /* 替换擦除键 */
#define HID_KB_SYSREQ_ATTN       0x9A    /* SysReq / Attention 键 */
#define HID_KB_CANCEL            0x9B    /* 取消键 */
#define HID_KB_CLEAR             0x9C    /* 清除键 */
#define HID_KB_PRIOR             0x9D    /* 先前键 */
#define HID_KB_RETURN            0x9E    /* 返回键 */
#define HID_KB_SEPARATOR         0x9F    /* 分隔符 */

/*──────────────────────────────────────────────────────
 * 0xA0 - 0xAF: 操作控制键与小键盘 00/000
 *──────────────────────────────────────────────────────*/
#define HID_KB_OUT               0xA0    /* 传出键 */
#define HID_KB_OPER              0xA1    /* 操作键 */
#define HID_KB_CLEAR_AGAIN       0xA2    /* 再次清除键 */
#define HID_KB_CRSEL_PROPS       0xA3    /* CrSel / 属性键 */
#define HID_KB_EXSEL             0xA4    /* ExSel 键 */
/* 0xA5 - 0xAF 保留 (Reserved) */
#define HID_KB_KP_00             0xB0    /* 小键盘 00 */
#define HID_KB_KP_000            0xB1    /* 小键盘 000 */
#define HID_KB_THOUSANDS_SEP     0xB2    /* 千分位分隔符 */
#define HID_KB_DECIMAL_SEP       0xB3    /* 小数点分隔符 */
#define HID_KB_CURRENCY_UNIT     0xB4    /* 货币单位 */
#define HID_KB_CURRENCY_SUB_UNIT 0xB5    /* 货币子单位 */

/*──────────────────────────────────────────────────────
 * 0xB6 - 0xDF: 小键盘各种符号与内存按键
 *──────────────────────────────────────────────────────*/
#define HID_KB_KP_LEFT_PAREN     0xB6    /* 小键盘 ( */
#define HID_KB_KP_RIGHT_PAREN    0xB7    /* 小键盘 ) */
#define HID_KB_KP_LEFT_BRACE     0xB8    /* 小键盘 { */
#define HID_KB_KP_RIGHT_BRACE    0xB9    /* 小键盘 } */
#define HID_KB_KP_TAB            0xBA    /* 小键盘 Tab */
#define HID_KB_KP_BACKSPACE      0xBB    /* 小键盘 退格 */
#define HID_KB_KP_A              0xBC    /* 小键盘 A */
#define HID_KB_KP_B              0xBD    /* 小键盘 B */
#define HID_KB_KP_C              0xBE    /* 小键盘 C */
#define HID_KB_KP_D              0xBF    /* 小键盘 D */
#define HID_KB_KP_E              0xC0    /* 小键盘 E */
#define HID_KB_KP_F              0xC1    /* 小键盘 F */
#define HID_KB_KP_XOR            0xC2    /* 小键盘 XOR */
#define HID_KB_KP_CARET          0xC3    /* 小键盘 ^ */
#define HID_KB_KP_PERCENT        0xC4    /* 小键盘 % */
#define HID_KB_KP_LESS           0xC5    /* 小键盘 < */
#define HID_KB_KP_GREATER        0xC6    /* 小键盘 > */
#define HID_KB_KP_AMPERSAND      0xC7    /* 小键盘 & */
#define HID_KB_KP_LOGICAL_AND    0xC8    /* 小键盘 && */
#define HID_KB_KP_VERTICAL_BAR   0xC9    /* 小键盘 | */
#define HID_KB_KP_LOGICAL_OR     0xCA    /* 小键盘 || */
#define HID_KB_KP_COLON          0xCB    /* 小键盘 : */
#define HID_KB_KP_HASH           0xCC    /* 小键盘 # */
#define HID_KB_KP_SPACE          0xCD    /* 小键盘 空格 */
#define HID_KB_KP_AT             0xCE    /* 小键盘 @ */
#define HID_KB_KP_EXCLAMATION    0xCF    /* 小键盘 ! */
#define HID_KB_KP_MEM_STORE      0xD0    /* 小键盘内存：存储 */
#define HID_KB_KP_MEM_RECALL     0xD1    /* 小键盘内存：调用 */
#define HID_KB_KP_MEM_CLEAR      0xD2    /* 小键盘内存：清除 */
#define HID_KB_KP_MEM_ADD        0xD3    /* 小键盘内存：加 */
#define HID_KB_KP_MEM_SUBTRACT   0xD4    /* 小键盘内存：减 */
#define HID_KB_KP_MEM_MULTIPLY   0xD5    /* 小键盘内存：乘 */
#define HID_KB_KP_MEM_DIVIDE     0xD6    /* 小键盘内存：除 */
#define HID_KB_KP_PLUS_MINUS     0xD7    /* 小键盘 +/- */
#define HID_KB_KP_CLEAR_MEM      0xD8    /* 小键盘清除 */
#define HID_KB_KP_CLEAR_ENTRY    0xD9    /* 小键盘清除条目 */
#define HID_KB_KP_BINARY         0xDA    /* 小键盘二进制 */
#define HID_KB_KP_OCTAL          0xDB    /* 小键盘八进制 */
#define HID_KB_KP_DECIMAL        0xDC    /* 小键盘十进制 */
#define HID_KB_KP_HEXADECIMAL    0xDD    /* 小键盘十六进制 */
/* 0xDE - 0xDF 保留 (Reserved) */

/*──────────────────────────────────────────────────────
 * 0xE0 - 0xE7: 修饰键 Modifiers
 *──────────────────────────────────────────────────────*/
#define HID_KB_LEFT_CTRL         0xE0    /* 左 Control */
#define HID_KB_LEFT_SHIFT        0xE1    /* 左 Shift */
#define HID_KB_LEFT_ALT          0xE2    /* 左 Alt */
#define HID_KB_LEFT_GUI          0xE3    /* 左 GUI (Win/Cmd) */
#define HID_KB_RIGHT_CTRL        0xE4    /* 右 Control */
#define HID_KB_RIGHT_SHIFT       0xE5    /* 右 Shift */
#define HID_KB_RIGHT_ALT         0xE6    /* 右 Alt */
#define HID_KB_RIGHT_GUI         0xE7    /* 右 GUI (Win/Cmd) */

#ifdef __cplusplus
}
#endif

#endif /* KEYBOARD_MAP_H */
`

export { KeyBoard_Map_H };
