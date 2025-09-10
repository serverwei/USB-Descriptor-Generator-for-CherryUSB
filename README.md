用于CherryUSB的USB描述符生成和USB初始化，仅支持HID的vendor define、mouse、keyboard、consumer和CDC-ACM。
vendor define不能和mouse在同一个接口中，会无法枚举，其他组合无影响。
在CherryUSB 1.4.2上验证通过，能够正常枚举。
void usb_dc_low_level_init(void)和USB中断回调函数目前只有STM32F0、STM32L0、STM32G4、STM32F1适配了生成，其他请自行解决。
