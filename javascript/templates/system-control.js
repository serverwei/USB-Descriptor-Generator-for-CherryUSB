const System_Control_MAP_H = `\
/**
 * @file system_control_map.h
 * @brief USB HID Usage ID 映射表 (Generic Desktop 0x01)
 * @note 基于 USB HID Usage Tables (HUT) 官方规范
 */

#ifndef SYSTEM_CONTROL_MAP_H
#define SYSTEM_CONTROL_MAP_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief Generic Desktop Page (0x01) - 系统控制状态结构体
 * @note 适用于上报或记录系统电源、休眠及屏幕状态
 */
typedef struct {
    // 0x0080 - 0x0083: 基础系统控制
    uint16_t SystemControl;             // 系统控制集合 (CA)
    uint16_t SystemPowerDown;           // 系统关机 (OSC)
    uint16_t SystemSleep;               // 系统睡眠 (OSC)
    uint16_t SystemWakeUp;              // 系统唤醒 (OSC)

    // 0x0084 - 0x008F: 扩展系统上下文控制
    uint16_t SystemContextMenu;         // 系统上下文菜单/右键菜单 (OSC)
    uint16_t SystemMainMenu;            // 系统主菜单 (OSC)
    uint16_t SystemAppMenu;             // 系统应用菜单 (OSC)
    uint16_t SystemMenuHelp;            // 系统帮助菜单 (OSC)
    uint16_t SystemMenuExit;            // 系统菜单退出 (OSC)
    uint16_t SystemMenuSelect;          // 系统菜单选择/确定 (OSC)
    uint16_t SystemMenuRight;           // 系统菜单向右 (OSC)
    uint16_t SystemMenuLeft;            // 系统菜单向左 (OSC)
    uint16_t SystemMenuUp;              // 系统菜单向上 (OSC)
    uint16_t SystemMenuDown;            // 系统菜单向下 (OSC)
    uint16_t SystemColdRestart;         // 系统冷启动/硬重启 (OSC)
    uint16_t SystemWarmRestart;         // 系统热启动/软重启 (OSC)

    // 0x0090 - 0x00A7: 系统方向与窗口控制
    uint16_t D_PadUp;                   // 方向键：上 (OSC)
    uint16_t D_PadDown;                 // 方向键：下 (OSC)
    uint16_t D_PadRight;                // 方向键：右 (OSC)
    uint16_t D_PadLeft;                 // 方向键：左 (OSC)
    uint16_t IndexTrigger;              // 索引触发器 (MC)
    uint16_t SystemDock;                // 系统底座对接/连接 (OSC)
    uint16_t SystemUndock;              // 系统断开底座 (OSC)
    uint16_t SystemSetup;               // 系统设置/BIOS设置 (OSC)
    uint16_t SystemBreak;               // 系统中断/Break键 (OSC)
    uint16_t SystemDebuggerBreak;       // 系统调试器中断 (OSC)
    uint16_t ApplicationBreak;          // 应用程序中断 (OSC)
    uint16_t ApplicationDebuggerBreak;  // 应用程序调试器中断 (OSC)
    uint16_t SystemSpeakerMute;         // 系统喇叭静音 (OOC)
    uint16_t SystemHibernate;           // 系统休眠 (OSC)
    uint16_t SystemDisplayInvert;       // 系统显示颜色反转 (OSC)
    uint16_t SystemDisplayInternal;     // 切换到内置显示器 (OSC)
    uint16_t SystemDisplayExternal;     // 切换到外置显示器 (OSC)
    uint16_t SystemDisplayBoth;         // 同时在内置和外置显示器显示 (OSC)
    uint16_t SystemDisplayDual;         // 扩展双显示器显示 (OSC)
    uint16_t SystemDisplayToggleIntExt; // 切换内置/外置显示器 (OSC)
    uint16_t SystemDisplaySwapPrimary;  // 交换主副显示器 (OSC)
    uint16_t SystemDisplayLCDAutoscale; // LCD自动缩放画面 (OSC)

    // 0x00A8 - 0x00B7: 系统辅助与快捷设置
    uint16_t SystemScreenBlank;         // 系统屏保/黑屏 (OSC)
    uint16_t SystemWirelessRadioToggle; // 系统无线网/飞行模式开关 (OOC)
    uint16_t SystemWirelessRadioControl;// 系统无线控制 (本身体系)
    uint16_t SystemWirelessRadioNotification;// 系统无线状态通知
    uint16_t SystemBacklightToggle;     // 系统屏幕/背光切换 (OOC)
    uint16_t SystemDisplayMinimum;      // 系统亮度调至最低 (OSC)
    uint16_t SystemDisplayMaximum;      // 系统亮度调至最高 (OSC)
    uint16_t SystemLock;                // 系统锁定/锁屏 (OSC)
} System_Control_Map_TypeDef;

extern const System_Control_Map_TypeDef System_Control_Map;

#ifdef __cplusplus
}
#endif

#endif /* SYSTEM_CONTROL_MAP_H */
 `

const System_Control_MAP_C = `\
/**
 * @file system_control_map.c
 * @brief 填充固定的 USB HID Usage 常量数据
 */

#include "system_control_map.h"

const System_Control_Map_TypeDef System_Control_Map = {
    .SystemControl              = 0x0080,
    .SystemPowerDown            = 0x0081,
    .SystemSleep                = 0x0082,
    .SystemWakeUp               = 0x0083,
    .SystemContextMenu          = 0x0084,
    .SystemMainMenu             = 0x0085,
    .SystemAppMenu              = 0x0086,
    .SystemMenuHelp             = 0x0087,
    .SystemMenuExit             = 0x0088,
    .SystemMenuSelect           = 0x0089,
    .SystemMenuRight            = 0x008A,
    .SystemMenuLeft             = 0x008B,
    .SystemMenuUp               = 0x008C,
    .SystemMenuDown             = 0x008D,
    .SystemColdRestart          = 0x008E,
    .SystemWarmRestart          = 0x008F,
    .D_PadUp                    = 0x0090,
    .D_PadDown                  = 0x0091,
    .D_PadRight                 = 0x0092,
    .D_PadLeft                  = 0x0093,
    .IndexTrigger               = 0x0094,
    .SystemDock                 = 0x00A0,
    .SystemUndock               = 0x00A1,
    .SystemSetup                = 0x00A2,
    .SystemBreak                = 0x00A3,
    .SystemDebuggerBreak        = 0x00A4,
    .ApplicationBreak           = 0x00A5,
    .ApplicationDebuggerBreak   = 0x00A6,
    .SystemSpeakerMute          = 0x00A7,
    .SystemHibernate            = 0x00A8,
    .SystemDisplayInvert        = 0x00B0,
    .SystemDisplayInternal      = 0x00B1,
    .SystemDisplayExternal      = 0x00B2,
    .SystemDisplayBoth          = 0x00B3,
    .SystemDisplayDual          = 0x00B4,
    .SystemDisplayToggleIntExt  = 0x00B5,
    .SystemDisplaySwapPrimary   = 0x00B6,
    .SystemDisplayLCDAutoscale  = 0x00B7,
    .SystemScreenBlank          = 0x00D0,
    .SystemWirelessRadioToggle  = 0x00C6,
    .SystemWirelessRadioControl = 0x00C7,
    .SystemWirelessRadioNotification = 0x00C8,
    .SystemBacklightToggle      = 0x00D1,
    .SystemDisplayMinimum       = 0x00D2,
    .SystemDisplayMaximum       = 0x00D3,
    .SystemLock                 = 0x00D4
};
 `

export { System_Control_MAP_H, System_Control_MAP_C };