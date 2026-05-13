·用于CherryUSB的USB描述符生成和USB初始化。<br>
·生成代码仅支持fsdev外设，其他外设请自行解决。<br>
·仅支持HID的vendor define、mouse、keyboard、consumer，CDC-ACM，WinUSB。<br>
·使用1.4.3版本CherryUSB。<br>
·void usb_dc_low_level_init(void)和USB中断回调函数目前只有STM32F0、STM32L0、STM32G4、STM32F1、CH32F10x适配了生成，其他请自行解决。<br>
·在非STM32的HAL库的环境中，在USBD_Init()中自行实现usbd.Timeout.Get_SysTick函数调用和usbd.Timeout.Tick_Per_Ms实际值，以供Timeout类型的写入函数调用。<br>
·使用CH32/CH58x/CH59x时，需要手动新建一个main.h的文件，并且将相关头文件包含；例如CH58x/CH59x：main.h中应有#include "CH58x_common.h"或#include "CH59x_common.h".<br>
·使用CH58x/CH59x需要手动到CherryUSB中下载CherryUSB/port/ch32目录下的usb_ch58x_dc_usbfs.c和usb_ch58x_usbfs_reg.h文件到对应目录中，并且删除port/fsdev文件夹下的文件；如果不想手动添加CherryUSB/port/ch32到包含目录，在usb_ch58x_dc_usbfs.c中将#include "usbd_core.h"改为#include "../../core/usbd_core.h"的相对目录调用。<br>

# USB接口组合对照表
| 组合名称 | 接口1 | 接口2 | 备注 |
|---------|-------|-------|------|
| WinUSB+CDC | WinUSB | CDC | - |
| WinUSB+HID | WinUSB | HID | - |
| CDC+CDC | CDC | CDC | - |
| CDC+HID | CDC | HID | 可交换顺序 |
| HID+CDC | HID | CDC | 可交换顺序 |

注意，在HID中，vendor define和mouse不能存在同一个interface，其他无影响。

CherryUSB项目地址：https://github.com/cherry-embedded/CherryUSB/tree/4d6b12c704b7acfbc6b473d98c1829f0befe4bc4 <br>
<br>
Online Page: https://serverwei.github.io/USB-Descriptor-Generator-for-CherryUSB/<br>
