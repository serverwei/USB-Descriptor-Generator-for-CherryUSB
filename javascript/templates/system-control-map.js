const System_Control_MAP_H = `\
/**
 * @file system_control_map.h
 * @brief USB HID Usage ID Macro Definitions (Generic Desktop Page 0x01)
 * @note  Based on USB HID Usage Tables (HUT)
 */

#ifndef SYSTEM_CONTROL_MAP_H
#define SYSTEM_CONTROL_MAP_H

#ifdef __cplusplus
extern "C" {
#endif

/*──────────────────────────────────────────────────────
 * 0x0080 - 0x0083: 基础系统控制
 *──────────────────────────────────────────────────────*/
#define HID_SC_SYSTEM_CONTROL               0x0080  /* 系统控制集合 (CA) */
#define HID_SC_SYSTEM_POWER_DOWN            0x0081  /* 系统关机 (OSC) */
#define HID_SC_SYSTEM_SLEEP                 0x0082  /* 系统睡眠 (OSC) */
#define HID_SC_SYSTEM_WAKE_UP               0x0083  /* 系统唤醒 (OSC) */

/*──────────────────────────────────────────────────────
 * 0x0084 - 0x008F: 扩展系统上下文控制
 *──────────────────────────────────────────────────────*/
#define HID_SC_SYSTEM_CONTEXT_MENU          0x0084  /* 系统上下文菜单 (OSC) */
#define HID_SC_SYSTEM_MAIN_MENU             0x0085  /* 系统主菜单 (OSC) */
#define HID_SC_SYSTEM_APP_MENU              0x0086  /* 系统应用菜单 (OSC) */
#define HID_SC_SYSTEM_MENU_HELP             0x0087  /* 系统帮助菜单 (OSC) */
#define HID_SC_SYSTEM_MENU_EXIT             0x0088  /* 系统菜单退出 (OSC) */
#define HID_SC_SYSTEM_MENU_SELECT           0x0089  /* 系统菜单选择 (OSC) */
#define HID_SC_SYSTEM_MENU_RIGHT            0x008A  /* 系统菜单向右 (OSC) */
#define HID_SC_SYSTEM_MENU_LEFT             0x008B  /* 系统菜单向左 (OSC) */
#define HID_SC_SYSTEM_MENU_UP               0x008C  /* 系统菜单向上 (OSC) */
#define HID_SC_SYSTEM_MENU_DOWN             0x008D  /* 系统菜单向下 (OSC) */
#define HID_SC_SYSTEM_COLD_RESTART          0x008E  /* 系统冷启动 (OSC) */
#define HID_SC_SYSTEM_WARM_RESTART          0x008F  /* 系统热启动 (OSC) */

/*──────────────────────────────────────────────────────
 * 0x0090 - 0x00A7: 系统方向与窗口控制
 *──────────────────────────────────────────────────────*/
#define HID_SC_DPAD_UP                      0x0090  /* 方向上 (OSC) */
#define HID_SC_DPAD_DOWN                    0x0091  /* 方向下 (OSC) */
#define HID_SC_DPAD_RIGHT                   0x0092  /* 方向右 (OSC) */
#define HID_SC_DPAD_LEFT                    0x0093  /* 方向左 (OSC) */
#define HID_SC_INDEX_TRIGGER                0x0094  /* 索引触发器 (MC) */
#define HID_SC_SYSTEM_DOCK                  0x00A0  /* 系统底座对接 (OSC) */
#define HID_SC_SYSTEM_UNDOCK                0x00A1  /* 系统断开底座 (OSC) */
#define HID_SC_SYSTEM_SETUP                 0x00A2  /* 系统设置 (OSC) */
#define HID_SC_SYSTEM_BREAK                 0x00A3  /* 系统中断 (OSC) */
#define HID_SC_SYSTEM_DEBUGGER_BREAK        0x00A4  /* 系统调试器中断 (OSC) */
#define HID_SC_APP_BREAK                    0x00A5  /* 应用程序中断 (OSC) */
#define HID_SC_APP_DEBUGGER_BREAK           0x00A6  /* 应用程序调试器中断 (OSC) */
#define HID_SC_SYSTEM_SPEAKER_MUTE          0x00A7  /* 系统喇叭静音 (OOC) */

/*──────────────────────────────────────────────────────
 * 0x00A8 - 0x00B7: 系统辅助与显示控制
 *──────────────────────────────────────────────────────*/
#define HID_SC_SYSTEM_HIBERNATE             0x00A8  /* 系统休眠 (OSC) */
#define HID_SC_DISPLAY_INVERT               0x00B0  /* 显示颜色反转 (OSC) */
#define HID_SC_DISPLAY_INTERNAL             0x00B1  /* 内置显示器 (OSC) */
#define HID_SC_DISPLAY_EXTERNAL             0x00B2  /* 外置显示器 (OSC) */
#define HID_SC_DISPLAY_BOTH                 0x00B3  /* 内外同时显示 (OSC) */
#define HID_SC_DISPLAY_DUAL                 0x00B4  /* 扩展双显示 (OSC) */
#define HID_SC_DISPLAY_TOGGLE_INT_EXT       0x00B5  /* 切换内外显示 (OSC) */
#define HID_SC_DISPLAY_SWAP_PRIMARY         0x00B6  /* 交换主副显示 (OSC) */
#define HID_SC_DISPLAY_LCD_AUTOSCALE        0x00B7  /* LCD自动缩放 (OSC) */

/*──────────────────────────────────────────────────────
 * 0x00C6 - 0x00D4: 系统辅助与快捷设置
 *──────────────────────────────────────────────────────*/
#define HID_SC_WIRELESS_RADIO_TOGGLE        0x00C6  /* 无线/飞行模式开关 (OOC) */
#define HID_SC_WIRELESS_RADIO_CONTROL       0x00C7  /* 无线控制 */
#define HID_SC_WIRELESS_RADIO_NOTIFICATION  0x00C8  /* 无线状态通知 */
#define HID_SC_SCREEN_BLANK                 0x00D0  /* 屏保/黑屏 (OSC) */
#define HID_SC_BACKLIGHT_TOGGLE             0x00D1  /* 屏幕背光切换 (OOC) */
#define HID_SC_DISPLAY_MINIMUM              0x00D2  /* 亮度最低 (OSC) */
#define HID_SC_DISPLAY_MAXIMUM              0x00D3  /* 亮度最高 (OSC) */
#define HID_SC_SYSTEM_LOCK                  0x00D4  /* 系统锁定/锁屏 (OSC) */

#ifdef __cplusplus
}
#endif

#endif /* SYSTEM_CONTROL_MAP_H */
`

export { System_Control_MAP_H };
