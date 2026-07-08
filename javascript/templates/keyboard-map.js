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
#define HID_KB_BACKSLASH         0x31    /* \\ | */
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
 * 0x53 - 0x63: 数字小键盘 Keypad
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

/*──────────────────────────────────────────────────────
 * 0x64: 非美式键盘
 *──────────────────────────────────────────────────────*/
#define HID_KB_NON_US_BACKSLASH  0x64    /* \\ | (非美式) */

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
