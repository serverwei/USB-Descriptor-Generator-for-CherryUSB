export const USB_DC_INIT_DEINIT_IRQ = `\

#ifndef __weak
#if defined(__CC_ARM)
#define __weak __weak
#elif defined(__GNUC__)
#define __weak __attribute__ ((weak))
#endif
#endif

#ifndef USB_BASE
#if defined(__CH32F10x_H)
#define USB_BASE RegBase
#elif defined(__CH58x_COMM_H__) || defined(__CH59x_COMM_H__)
#define USB_BASE USB_BASE_ADDR
#else
//You need to define USB_BASE to the correct USB peripheral address.
//#define USB_BASE
#endif
#endif

#pragma region usb_dc_low_level_init
#if defined(STM32F0) || defined(STM32L0) || defined(STM32G4) || defined(STM32F1)
void usb_dc_low_level_init(void)
{
#if defined(RCC_OSCILLATORTYPE_HSI48)
    // #if defined(STM32G4) || defined(STM32F0) || defined(STM32L0)
    RCC_OscInitTypeDef RCC_OscInitStruct = {0};

    RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI48;
    RCC_OscInitStruct.HSI48State     = RCC_HSI48_ON;

    if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK) {
        Error_Handler();
    }

    RCC_PeriphCLKInitTypeDef PeriphClkInit = {0};

    PeriphClkInit.PeriphClockSelection = RCC_PERIPHCLK_USB;
    PeriphClkInit.UsbClockSelection    = RCC_USBCLKSOURCE_HSI48;
    if (HAL_RCCEx_PeriphCLKConfig(&PeriphClkInit) != HAL_OK) {
        Error_Handler();
    }
#elif defined(STM32F1)
    RCC_PeriphCLKInitTypeDef PeriphClkInit = {0};
    PeriphClkInit.PeriphClockSelection     = RCC_PERIPHCLK_USB;
    if (HAL_RCC_GetSysClockFreq() == 72000000) {
        PeriphClkInit.UsbClockSelection = RCC_USBCLKSOURCE_PLL_DIV1_5;
    } else {
        PeriphClkInit.UsbClockSelection = RCC_USBCLKSOURCE_PLL;
    }
    if (HAL_RCCEx_PeriphCLKConfig(&PeriphClkInit) != HAL_OK) {
        Error_Handler();
    }
#endif
    /* USB clock enable */
    __HAL_RCC_USB_CLK_ENABLE();

/* USB interrupt Init */
#if defined(STM32F1)
    HAL_NVIC_SetPriority(USB_LP_CAN1_RX0_IRQn, 0, 0);
    HAL_NVIC_EnableIRQ(USB_LP_CAN1_RX0_IRQn);
#elif defined(STM32G4)
    HAL_NVIC_SetPriority(USB_LP_IRQn, 0, 0);
    HAL_NVIC_EnableIRQ(USB_LP_IRQn);
#else
    HAL_NVIC_SetPriority(USB_IRQn, 0, 0);
    HAL_NVIC_EnableIRQ(USB_IRQn);
#endif
}
#pragma endregion usb_dc_low_level_init

#pragma region usb_dc_low_level_deinit
#elif defined(__CH32F10x_H)
void usb_dc_low_level_init(void)
{
    if (SystemCoreClock == 72000000) {
        RCC_USBCLKConfig(RCC_USBCLKSource_PLLCLK_1Div5);
    } else if (SystemCoreClock == 48000000) {
        RCC_USBCLKConfig(RCC_USBCLKSource_PLLCLK_Div1);
    }
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_USB, ENABLE);

    if (PWR_VDD_SupplyVoltage() == PWR_VDD_5V) {
        EXTEN->EXTEN_CTR |= EXTEN_USB_5V_SEL;
    } else {
        EXTEN->EXTEN_CTR &= ~EXTEN_USB_5V_SEL;
    }

    (EXTEN->EXTEN_CTR) |= EXTEN_USBD_PU_EN;

    NVIC_InitTypeDef NVIC_InitStructure;
    NVIC_InitStructure.NVIC_IRQChannel                   = USB_LP_CAN1_RX0_IRQn;
    NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0;
    NVIC_InitStructure.NVIC_IRQChannelSubPriority        = 0;
    NVIC_InitStructure.NVIC_IRQChannelCmd                = ENABLE;
    NVIC_Init(&NVIC_InitStructure);
}

#elif defined(__CH58x_COMM_H__) || defined(__CH59x_COMM_H__)
void usb_dc_low_level_init (void) {
    PFIC_EnableIRQ (USB_IRQn);
}

#else
// You need to fill the usb_dc_low_level_init function correctly
void usb_dc_low_level_init(void)
{
}
#endif

void usb_dc_low_level_deinit(void)
{
#if defined(STM32F0) || defined(STM32L0) || defined(STM32G4) || defined(STM32F1)
    __HAL_RCC_USB_CLK_DISABLE();

#if defined(STM32F1)
    HAL_NVIC_DisableIRQ(USB_LP_CAN1_RX0_IRQn);
#elif defined(STM32G4)
    HAL_NVIC_DisableIRQ(USB_LP_IRQn);
#else
    HAL_NVIC_DisableIRQ(USB_IRQn);
#endif

#elif defined(__CH32F10x_H)
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_USB, DISABLE);

    NVIC_InitTypeDef NVIC_InitStructure;
    NVIC_InitStructure.NVIC_IRQChannel                   = USB_LP_CAN1_RX0_IRQn;
    NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0;
    NVIC_InitStructure.NVIC_IRQChannelSubPriority        = 0;
    NVIC_InitStructure.NVIC_IRQChannelCmd                = DISABLE;
    NVIC_Init(&NVIC_InitStructure);

#elif defined(__CH59x_COMM_H__)
    PFIC_DisableIRQ (USB_IRQn);
    USB_Disable();
    USB_DisablePin();
    R8_USB_INT_FG = 0xFF;
    
#elif defined(__CH58x_COMM_H__)
    PFIC_DisableIRQ (USB_IRQn);
    USB_Disable();
    (R16_PIN_CONFIG &= ~(RB_PIN_USB_EN | RB_UDP_PU_EN));
    R8_USB_INT_FG = 0xFF;
    
#else

#endif
}
#pragma endregion usb_dc_low_level_deinit

#pragma region USB_IRQHandler
#if defined(STM32F0) || defined(STM32L0)
void USB_IRQHandler(void)
{
    extern void USBD_IRQHandler(uint8_t busid);
    USBD_IRQHandler(USBD_BUSID);
}

#elif defined(STM32G4) || defined(STM32F1)
void USB_LP_IRQHandler(void)
{
    extern void USBD_IRQHandler(uint8_t busid);
    USBD_IRQHandler(USBD_BUSID);
}

#elif defined(__CH32F10x_H)
void USB_LP_CAN1_RX0_IRQHandler(void)
{
    extern void USBD_IRQHandler(uint8_t busid);
    USBD_IRQHandler(USBD_BUSID);
}

#elif defined(__CH59x_COMM_H__) || defined(__CH58x_COMM_H__)

#else
// You need to replace USB_IRQHandler with the correct USB interrupt callback function
void USB_IRQHandler(void)
{
    extern void USBD_IRQHandler(uint8_t busid);
    USBD_IRQHandler(USBD_BUSID);
}
#endif
#pragma endregion USB_IRQHandler\
\r\n\
`;
