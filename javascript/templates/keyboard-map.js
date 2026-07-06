const KeyBoard_Map_H = `\
/**
 * @file Keyboard_Map.h
 * @brief HID Usage Tables - Keyboard/Keypad Page (0x07) Mapping with Chinese Comments
 */

#ifndef KEYBOARD_MAP_H
#define KEYBOARD_MAP_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
    // 0x00 - 0x03: 特殊状态码
    uint8_t Reserved;         // 保留 (未按键状态)
    uint8_t ErrorRollOver;    // 键盘报错：按键冲突 (超过最大同时按键数)
    uint8_t POSTFail;         // 键盘报错：上电自检失败
    uint8_t ErrorUndefined;   // 键盘报错：未定义错误

    // 0x04 - 0x1D: 字母键 A - Z
    uint8_t A; uint8_t B; uint8_t C; uint8_t D; uint8_t E; uint8_t F; uint8_t G;
    uint8_t H; uint8_t I; uint8_t J; uint8_t K; uint8_t L; uint8_t M; uint8_t N;
    uint8_t O; uint8_t P; uint8_t Q; uint8_t R; uint8_t S; uint8_t T; uint8_t U;
    uint8_t V; uint8_t W; uint8_t X; uint8_t Y; uint8_t Z;

    // 0x1E - 0x27: 数字键 1 - 0 (美式标准键盘 SHIFT 组合)
    uint8_t Key_1;            // 数字键 1 (SHIFT + 1 = !)
    uint8_t Key_2;            // 数字键 2 (SHIFT + 2 = @)
    uint8_t Key_3;            // 数字键 3 (SHIFT + 3 = #)
    uint8_t Key_4;            // 数字键 4 (SHIFT + 4 = $)
    uint8_t Key_5;            // 数字键 5 (SHIFT + 5 = %)
    uint8_t Key_6;            // 数字键 6 (SHIFT + 6 = ^)
    uint8_t Key_7;            // 数字键 7 (SHIFT + 7 = &)
    uint8_t Key_8;            // 数字键 8 (SHIFT + 8 = *)
    uint8_t Key_9;            // 数字键 9 (SHIFT + 9 = ()
    uint8_t Key_0;            // 数字键 0 (SHIFT + 0 = ))

    // 0x28 - 0x38: 控制与标点符号
    uint8_t Enter;            // 回车键 (Return)
    uint8_t Escape;           // 取消键 (ESC)
    uint8_t DeleteBackspace;  // 退格键 (Backspace)
    uint8_t Tab;              // 制表键 (Tab)
    uint8_t Spacebar;         // 空格键 (Space)
    uint8_t Minus;            // 减号键 (- 且 SHIFT 组合为 _)
    uint8_t Equal;            // 等号键 (= 且 SHIFT 组合为 +)
    uint8_t LeftBrace;        // 左中括号 ([ 且 SHIFT 组合为 {)
    uint8_t RightBrace;       // 右中括号 (] 且 SHIFT 组合为 })
    uint8_t Backslash;        // 反斜杠键 (\ 且 SHIFT 组合为 |)
    uint8_t NonUS_Hash;       // 非美式键盘专用键 (# 与 ~)
    uint8_t Semicolon;        // 分号键 (; 且 SHIFT 组合为 :)
    uint8_t Apostrophe;       // 单引号键 (' 且 SHIFT 组合为 ")
    uint8_t GraveAccent;      // 波浪号键 (\` 且 SHIFT 组合为 ~)
    uint8_t Comma;            // 逗号键 (, 且 SHIFT 组合为 less than)
    uint8_t Dot;              // 句号键 (. 且 SHIFT 组合为 greater than)
    uint8_t Slash;            // 斜杠键 (/ 且 SHIFT 组合为 ?)
    uint8_t CapsLock;         // 大写锁定键 (Caps Lock)

    // 0x3A - 0x45: 功能键 F1 - F12
    uint8_t F1;  // 功能键 F1
    uint8_t F2;  // 功能键 F2
    uint8_t F3;  // 功能键 F3
    uint8_t F4;  // 功能键 F4
    uint8_t F5;  // 功能键 F5
    uint8_t F6;  // 功能键 F6
    uint8_t F7;  // 功能键 F7
    uint8_t F8;  // 功能键 F8
    uint8_t F9;  // 功能键 F9
    uint8_t F10; // 功能键 F10
    uint8_t F11; // 功能键 F11
    uint8_t F12; // 功能键 F12

    // 0x46 - 0x52: 控制与导航 (主键盘区)
    uint8_t PrintScreen;      // 印屏键/截屏键 (Print Screen)
    uint8_t ScrollLock;       // 滚动锁定键 (Scroll Lock)
    uint8_t Pause;            // 暂停/中断键 (Pause / Break)
    uint8_t Insert;           // 插入键 (Insert)
    uint8_t Home;             // 起始键 (Home)
    uint8_t PageUp;           // 向上翻页键 (Page Up)
    uint8_t DeleteForward;    // 删除键 (Delete)
    uint8_t End;              // 结束键 (End)
    uint8_t PageDown;         // 向下翻页键 (Page Down)
    uint8_t RightArrow;       // 方向键：右 (Right Arrow)
    uint8_t LeftArrow;        // 方向键：左 (Left Arrow)
    uint8_t DownArrow;        // 方向键：下 (Down Arrow)
    uint8_t UpArrow;          // 方向键：上 (Up Arrow)

    // 0x53 - 0x63: 数字小键盘 Keypad (附带 Num Lock 关闭后的导航映射)
    uint8_t NumLock;          // 小键盘锁定键 (Num Lock)
    uint8_t Keypad_Slash;     // 小键盘斜杠 (/)
    uint8_t Keypad_Asterisk;  // 小键盘星号 (*)
    uint8_t Keypad_Minus;     // 小键盘减号 (-)
    uint8_t Keypad_Plus;      // 小键盘加号 (+)
    uint8_t Keypad_Enter;     // 小键盘回车 (Enter)
    uint8_t Keypad_1;         // 小键盘 1 (Num Lock 关闭时 = End 结束键)
    uint8_t Keypad_2;         // 小键盘 2 (Num Lock 关闭时 = Down Arrow 向下键)
    uint8_t Keypad_3;         // 小键盘 3 (Num Lock 关闭时 = Page Down 向下翻页)
    uint8_t Keypad_4;         // 小键盘 4 (Num Lock 关闭时 = Left Arrow 向左键)
    uint8_t Keypad_5;         // 小键盘 5 (Num Lock 关闭时 = 无触发/清除)
    uint8_t Keypad_6;         // 小键盘 6 (Num Lock 关闭时 = Right Arrow 向右键)
    uint8_t Keypad_7;         // 小键盘 7 (Num Lock 关闭时 = Home 起始键)
    uint8_t Keypad_8;         // 小键盘 8 (Num Lock 关闭时 = Up Arrow 向上键)
    uint8_t Keypad_9;         // 小键盘 9 (Num Lock 关闭时 = Page Up 向上翻页)
    uint8_t Keypad_0;         // 小键盘 0 (Num Lock 关闭时 = Insert 插入键)
    uint8_t Keypad_Dot;       // 小键盘点 . (Num Lock 关闭时 = Delete 删除键)

    // 0x64: 非美式键盘
    uint8_t NonUS_Backslash;  // 非美式键盘专用键 (\ 与 |)

    // 0xE0 - 0xE7: 修饰键 Modifiers
    uint8_t LeftControl;      // 左 Control 键
    uint8_t LeftShift;        // 左 Shift 键
    uint8_t LeftAlt;          // 左 Alt 键 (Option)
    uint8_t LeftGUI;          // 左 GUI 键 (Windows / Command)
    uint8_t RightControl;     // 右 Control 键
    uint8_t RightShift;       // 右 Shift 键
    uint8_t RightAlt;         // 右 Alt 键 (Option)
    uint8_t RightGUI;         // 右 GUI 键 (Windows / Command)

} Keyboard_Map_TypeDef;

extern const Keyboard_Map_TypeDef KeyBoard_Map;

#ifdef __cplusplus
}
#endif

#endif /* KEYBOARD_MAP_H */
`

const KeyBoard_Map_C = `\
/**
 * @file Keyboard_Map.c
 * @brief HID Usage Tables - Keyboard/Keypad Page (0x07) 映射值
 */

#include "Keyboard_Map.h"

const Keyboard_Map_TypeDef KeyBoard_Map = {
    // 0x00 - 0x03: 特殊状态码
    .Reserved         = 0x00,
    .ErrorRollOver    = 0x01,
    .POSTFail         = 0x02,
    .ErrorUndefined   = 0x03,

    // 0x04 - 0x1D: 字母键 A - Z
    .A = 0x04, .B = 0x05, .C = 0x06, .D = 0x07, .E = 0x08, .F = 0x09, .G = 0x0A,
    .H = 0x0B, .I = 0x0C, .J = 0x0D, .K = 0x0E, .L = 0x0F, .M = 0x10, .N = 0x11,
    .O = 0x12, .P = 0x13, .Q = 0x14, .R = 0x15, .S = 0x16, .T = 0x17, .U = 0x18,
    .V = 0x19, .W = 0x1A, .X = 0x1B, .Y = 0x1C, .Z = 0x1D,

    // 0x1E - 0x27: 数字键 1 - 0
    .Key_1 = 0x1E, .Key_2 = 0x1F, .Key_3 = 0x20, .Key_4 = 0x21, .Key_5 = 0x22,
    .Key_6 = 0x23, .Key_7 = 0x24, .Key_8 = 0x25, .Key_9 = 0x26, .Key_0 = 0x27,

    // 0x28 - 0x38: 控制键与标点
    .Enter            = 0x28,
    .Escape           = 0x29,
    .DeleteBackspace  = 0x2A,
    .Tab              = 0x2B,
    .Spacebar         = 0x2C,
    .Minus            = 0x2D,
    .Equal            = 0x2E,
    .LeftBrace        = 0x2F,
    .RightBrace       = 0x30,
    .Backslash        = 0x31,
    .NonUS_Hash       = 0x32,
    .Semicolon        = 0x33,
    .Apostrophe       = 0x34,
    .GraveAccent      = 0x35,
    .Comma            = 0x36,
    .Dot              = 0x37,
    .Slash            = 0x38,
    .CapsLock         = 0x39,

    // 0x3A - 0x45: 功能键 F1 - F12
    .F1 = 0x3A,  .F2 = 0x3B,  .F3 = 0x3C,  .F4 = 0x3D,  .F5 = 0x3E,  .F6 = 0x3F,
    .F7 = 0x40,  .F8 = 0x41,  .F9 = 0x42,  .F10 = 0x43, .F11 = 0x44, .F12 = 0x45,

    // 0x46 - 0x52: 系统与导航
    .PrintScreen      = 0x46,
    .ScrollLock       = 0x47,
    .Pause            = 0x48,
    .Insert           = 0x49,
    .Home             = 0x4A,
    .PageUp           = 0x4B,
    .DeleteForward    = 0x4C,
    .End              = 0x4D,
    .PageDown         = 0x4E,
    .RightArrow       = 0x4F,
    .LeftArrow        = 0x50,
    .DownArrow        = 0x51,
    .UpArrow          = 0x52,

    // 0x53 - 0x63: 小键盘
    .NumLock          = 0x53,
    .Keypad_Slash     = 0x54,
    .Keypad_Asterisk  = 0x55,
    .Keypad_Minus     = 0x56,
    .Keypad_Plus      = 0x57,
    .Keypad_Enter     = 0x58,
    .Keypad_1 = 0x59, .Keypad_2 = 0x5A, .Keypad_3 = 0x5B,
    .Keypad_4 = 0x5C, .Keypad_5 = 0x5D, .Keypad_6 = 0x5E,
    .Keypad_7 = 0x5F, .Keypad_8 = 0x60, .Keypad_9 = 0x61,
    .Keypad_0 = 0x62, .Keypad_Dot = 0x63,

    // 0x64: 非美式键盘
    .NonUS_Backslash  = 0x64,

    // 0xE0 - 0xE7: 修饰键
    .LeftControl      = 0xE0,
    .LeftShift        = 0xE1,
    .LeftAlt          = 0xE2,
    .LeftGUI          = 0xE3,
    .RightControl     = 0xE4,
    .RightShift       = 0xE5,
    .RightAlt         = 0xE6,
    .RightGUI         = 0xE7
};
`

export { KeyBoard_Map_H, KeyBoard_Map_C };