# USB Descriptor Generator for CherryUSB

这是一个专为 CherryUSB (v1.4.3) 设计的 USB 描述符生成与配置初始化工具。

在线访问：[USB-Descriptor-Generator-for-CherryUSB](https://serverwei.github.io/USB-Descriptor-Generator-for-CherryUSB/)  
项目地址：[CherryUSB](https://github.com/cherry-embedded/CherryUSB/)

---

## 功能与支持特性

### 1. 支持的 USB 设备类 (USB Classes)
工具目前支持以下特定 USB 类的代码生成：
* **HID 设备**：
    * 厂商自定义 (Vendor Defined)
    * 鼠标 (Mouse)
    * 键盘 (Keyboard)
    * 消费电子控制 (Consumer)
    * 系统控制 (System Control)
* **CDC-ACM** (虚拟串口)
* **WinUSB** 
    > **重要限制**：使用 WinUSB 时，必须将其配置在 Interface 0。

### 2. 硬件外设与底层适配 (Hardware Support)
* **驱动生成限制**：代码生成仅支持 fsdev 和 ch58x/ch59x 外设，其他外设请自行解决。
* **底层初始化与中断**：
    目前工具仅针对以下 MCU 适配了 void usb_dc_low_level_init(void) 和 USB 中断回调函数的自动生成：
    * **ST 系列**：STM32F0, STM32L0, STM32G4, STM32F1
    * **沁恒系列**：CH32F10x, CH58x, CH59x
    > 注意：若使用上述以外的芯片型号，相关底层函数请自行解决。

---

## 开发注意事项

### 关于 USBD_Init() 中的超时（Timeout）配置

工具在生成的 `USBD_Init()` 函数中集成了超时机制的条件编译。对于不同的硬件环境，处理机制如下：

#### 1. 已适配环境（自动生成）
* **STM32 HAL 环境**：自动绑定 `&HAL_GetTick` 并根据 `HAL_GetTickFreq()` 计算 `Tick_Per_Ms`。
* **CH58x / CH59x 环境**：自动绑定 `&SYS_GetSysTickCnt`，读取系统时钟并开启 SysTick。

#### 2. 非 STM32 / 裸机等其他环境（需手动修改）
若不属于上述环境，代码将落入 `#else` 分支。**默认生成的代码如下：**

```c
#else
    /**
     * When usbd.Timeout.Get_SysTick = NULL or
     * usbd.Timeout.Tick_Per_Ms = 0,
     * the USBD_InEp_Write_Timeout() function will not provide
     * timeout functionality and will loop continuously
     * until *state == USBD_STATE_IDLE.
     */

    /* --- Non-STM32 or Bare-metal Environment --- */
    // TODO: User must provide a function that returns current system time/ticks.
    usbd.Timeout.Get_SysTick = NULL;

    // TODO: User must define how many ticks increment in 1 millisecond.
    usbd.Timeout.Tick_Per_Ms = 0;
#endif
