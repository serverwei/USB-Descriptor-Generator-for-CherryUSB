用于CherryUSB的USB描述符生成和USB初始化。<br>
生成代码仅支持fsdev外设，其他外设请自行解决。<br>
仅支持HID的vendor define、mouse、keyboard、consumer，CDC-ACM，WinUSB。<br>
使用1.4.3版本CherryUSB。<br>
void usb_dc_low_level_init(void)和USB中断回调函数目前只有STM32F0、STM32L0、STM32G4、STM32F1、CH32F10x适配了生成，其他请自行解决。<br>

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
