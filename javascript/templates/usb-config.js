export const USB_CONFIG_H = `\
\r\n/*
 * Copyright (c) 2022, sakumisu
 *
 * SPDX-License-Identifier: Apache-2.0
 */
#ifndef CHERRYUSB_CONFIG_H
#define CHERRYUSB_CONFIG_H

/* ================ USB common Configuration ================ */

// #define CONFIG_USB_PRINTF(...) printf(__VA_ARGS__)
#define CONFIG_USB_PRINTF(...) ((void)(0))

#define usb_malloc(size)       malloc(size)
#define usb_free(ptr)          free(ptr)

#ifndef CONFIG_USB_DBG_LEVEL
#define CONFIG_USB_DBG_LEVEL 0
#endif

/* Enable print with color */
// #define CONFIG_USB_PRINTF_COLOR_ENABLE

/* data align size when use dma */
#ifndef CONFIG_USB_ALIGN_SIZE
#define CONFIG_USB_ALIGN_SIZE 4
#endif

/* attribute data into no cache ram */
#define USB_NOCACHE_RAM_SECTION __attribute__((section(".noncacheable")))

/* ================= USB Device Stack Configuration ================ */

/* Ep0 in and out transfer buffer */
#ifndef CONFIG_USBDEV_REQUEST_BUFFER_LEN
#define CONFIG_USBDEV_REQUEST_BUFFER_LEN 512
#endif

/* Setup packet log for debug */
// #define CONFIG_USBDEV_SETUP_LOG_PRINT

/* Send ep0 in data from user buffer instead of copying into ep0 reqdata
 * Please note that user buffer must be aligned with CONFIG_USB_ALIGN_SIZE
 */
// #define CONFIG_USBDEV_EP0_INDATA_NO_COPY

/* Check if the input descriptor is correct */
// #define CONFIG_USBDEV_DESC_CHECK

/* Enable test mode */
// #define CONFIG_USBDEV_TEST_MODE

/* ================ USB Device Port Configuration ================*/

#ifndef CONFIG_USBDEV_MAX_BUS
#define CONFIG_USBDEV_MAX_BUS 1 // for now, bus num must be 1 except hpm ip

#endif

#ifndef CONFIG_USBDEV_EP_NUM
#define CONFIG_USBDEV_EP_NUM 8
#endif

/* ---------------- FSDEV Configuration ---------------- */
#define CONFIG_USBDEV_FSDEV_PMA_ACCESS __PMA_ACCESS__ // maybe 1 or 2, many chips may have a difference

#endif\
`;

/**
 * Returns the usb_config.h content with the correct PMA_ACCESS value for the selected chip.
 * @param {string} chip - One of 'STM32', 'CH32F10x', 'CH58x', 'CH59x'
 * @param {string} [stm32Sub='Other'] - STM32 sub-variant: 'Other' or 'STM32F10x'
 * @returns {string}
 */
export function getUsbConfigH(chip = 'STM32', stm32Sub = 'Other') {
    const pmaAccess = (chip === 'CH32F10x' || (chip === 'STM32' && stm32Sub === 'STM32F10x')) ? '2' : '1';
    return USB_CONFIG_H.replace('__PMA_ACCESS__', pmaAccess);
}
