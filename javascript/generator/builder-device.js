import { toHexFormat } from "../utils/hex.js";
import { USB_DC_INIT_DEINIT_IRQ } from "../templates/usb-dc-init.js";

export function buildDeviceCode(interfaceInfo, cFileName, hFileName, chip = 'STM32') {
    // Map chip selection to the appropriate #include
    const chipIncludeMap = {
        'STM32':    '#include "main.h"',
        'CH32F10x': '#include "ch32f10x.h"',
        'CH58x':    '#include "CH58x_common.h"',
        'CH59x':    '#include "CH59x_common.h"',
    };
    const chipInclude = chipIncludeMap[chip] || '#include "main.h"';
    const devicecFileName = document.getElementById("DevicecFileNameInput").value;
    const devicehFileName = document.getElementById("DevicehFileNameInput").value;
    let haveHid = false;
    let haveCdc = false;
    let haveWinUSB = false;
    let haveKeyboard = false;
    let functionDefString = "";
    let callbackfunctionDefString = "";
    let USBD_Event_Handler_String = "";
    let USBD_Ep_Callback_String = "";
    let USBD_Intf_Init_String = "";
    let USBD_Ep_Init_String = "";
    let USBD_TypeDef_Init_String = "";
    let USBD_TypeDef_InitInFunc_String = "";
    let USBD_Intf_Write_Function_String = "";
    let USBD_Init_String = `\r\nusbd_desc_register(USBD_BUSID, usbddesc.Descriptor.buffer);`;
    let USBD_KeyBoard_ReportId_List = []; // {intf: number, id: number}[]
    let hFileData = "";
    let cFileData = "";
    let handleString = "";
    let typedefString = "";

    cFileData = `#include "${devicehFileName}"\
    \r\n#include "${hFileName}"\
    \r\n\
    ${USB_DC_INIT_DEINIT_IRQ}\
    \r\n\
#pragma region USBD_InEp_Write_Timeout
int USBD_InEp_Write_Timeout(uint8_t Usb_BusId, uint8_t InEp, const uint8_t *data, size_t Length, __IO uint8_t *state, size_t Timeout_Ms)
{
    if (!usb_device_is_configured(Usb_BusId)) {
        return -1;
    }

    if (!data || !state || !Length || !(InEp >> 7)) {
        return -2;
    }

    if (*state != USBD_STATE_IDLE) {
        return -3;
    }

    *state = USBD_STATE_BUSY;
    if (usbd_ep_start_write(Usb_BusId, InEp, data, Length) < 0) {
        *state = USBD_STATE_IDLE;
        return -4;
    }

    if (Timeout_Ms && usbd.Timeout.Get_SysTick != NULL) {
        size_t start_tick = usbd.Timeout.Get_SysTick();
        size_t wait_ticks = Timeout_Ms * usbd.Timeout.Tick_Per_Ms;

        while (*state == USBD_STATE_BUSY) {
            if ((usbd.Timeout.Get_SysTick() - start_tick) >= wait_ticks) {
                usbd_ep_set_stall(Usb_BusId, InEp);
                usbd_ep_clear_stall(Usb_BusId, InEp);
                *state = USBD_STATE_IDLE;
                return -5;
            }
        }
    } else {
        while (*state == USBD_STATE_BUSY) {
        }
    }

    return 0;
}
#pragma endregion USBD_InEp_Write_Timeout

#pragma region USBD_InEp_Write_IT
int USBD_InEp_Write_IT(uint8_t Usb_BusId, uint8_t InEp, const uint8_t *data, size_t Length, __IO uint8_t *state)
{
    if (!usb_device_is_configured(Usb_BusId)) {
        return -1;
    }

    if (!data || !state || !Length || !(InEp >> 7)) {
        return -2;
    }

    if (*state != USBD_STATE_IDLE) {
        return -3;
    }

    *state = USBD_STATE_BUSY;
    if (usbd_ep_start_write(Usb_BusId, InEp, data, Length) < 0) {
        *state = USBD_STATE_IDLE;
        return -4;
    }

    return 0;
}
#pragma endregion USBD_InEp_Write_IT

#pragma region USBD_Event_Callback
__weak void USBD_Event_Reset_Callback(uint8_t busid)
{
}

__weak void USBD_Event_Connected_Callback(uint8_t busid)
{
}

__weak void USBD_Event_Disconnected_Callback(uint8_t busid)
{
}

__weak void USBD_Event_Resume_Callback(uint8_t busid)
{
}

__weak void USBD_Event_Suspend_Callback(uint8_t busid)
{
}

__weak void USBD_Event_Configured_Callback(uint8_t busid)
{
}

__weak void USBD_Event_Set_Remote_Wakeup_Callback(uint8_t busid)
{
}

__weak void USBD_Event_Clr_Remote_Wakeup_Callback(uint8_t busid)
{
}
#pragma endregion USBD_Event_Callback
    \r\n\
    `;

    if (interfaceInfo.length) {
        //生成USB Device结构体
        let InterfaceNum = 0;
        for (let i = 0; i < interfaceInfo.length; i++) {
            let inputString = "";
            let outputString = "";

            switch (interfaceInfo[i]["Type"]) {
                case "HID":
                    {
                        USBD_Intf_Init_String += `\r\nstatic struct usbd_interface Intf${InterfaceNum} = {0};`;

                        USBD_Init_String += `\
                        \r\nusbd_add_interface(\
                        \r\n      USBD_BUSID,\
                        \r\n      usbd_hid_init_intf(\
                        \r\n      USBD_BUSID,\
                        \r\n      &Intf${InterfaceNum},\
                        \r\n      usbddesc.Intf${InterfaceNum}.Descriptor.buffer,\
                        \r\n      usbddesc.Intf${InterfaceNum}.Descriptor.Length));\
                        `;

                        haveHid = true;

                        let haveReportId = 0;
                        let VendorDefineReportId = 0;
                        let MouseReportId = 0;
                        let KeyboardReportId = 0;
                        let ConsumerReportId = 0;
                        let SystemControlReportId = 0;

                        //Input Endpoint
                        if (interfaceInfo[i]["Endpoint"]["In"]["Enabled"]) {
                            USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}InEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["In"]["Addr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_InEp0_Handler,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}InEp0);\
                            `;

                            USBD_Ep_Callback_String += `\
                            \r\n__weak void USBD_Intf${InterfaceNum}_InEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n}\
                            \r\nstatic void USBD_Intf${InterfaceNum}_InEp0_Handler(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n\tusbd.Intf${InterfaceNum}.InEndpoint.State = USBD_STATE_IDLE;\
                            \r\n\tUSBD_Intf${InterfaceNum}_InEp0_CpltCallback(busid, ep, nbytes);\
                            \r\n}\
                            `;

                            callbackfunctionDefString += `\
                            \r\nvoid USBD_Intf${InterfaceNum}_InEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes);\
                            `;

                            //Vendor define
                            if (interfaceInfo[i]["VendorDefine"]["Enabled"]) {
                                if (interfaceInfo[i]["VendorDefine"]["Input"]["Enabled"]) {
                                    VendorDefineReportId = interfaceInfo[i]["VendorDefine"]["Input"]["Id"];
                                    inputString += `\
                                    \r\n#pragma pack(push, 1)\
                                    \r\nstruct {\
                                    ${VendorDefineReportId ? `\
                                        \r\nuint8_t ReportId;\
                                        ` : ""}\
                                    \r\nuint8_t Data[${interfaceInfo[i]["VendorDefine"]["Input"]["Size"]}];\
                                    \r\n} VendorDefine;\
                                    \r\n#pragma pack(pop)\
                                    `;
                                }

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_VendorApp_Write_Input_Timeout(size_t Timeout_Ms)\
                                \r\n{\
                                ${interfaceInfo[i]["VendorDefine"]["Input"]["Id"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.VendorDefine.ReportId = ${interfaceInfo[i]["VendorDefine"]["Input"]["Id"]};` : ""}\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.VendorDefine,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.VendorDefine),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\n\
                                \r\nint USBD_Intf${InterfaceNum}_VendorApp_Write_Input_IT(void)\
                                \r\n{\
                                ${interfaceInfo[i]["VendorDefine"]["Input"]["Id"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.VendorDefine.ReportId = ${interfaceInfo[i]["VendorDefine"]["Input"]["Id"]};` : ""}\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.VendorDefine,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.VendorDefine),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `
                                \r\nint USBD_Intf${InterfaceNum}_VendorApp_Write_Input_Timeout(size_t Timeout_Ms);\
                                \r\nint USBD_Intf${InterfaceNum}_VendorApp_Write_Input_IT(void);\
                                `;
                            }

                            //Mouse
                            if (interfaceInfo[i]["Mouse"]["Enabled"]) {
                                MouseReportId = interfaceInfo[i]["Mouse"]["Id"]["Value"];

                                inputString += `\
                                \r\n#pragma pack(push, 1)\
                                \r\nstruct\
                                \r\n{\
                                ${MouseReportId ? `\
                                    \r\nunsigned char ReportId;\
                                    ` : ""}\
                                ${interfaceInfo[i]["Mouse"]["Button"]["Count"] ?
                                        (() => {
                                            let string = "";
                                            const dataType = interfaceInfo[i]["Mouse"]["Button"]["Count"] <= 8 ? "uint8_t" : "uint16_t";

                                            for (let j = 0; j < interfaceInfo[i]["Mouse"]["Button"]["Count"]; j++) {
                                                string += `\
                                                \r\n${dataType} BTN${j + 1} : 1;\
                                                `;
                                            }
                                            const VoidBits = interfaceInfo[i]["Mouse"]["Button"]["Bytes"] * 8 - interfaceInfo[i]["Mouse"]["Button"]["Count"];
                                            if ((VoidBits & 0b111) && VoidBits) {
                                                string += `\
                                                \r\n${dataType} : ${VoidBits & 0b111};\
                                                `;
                                            }

                                            string = `\r\nstruct\
                                            \r\n{\
                                            ${string}\
                                            \r\n} Button;\
                                            `;

                                            return string;
                                        })() : ""}\
                                ${interfaceInfo[i]["Mouse"]["X"]["Bytes"] < 2 ? "\r\nint8_t X;" : "\r\nint16_t X;"}\
                                ${interfaceInfo[i]["Mouse"]["Y"]["Bytes"] < 2 ? "\r\nint8_t Y;" : "\r\nint16_t Y;"}\
                                ${interfaceInfo[i]["Mouse"]["Wheel"]["Enabled"] ? "\r\nint8_t Wheel;" : ""}\
                                ${interfaceInfo[i]["Mouse"]["AcPan"]["Enabled"] ? "\r\nint8_t AcPan;" : ""}\
                                \r\n} Mouse;\
                                \r\n#pragma pack(pop)\
                                \r\n`;

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_Mouse_Write_Timeout(size_t Timeout_Ms)\
                                \r\n{\
                                ${interfaceInfo[i]["Mouse"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.Mouse.ReportId = ${interfaceInfo[i]["Mouse"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.Mouse,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.Mouse),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\n\
                                \r\nint USBD_Intf${InterfaceNum}_Mouse_Write_IT(void)\
                                \r\n{\
                                ${interfaceInfo[i]["Mouse"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.Mouse.ReportId = ${interfaceInfo[i]["Mouse"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.Mouse,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.Mouse),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `\
                                \r\nint USBD_Intf${InterfaceNum}_Mouse_Write_Timeout(size_t Timeout_Ms);\
                                \r\nint USBD_Intf${InterfaceNum}_Mouse_Write_IT(void);\
                                `;
                            }

                            //Keyboard
                            if (interfaceInfo[i]["Keyboard"]["Enabled"]) {
                                KeyboardReportId = interfaceInfo[i]["Keyboard"]["Id"]["Value"];
                                haveKeyboard = true;
                                USBD_KeyBoard_ReportId_List.push({ intf: InterfaceNum, id: KeyboardReportId });

                                inputString += `\
                                \r\n#pragma pack(push, 1)\
                                \r\nstruct\
                                \r\n{\
                                ${KeyboardReportId ? `\
                                    \r\nuint8_t ReportId;\
                                    ` : ""}\
                                \r\nstruct\
                                \r\n{\
                                \r\nuint8_t LeftCtrl : 1;\
                                \r\nuint8_t LeftShift : 1;\
                                \r\nuint8_t LeftAlt : 1;\
                                \r\nuint8_t LeftGUI : 1;\
                                \r\nuint8_t RightCtrl : 1;\
                                \r\nuint8_t RightShift : 1;\
                                \r\nuint8_t RightAlt : 1;\
                                \r\nuint8_t RightGUI : 1;\
                                \r\n} FunctionKey;\
                                \r\nuint8_t : 8;\
                                \r\nuint8_t NormalKey[${interfaceInfo[i]["Keyboard"]["NormalKey"]["Number"]}];\
                                \r\n} Keyboard; \
                                \r\n#pragma pack(pop)\
                                \r\n`;

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_Keyboard_Write_Input_Timeout(size_t Timeout_Ms)\
                                \r\n{\
                                ${interfaceInfo[i]["Keyboard"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.Keyboard.ReportId = ${interfaceInfo[i]["Keyboard"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.Keyboard,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.Keyboard),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\n\
                                \r\nint USBD_Intf${InterfaceNum}_Keyboard_Write_Input_IT(void)\
                                \r\n{\
                                ${interfaceInfo[i]["Keyboard"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.Keyboard.ReportId = ${interfaceInfo[i]["Keyboard"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.Keyboard,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.Keyboard),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `
                                \r\nint USBD_Intf${InterfaceNum}_Keyboard_Write_Input_Timeout(size_t Timeout_Ms);\
                                \r\nint USBD_Intf${InterfaceNum}_Keyboard_Write_Input_IT(void);\
                                `;
                            }

                            //Consumer
                            if (interfaceInfo[i]["Consumer"]["Enabled"]) {
                                ConsumerReportId = interfaceInfo[i]["Consumer"]["Id"]["Value"];

                                inputString += `\
                                \r\n#pragma pack(push, 1)\
                                \r\nstruct {\
                                ${ConsumerReportId ? `\
                                    \r\nuint8_t ReportId;\
                                    ` : ""}\
                                \r\nuint16_t Key[${interfaceInfo[i]["Consumer"]["Key"]["Number"]}];\
                                \r\n} Consumer;\
                                \r\n#pragma pack(pop)\
                                \r\n`;

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_Consumer_Write_Input_Timeout(size_t Timeout_Ms)\
                                \r\n{\
                                ${interfaceInfo[i]["Consumer"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.Consumer.ReportId = ${interfaceInfo[i]["Consumer"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.Consumer,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.Consumer),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\nint USBD_Intf${InterfaceNum}_Consumer_Write_Input_IT(void)\
                                \r\n{\
                                ${interfaceInfo[i]["Consumer"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.Consumer.ReportId = ${interfaceInfo[i]["Consumer"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.Consumer,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.Consumer),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `
                                \r\nint USBD_Intf${InterfaceNum}_Consumer_Write_Input_Timeout(size_t Timeout_Ms);\
                                \r\nint USBD_Intf${InterfaceNum}_Consumer_Write_Input_IT(void);\
                                `;
                            }

                            //System Control
                            if (interfaceInfo[i]["SystemControl"]["Enabled"]) {
                                SystemControlReportId = interfaceInfo[i]["SystemControl"]["Id"]["Value"];

                                inputString += `\
                                \r\n#pragma pack(push, 1)\
                                \r\nstruct {\
                                ${SystemControlReportId ? `\
                                    \r\nuint8_t ReportId;\
                                    ` : ""}\
                                \r\nuint8_t Data;\
                                \r\n} SystemControl;\
                                \r\n#pragma pack(pop)\
                                \r\n`;

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_SystemControl_Write_Input_Timeout(size_t Timeout_Ms)\
                                \r\n{\
                                ${interfaceInfo[i]["SystemControl"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.SystemControl.ReportId = ${interfaceInfo[i]["SystemControl"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.SystemControl,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.SystemControl),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\n\
                                \r\nint USBD_Intf${InterfaceNum}_SystemControl_Write_Input_IT(void)\
                                \r\n{\
                                ${interfaceInfo[i]["SystemControl"]["Id"]["Value"] ? `\r\n    usbd.Intf${InterfaceNum}.InEndpoint.Frame.SystemControl.ReportId = ${interfaceInfo[i]["SystemControl"]["Id"]["Value"]};` : ""}\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Frame.SystemControl,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Frame.SystemControl),\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `
                                \r\nint USBD_Intf${InterfaceNum}_SystemControl_Write_Input_Timeout(size_t Timeout_Ms);\
                                \r\nint USBD_Intf${InterfaceNum}_SystemControl_Write_Input_IT(void);\
                                `;
                            }

                            haveReportId = VendorDefineReportId | MouseReportId | KeyboardReportId | ConsumerReportId | SystemControlReportId;

                            inputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n};\
                            \r\n__IO uint8_t State;// Tx done flag\
                            ${haveReportId ? `\
                            \r\nstruct\
                            \r\n{\
                            ${VendorDefineReportId ? "\r\nuint8_t VendorDefine;" : ""}\
                            ${MouseReportId ? "\r\nuint8_t Mouse;" : ""}\
                            ${KeyboardReportId ? "\r\nuint8_t Keyboard;" : ""}\
                            ${ConsumerReportId ? "\r\nuint8_t Consumer;" : ""}\
                            ${SystemControlReportId ? "\r\nuint8_t SystemControl;" : ""}\
                            \r\n} ReportId;\
                                ` : ""}\
                            ${inputString != "" ? `\
                                \r\nunion {\
                                \r\nuint8_t Buffer[${interfaceInfo[i]["Endpoint"]["In"]["Size"]}];\
                                ${inputString}\
                                \r\n} __attribute__((aligned(4))) Frame;\
                                ` : ""}\
                            \r\n} InEndpoint;\
                            `;

                            USBD_TypeDef_Init_String += `\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["In"]["Addr"])},\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Size = ${interfaceInfo[i]["Endpoint"]["In"]["Size"]},\
                            \r\n.Intf${InterfaceNum}.InEndpoint.State = 0,\
                            ${haveReportId ? `\
                            ${VendorDefineReportId ? `\r\r.Intf${InterfaceNum}.InEndpoint.ReportId.VendorDefine = ${VendorDefineReportId}\,` : ""}\
                            ${MouseReportId ? `\r\r.Intf${InterfaceNum}.InEndpoint.ReportId.Mouse = ${MouseReportId}\,` : ""}\
                            ${KeyboardReportId ? `\r\r.Intf${InterfaceNum}.InEndpoint.ReportId.Keyboard = ${KeyboardReportId}\,` : ""}\
                            ${ConsumerReportId ? `\r\r.Intf${InterfaceNum}.InEndpoint.ReportId.Consumer = ${ConsumerReportId}\,` : ""}\
                            ${SystemControlReportId ? `\r\r.Intf${InterfaceNum}.InEndpoint.ReportId.SystemControl = ${SystemControlReportId}\,` : ""}\
                                ` : ""}\
                            `;
                        }


                        //Output Endpoint
                        if (interfaceInfo[i]["Endpoint"]["Out"]["Enabled"]) {
                            let haveReportId = 0;
                            let VendorDefineReportId = 0;

                            USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}OutEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["Out"]["Addr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_OutEp0_Handler,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}OutEp0);\
                            `;

                            USBD_Ep_Callback_String += `\
                            \r\n__weak void USBD_Intf${InterfaceNum}_OutEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n}\
                            \r\nstatic void USBD_Intf${InterfaceNum}_OutEp0_Handler(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum}.OutEndpoint.State = 1;\               
                            ${interfaceInfo[i]["AutoReRead"] ? `\r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Frame.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum}.OutEndpoint.Frame.Buffer));` : ""}\
                            \r\n\tUSBD_Intf${InterfaceNum}_OutEp0_CpltCallback(busid, ep, nbytes);\
                            \r\n}\
                            `;

                            callbackfunctionDefString += `\
                            \r\nvoid USBD_Intf${InterfaceNum}_OutEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes);\
                            `;

                            if (interfaceInfo[i]["VendorDefine"]["Enabled"]) {
                                if (interfaceInfo[i]["VendorDefine"]["Output"]["Enabled"] && interfaceInfo[i]["AutoStartRead"]) {

                                    USBD_Event_Handler_String += `\
                                    \r\nusbd_ep_start_read(\
                                    \r\n\tUSBD_BUSID,\
                                    \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Address,\
                                    \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Frame.Buffer,\
                                    \r\n\tsizeof(usbd.Intf${InterfaceNum}.OutEndpoint.Frame.Buffer));\
                                    `;

                                    VendorDefineReportId = interfaceInfo[i]["VendorDefine"]["Output"]["Id"];

                                    outputString += `\
                                    \r\n#pragma pack(push, 1)\
                                    \r\nstruct\
                                    \r\n{\
                                    ${interfaceInfo[i]["VendorDefine"]["Output"]["Id"] ? `\
                                        \r\nuint8_t  ReportId;\
                                        ` : ""}\
                                    \r\nuint8_t Data[${interfaceInfo[i]["VendorDefine"]["Output"]["Size"]}];\
                                    \r\n} VendorDefine;\
                                    \r\n#pragma pack(pop)\
                                    \r\n`;
                                }
                            }
                            haveReportId = VendorDefineReportId;

                            outputString = `\
                            \r\nstruct \
                            \r\n{\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n};\
                            \r\n__IO uint8_t State; // Rx done flag\
                            ${haveReportId ? `\
                            \r\nstruct\
                            \r\n{\
                            ${VendorDefineReportId ? "\r\nuint8_t VendorDefine;" : ""}\
                            \r\n} ReportId;\
                                ` : ""}\
                            ${outputString != "" ? `\
                                \r\nunion {\
                                \r\nuint8_t Buffer[${interfaceInfo[i]["Endpoint"]["Out"]["Size"]}];\
                                ${outputString}\
                                \r\n} __attribute__((aligned(4))) Frame;\
                                ` : ""}\
                            \r\n} OutEndpoint;\
                            `;

                            USBD_TypeDef_Init_String += `\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["Out"]["Addr"])},\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Size = ${interfaceInfo[i]["Endpoint"]["Out"]["Size"]},\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.State = 0,\
                            ${VendorDefineReportId ? `\
                                \r\r.Intf${InterfaceNum}.OutEndpoint.ReportId.VendorDefine = ${VendorDefineReportId},
                                ` : ""}\
                            `;
                        }

                        typedefString += `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst uint8_t Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                        ${inputString != "" ? `\r\n${inputString}\r\n` : ""}\
                        ${outputString != "" ? `\r\n${outputString}\r\n` : ""}\
                        \r\n} Intf${InterfaceNum};\r\n\
                        `;

                        InterfaceNum += 1;
                        break;
                    }

                case "CDC-ACM":
                    {
                        USBD_Intf_Init_String += `\r\nstatic struct usbd_interface Intf${InterfaceNum} = {0};`;
                        USBD_Intf_Init_String += `\r\nstatic struct usbd_interface Intf${InterfaceNum + 1} = {0};`;

                        haveCdc = true;
                        let inputTypeDefString = "";
                        let outputTypeDefString = "";
                        let intTypeDefString = "";

                        intTypeDefString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst uint32_t Address : 8;\
                        \r\nconst uint32_t Size : 24;\
                        \r\n};\
                        \r\n__IO uint8_t State;// Tx done flag\
                        \r\n#pragma pack(push, 1)\
                        \r\nstruct {\
                        \r\nconst uint8_t bmRequestType;    // 请求类型 (固定为 0xA1)\
                        \r\nconst uint8_t bNotification;    // 通知代码 (固定为 0x20)\
                        \r\nconst uint16_t wValue;          // 值 (固定为 0x0000)\
                        \r\nuint16_t wIndex;                // 接口索引\
                        \r\nconst uint8_t wLength;          // 数据长度 (固定为 0x0002)\
                        \r\nstruct {\
                        \r\nuint16_t bRxCarrier  : 1;  // DSR - 数据设备就绪\
                        \r\nuint16_t bTxCarrier  : 1;  // DTR - 数据终端就绪\
                        \r\nuint16_t bBreak      : 1;  // Break信号\
                        \r\nuint16_t bRingSignal : 1;  // RI - 振铃指示\
                        \r\nuint16_t bFraming    : 1;  // 帧错误\
                        \r\nuint16_t bParity     : 1;  // 奇偶校验错误\
                        \r\nuint16_t bOverRun    : 1;  // 溢出错误\
                        \r\nconst uint16_t Reversed0 : 1;  // 保留位\
                        \r\nconst uint16_t Reversed1 : 8;  // 高位字节的位字段 (通常全为0)\
                        \r\n} State;\
                        \r\n} __attribute__((packed)) Frame;\
                        \r\n#pragma pack(pop)\
                        \r\n} IntEndpoint;\
                        `;

                        USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}IntEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["IntEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_IntEp0_Handler,\
                            \r\n};\
                            `;

                        USBD_Init_String += `\
                        \r\nusbd_add_interface(\
                        \r\n      USBD_BUSID,\
                        \r\n      usbd_cdc_acm_init_intf(\
                        \r\n      USBD_BUSID,\
                        \r\n      &Intf${InterfaceNum}));\
                        `;
                        USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}IntEp0);\
                            `;

                        USBD_Ep_Callback_String += `\
                            \r\n__weak void USBD_Intf${InterfaceNum}_IntEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n}\
                            \r\nstatic void USBD_Intf${InterfaceNum}_IntEp0_Handler(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum}.IntEndpoint.State = USBD_STATE_IDLE;\
                            \r\nUSBD_Intf${InterfaceNum}_IntEp0_CpltCallback(busid, ep, nbytes);\
                            \r\n}\
                            `;

                        callbackfunctionDefString += `\
                            \r\nvoid USBD_Intf${InterfaceNum}_IntEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes);\
                        `;

                        USBD_Intf_Write_Function_String += `\
                        \r\nint USBD_Intf${InterfaceNum}_CDC_ACM_Int_Write_Input_Timeout(size_t Timeout_Ms)\
                        \r\n{\
                        \r\n    return USBD_InEp_Write_Timeout(\
                        \r\n        USBD_BUSID,\
                        \r\n        usbd.Intf${InterfaceNum}.IntEndpoint.Address,\
                        \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.IntEndpoint.State,\
                        \r\n        sizeof(usbd.Intf${InterfaceNum}.IntEndpoint.State),\
                        \r\n        &usbd.Intf${InterfaceNum}.IntEndpoint.State,\
                        \r\n        Timeout_Ms);\
                        \r\n}\
                        \r\n\
                        \r\nint USBD_Intf${InterfaceNum}_CDC_ACM_Int_Write_Input_IT(void)\
                        \r\n{\
                        \r\n    return USBD_InEp_Write_IT(\
                        \r\n        USBD_BUSID,\
                        \r\n        usbd.Intf${InterfaceNum}.IntEndpoint.Address,\
                        \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.IntEndpoint.State,\
                        \r\n        sizeof(usbd.Intf${InterfaceNum}.IntEndpoint.State),\
                        \r\n        &usbd.Intf${InterfaceNum}.IntEndpoint.State);\
                        \r\n}\
                        \r\n`;
                        functionDefString += `
                        \r\nint USBD_Intf${InterfaceNum}_CDC_ACM_Int_Write_Input_Timeout(size_t Timeout_Ms);\
                        \r\nint USBD_Intf${InterfaceNum}_CDC_ACM_Int_Write_Input_IT(void);\
                        `;

                        inputTypeDefString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst uint32_t Data;\
                        \r\nconst uint32_t Address : 8;\
                        \r\nconst uint32_t Size : 24;\
                        \r\n};\
                        \r\n__IO uint8_t State;// Tx done flag\
                        \r\n${(() => {
                                if (interfaceInfo[i]["TxLength"] == 0) {
                                    return "uint8_t *Buffer __attribute__((aligned(4)));"
                                } else {
                                    return `uint8_t Buffer[${interfaceInfo[i]["TxLength"]}] __attribute__((aligned(4)));`
                                }
                            })()}\
                        \r\n} InEndpoint;\
                        `;

                        USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum + 1}InEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum + 1}_InEp0_Handler,\
                            \r\n};\
                            `;

                        USBD_Init_String += `\
                        \r\nusbd_add_interface(\
                        \r\n      USBD_BUSID,\
                        \r\n      usbd_cdc_acm_init_intf(\
                        \r\n      USBD_BUSID,\
                        \r\n      &Intf${InterfaceNum + 1}));\
                        `;

                        USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum + 1}InEp0);\
                            `;

                        USBD_Ep_Callback_String += `\
                            \r\n__weak void USBD_Intf${InterfaceNum}_InEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n}\
                            \r\nstatic void USBD_Intf${InterfaceNum + 1}_InEp0_Handler(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n    if (((nbytes & (${interfaceInfo[i]["MaxMps"]} - 1)) == 0) && nbytes) {\
                            \r\n        /* send zlp */\
                            \r\n        usbd_ep_start_write(busid, ep, NULL, 0);\
                            \r\n    } else {\
                            \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.State = USBD_STATE_IDLE;\
                            \r\n        USBD_Intf${InterfaceNum}_InEp0_CpltCallback(busid, ep, nbytes);\
                            \r\n    }\
                            \r\n}\
                            `;
                        callbackfunctionDefString += `\
                            \r\nvoid USBD_Intf${InterfaceNum}_InEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes);\
                        `;

                        if (interfaceInfo[i]["TxLength"] == 0) {
                            USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_Timeout(uint8_t *buffer, size_t Length, size_t Timeout_Ms)\
                                \r\n{\
                                \r\n    if(buffer == NULL) {\
                                \r\n        return 0;\
                                \r\n    }\
                                \r\n\
                                \r\n\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.Address,\
                                \r\n        buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum + 1}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\n\
                                \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_IT(uint8_t *buffer, size_t Length)\
                                \r\n{\
                                \r\n    if(buffer == NULL) {\
                                \r\n        return 0;\
                                \r\n    }\
                                \r\n\
                                \r\n\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.Address,\
                                \r\n        buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum + 1}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                            functionDefString += `
                            \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_Timeout(uint8_t *buffer, size_t Length, size_t Timeout_Ms);\
                            \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_IT(uint8_t *buffer, size_t Length);\
                            `;

                        } else {
                            USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_Timeout(size_t Length, size_t Timeout_Ms)\
                                \r\n{\
                                \r\n    Length = Length > sizeof(usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer)\
                                \r\n        ? sizeof(usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer) \
                                \r\n        : Length;\
                                \r\n\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.Address,\
                                \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum + 1}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\n\
                                \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_IT(size_t Length)\
                                \r\n{\
                                \r\n    Length = Length > sizeof(usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer)\
                                \r\n        ? sizeof(usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer) \
                                \r\n        : Length;\
                                \r\n\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.Address,\
                                \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum + 1}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                            functionDefString += `
                            \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_Timeout(size_t Length, size_t Timeout_Ms);\
                            \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Write_Input_IT(size_t Length);\
                            `;
                        }

                        outputTypeDefString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst uint32_t Address : 8;\
                        \r\nconst uint32_t Size : 24;\
                        \r\n};\
                        \r\n__IO uint32_t State : 1;// Rx done flag\
                        \r\n__IO uint32_t RxLength : 31;\
                        \r\nuint8_t Buffer[${interfaceInfo[i]["RxLength"]}] __attribute__((aligned(4)));\
                        \r\n} OutEndpoint;\
                        `;

                        USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum + 1}OutEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum + 1}_OutEp0_Handler,\
                            \r\n};\
                            `;
                        USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum + 1}OutEp0);\
                            `;

                        USBD_Ep_Callback_String += `\
                            \r\n__weak void USBD_Intf${InterfaceNum}_OutEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n}\
                            \r\nstatic void USBD_Intf${InterfaceNum + 1}_OutEp0_Handler(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum + 1}.OutEndpoint.State = 1;\
                            \r\nusbd.Intf${InterfaceNum + 1}.OutEndpoint.RxLength = nbytes;\
                            ${interfaceInfo[i]["AutoReRead"] ? `\r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer));` : ""}\
                            \r\n\tUSBD_Intf${InterfaceNum}_OutEp0_CpltCallback(busid, ep, nbytes);\
                            \r\n}\
                            `;

                        callbackfunctionDefString += `\
                            \r\nvoid USBD_Intf${InterfaceNum}_OutEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes);\
                        `;

                        if (interfaceInfo[i]["AutoStartRead"]) {
                            USBD_Event_Handler_String += `\
                            \r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer));\
                            `;
                        }

                        typedefString += `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst uint8_t Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                        ${intTypeDefString}\
                        \r\n} Intf${InterfaceNum};\r\n\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst uint8_t Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                        ${inputTypeDefString}\
                        ${outputTypeDefString}\
                        \r\n} Intf${InterfaceNum + 1};\r\n\
                        `;

                        USBD_TypeDef_Init_String += `\
                        \r\n.Intf${InterfaceNum}.Type = 1,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["IntEpAddr"])},\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Size = 10,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.State = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.bmRequestType = 0xA1,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.bNotification = 0x20,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.wValue = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.wIndex = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.wLength = 2,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.bRxCarrier = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.bTxCarrier = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.bBreak = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.bRingSignal = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.bFraming = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.bParity = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.bOverRun = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.Reversed0 = 0,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Frame.State.Reversed1 = 0,\
                        \r\n.Intf${InterfaceNum + 1}.Type = 1,\
                        \r\n.Intf${InterfaceNum + 1}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                        \r\n.Intf${InterfaceNum + 1}.InEndpoint.Size = ${interfaceInfo[i]["MaxMps"]},\
                        \r\n.Intf${InterfaceNum + 1}.InEndpoint.State = 0,\
                        \r\n${(() => {
                                if (interfaceInfo[i]["TxLength"] == 0) {
                                    return `.Intf${InterfaceNum}.InEndpoint.Buffer = NULL,`
                                } else {
                                    return "";
                                }
                            })()}\
                        \r\n.Intf${InterfaceNum + 1}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                        \r\n.Intf${InterfaceNum + 1}.OutEndpoint.Size = ${interfaceInfo[i]["MaxMps"]},\
                        \r\n.Intf${InterfaceNum + 1}.OutEndpoint.State = 0,\
                        `;

                        InterfaceNum += 2;
                    }
                    break;

                case "WinUSB":
                    {
                        haveWinUSB = true;
                        USBD_Intf_Init_String += `\r\nstatic struct usbd_interface Intf${InterfaceNum} = {0};`;
                        let inputTypeDefString = "";
                        let outputTypeDefString = "";

                        USBD_Init_String += `\
                        \r\nusbd_msosv1_desc_register(\
                        \r\n      USBD_BUSID,\
                        \r\n      &usbd.Intf${InterfaceNum}.msosv1_desc);\
                        `;

                        USBD_Init_String += `\
                        \r\nusbd_add_interface(\
                        \r\n      USBD_BUSID,\
                        \r\n      &Intf${InterfaceNum});\
                        `;

                        if (interfaceInfo[i]["InEpEnabled"]) {
                            inputTypeDefString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n};\
                            \r\n__IO uint8_t State;// Tx done flag\
                            \r\n${(() => {
                                    if (interfaceInfo[i]["TxLength"] == 0) {
                                        return "uint8_t *Buffer __attribute__((aligned(4)));"
                                    } else {
                                        return `uint8_t Buffer[${interfaceInfo[i]["TxLength"]}] __attribute__((aligned(4)));`
                                    }
                                })()}\
                            \r\n} InEndpoint;\
                            `;

                            USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}InEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_InEp0_Handler,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}InEp0);\
                            `;

                            USBD_Ep_Callback_String += `\
                            \r\n__weak void USBD_Intf${InterfaceNum}_InEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n}\
                            \r\nstatic void USBD_Intf${InterfaceNum}_InEp0_Handler(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n    if ((nbytes & (64 - 1)) == 0 && nbytes) {\
                            \r\n        /* send zlp */\
                            \r\n        usbd_ep_start_write(busid, ep, NULL, 0);\
                            \r\n    } else {\
                            \r\n        usbd.Intf${InterfaceNum}.InEndpoint.State = USBD_STATE_IDLE;\
                            \r\n        USBD_Intf${InterfaceNum}_InEp0_CpltCallback(busid, ep, nbytes);\
                            \r\n    }\
                            \r\n}\
                            `;

                            callbackfunctionDefString += `\
                            \r\nvoid USBD_Intf${InterfaceNum}_InEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes);\
                            `;

                            if (interfaceInfo[i]["TxLength"] == 0) {
                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_Timeout(uint8_t *buffer, size_t Length, size_t Timeout_Ms)\
                                \r\n{\
                                \r\n    if(buffer == NULL) {\
                                \r\n        return 0;\
                                \r\n    }\
                                \r\n\
                                \r\n\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\n\
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_IT(uint8_t *buffer, size_t Length)\
                                \r\n{\
                                \r\n    if(buffer == NULL) {\
                                \r\n        return 0;\
                                \r\n    }\
                                \r\n\
                                \r\n\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_Timeout(uint8_t *buffer, size_t Length, size_t Timeout_Ms);\
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_IT(uint8_t *buffer, size_t Length);\
                                `;

                            } else {
                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_Timeout(size_t Length, size_t Timeout_Ms)\
                                \r\n{\
                                \r\n    Length = Length > sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Buffer)\
                                \r\n        ? sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Buffer) \
                                \r\n        : Length;\
                                \r\n\
                                \r\n    return USBD_InEp_Write_Timeout(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State,\
                                \r\n        Timeout_Ms);\
                                \r\n}\
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_IT(size_t Length)\
                                \r\n{\
                                \r\n    Length = Length > sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Buffer)\
                                \r\n        ? sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Buffer) \
                                \r\n        : Length;\
                                \r\n\
                                \r\n    return USBD_InEp_Write_IT(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                                \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Buffer,\
                                \r\n        Length,\
                                \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_Timeout(size_t Length, size_t Timeout_Ms);\
                                \r\nint USBD_Intf${InterfaceNum}_WinUSB_Write_Input_IT(size_t Length);\
                                `;
                            }

                        }

                        if (interfaceInfo[i]["OutEpEnabled"]) {
                            outputTypeDefString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n};\
                            \r\n__IO uint32_t State : 1;// Rx done flag\
                            \r\n__IO uint32_t RxLength : 31;\
                            \r\nuint8_t Buffer[${interfaceInfo[i]["RxLength"]}] __attribute__((aligned(4)));\
                            \r\n} OutEndpoint;\
                            `;

                            USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}OutEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_OutEp0_Hanlder,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}OutEp0);\
                            `;

                            if (interfaceInfo[i]["AutoStartRead"]) {
                                USBD_Event_Handler_String += `\
                                \r\nusbd_ep_start_read(\
                                \r\n\tUSBD_BUSID,\
                                \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Address,\
                                \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Buffer,\
                                \r\n\tsizeof(usbd.Intf${InterfaceNum}.OutEndpoint.Buffer));\
                                `;
                            }

                            USBD_Ep_Callback_String += `\
                            \r\n__weak void USBD_Intf${InterfaceNum}_OutEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n}\
                            \r\nstatic void USBD_Intf${InterfaceNum}_OutEp0_Hanlder(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum}.OutEndpoint.State = 1;\
                            \r\nusbd.Intf${InterfaceNum}.OutEndpoint.RxLength = nbytes;\
                            ${interfaceInfo[i]["AutoReRead"] ? `\r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum}.OutEndpoint.Buffer));` : ""}\
                            \r\n\tUSBD_Intf${InterfaceNum}_OutEp0_CpltCallback(busid, ep, nbytes);\
                            \r\n}\
                            `;

                            callbackfunctionDefString += `\
                            \r\nvoid USBD_Intf${InterfaceNum}_OutEp0_CpltCallback(uint8_t busid, uint8_t ep, uint32_t nbytes);\
                            `;
                        }


                        typedefString += `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst uint8_t Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                        \r\nstruct usb_msosv1_descriptor msosv1_desc;\
                        ${inputTypeDefString}\
                        ${outputTypeDefString}\
                        \r\n} Intf${InterfaceNum};\r\n\
                        `;

                        USBD_TypeDef_Init_String += `\
                        \r\n.Intf${InterfaceNum}.Type = 2,\
                        \r\n.Intf${InterfaceNum}.msosv1_desc.vendor_code = 0x17,\
                        ${interfaceInfo[i]["InEpEnabled"] ? `\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Size = 64,\
                            \r\n.Intf${InterfaceNum}.InEndpoint.State = 0,\
                            \r\n${(() => {
                                    if (interfaceInfo[i]["TxLength"] == 0) {
                                        return `.Intf${InterfaceNum}.InEndpoint.Buffer = NULL,`
                                    } else {
                                        return "";
                                    }
                                })()}\
                            ` : ""}\
                        ${interfaceInfo[i]["OutEpEnabled"] ? `\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Size = 64,\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.State = 0,\
                            ` : ""}\
                        `;

                        USBD_TypeDef_InitInFunc_String += `\
                        \r\nusbd.Intf${InterfaceNum}.msosv1_desc.string = usbddesc.Intf${InterfaceNum}.WCID_StringDescriptor_MSOS;\
                        \r\nusbd.Intf${InterfaceNum}.msosv1_desc.compat_id = usbddesc.Intf${InterfaceNum}.WINUSB_WCIDDescriptor;\
                        \r\nusbd.Intf${InterfaceNum}.msosv1_desc.comp_id_property = usbddesc.Intf${InterfaceNum}.WINUSB_IFx_WCIDProperties;\
                        `;

                        InterfaceNum += 1;
                    }
                    break;

                default:
                    break;
            }
            USBD_Init_String += `\r\n`;
        }
    }

    typedefString = `\
    \r\ntypedef struct {\
    ${typedefString}\
    ${haveKeyboard ? "\r\nuint8_t KeyBoardLedState;" : ""}\
    \r\nstruct\
    \r\n{\
    \r\n    uint32_t Tick_Per_Ms;\
    \r\n    uint32_t (*Get_SysTick)(void);\
    \r\n} Timeout;\
    \r\n} USBD_TypeDef;\
    `;

    hFileData = `\#ifndef ${devicehFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n#define ${devicehFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n\
    \r\n#ifdef __cplusplus\
    \r\nextern "C" {\
    \r\n#endif\
    \r\n\
    \r\n${chipInclude}\
    \r\n#include <stdbool.h>\
    \r\n#include "CherryUSB/core/usbd_core.h"\
    ${haveHid ? `\r\n#include "CherryUSB/class/hid/usbd_hid.h"` : ""}\
    ${(haveCdc || haveWinUSB) ? `\r\n#include "CherryUSB/class/cdc/usbd_cdc_acm.h"` : ""}\
    \r\n\
    \r\n#if defined(__CH32F10x_H)\
    \r\n#include "usb_regs.h"\
    \r\n#endif\
    \r\n\
    \r\n#define USBD_STATE_IDLE 0u\
    \r\n#define USBD_STATE_BUSY 1u\
    \r\n#define USBD_BUSID 0u\
    \r\n\
    ${typedefString}

int USBD_InEp_Write_Timeout(uint8_t Usb_BusId, uint8_t InEp, const uint8_t *data, size_t Length, __IO uint8_t *state, size_t Timeout_Ms);
int USBD_InEp_Write_IT(uint8_t Usb_BusId, uint8_t InEp, const uint8_t *data, size_t Length, __IO uint8_t *state);

void USBD_Event_Reset_Callback(uint8_t busid);
void USBD_Event_Connected_Callback(uint8_t busid);
void USBD_Event_Disconnected_Callback(uint8_t busid);
void USBD_Event_Resume_Callback(uint8_t busid);
void USBD_Event_Suspend_Callback(uint8_t busid);
void USBD_Event_Configured_Callback(uint8_t busid);
void USBD_Event_Set_Remote_Wakeup_Callback(uint8_t busid);
void USBD_Event_Clr_Remote_Wakeup_Callback(uint8_t busid);

void USBD_HID_Set_Report_Callback (uint8_t busid, uint8_t intf, uint8_t report_id, uint8_t report_type, uint8_t *report, uint32_t report_len);\r\n${callbackfunctionDefString}\
\r\n\
    \r\nvoid USBD_Init(void);\
    ${functionDefString}\
    \r\n\ 
    \r\nextern USBD_TypeDef usbd;\
    \r\n\
    \r\n#ifdef __cplusplus\
    \r\n}\
    \r\n#endif\
    \r\n\
    \r\n#endif`;

    document.getElementById("DevicehFileData").textContent = hFileData;

    USBD_Init_String = `\
    \r\nvoid USBD_Init(void)\
    \r\n{
#ifdef HAL_MODULE_ENABLED
    /* --- STM32 HAL Environment --- */
    // Assign the HAL tick provider function
    usbd.Timeout.Get_SysTick = &HAL_GetTick;

    // Calculate ticks per millisecond.
    // HAL_GetTickFreq() returns Hz (e.g., 1000 for 1ms per tick).
    usbd.Timeout.Tick_Per_Ms = HAL_GetTickFreq() / 1000;

    // Safety check: ensure at least 1 tick per ms to avoid division by zero or logic errors
    if (usbd.Timeout.Tick_Per_Ms == 0) {
        usbd.Timeout.Tick_Per_Ms = 1;
    }

#elif defined(__CH59x_COMM_H__) || defined(__CH58x_COMM_H__)
    usbd.Timeout.Get_SysTick = &SYS_GetSysTickCnt;

    // Calculate ticks per millisecond.
    // HAL_GetTickFreq() returns Hz (e.g., 1000 for 1ms per tick).
    uint32_t Sys_Clk = GetSysClock();
    usbd.Timeout.Tick_Per_Ms = ((SysTick->CTLR & SysTick_CTLR_STCLK) ? Sys_Clk : (Sys_Clk >> 3)) / 1000;

    // Safety check: ensure at least 1 tick per ms to avoid division by zero or logic errors
    if (usbd.Timeout.Tick_Per_Ms == 0) {
        usbd.Timeout.Tick_Per_Ms = 1;
    }

    SysTick->CTLR |= SysTick_CTLR_STE;

#else
    /* --- Non-STM32 or Bare-metal Environment --- */
    /**
     * When usbd.Timeout.Get_SysTick = NULL or
     * usbd.Timeout.Tick_Per_Ms = 0,
     * the USBD_InEp_Write_Timeout() function will not provide
     * timeout functionality and will loop continuously
     * until *state == USBD_STATE_IDLE.
     */

    // TODO: User must provide a function that returns current system time/ticks.
    usbd.Timeout.Get_SysTick = NULL;

    // TODO: User must define how many ticks increment in 1 millisecond.
    usbd.Timeout.Tick_Per_Ms = 0;
#endif

#if (defined(STM32F1) || define(__CH32F10x_H)) && CONFIG_USBDEV_FSDEV_PMA_ACCESS != 2
#warning "CONFIG_USBDEV_FSDEV_PMA_ACCESS should be 2 for STM32F1 (overridden in usb_config.h)"
#endif

#if defined(STM32F1)
    /* Toggle D+ (PA12) low then release to force host re-detection */
    {
        GPIO_InitTypeDef GPIO_InitStruct = {0};
        /* Switch PA12 to push-pull output and drive low */
        GPIO_InitStruct.Pin   = GPIO_PIN_12;
        GPIO_InitStruct.Mode  = GPIO_MODE_OUTPUT_PP;
        GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
        HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
        HAL_GPIO_WritePin(GPIOA, GPIO_PIN_12, GPIO_PIN_RESET);
        /* Restore PA12 to AF push-pull; external 1.5k pull-up pulls D+ high */
        GPIO_InitStruct.Mode  = GPIO_MODE_AF_PP;
        GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
        HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
    }
#endif

    ${USBD_TypeDef_InitInFunc_String}\
    \r\n\
    ${USBD_Init_String}\
    \r\nusbd_initialize(USBD_BUSID, USB_BASE, USBD_Event_Handler);\
    \r\n}\
    `;

    USBD_Event_Handler_String = `\
#pragma region USBD_Event_Handler
static void USBD_Event_Handler(uint8_t busid, uint8_t event)
{
    switch (event) {
        case USBD_EVENT_RESET:
            USBD_Event_Reset_Callback(busid);
            break;
        case USBD_EVENT_CONNECTED:
            USBD_Event_Connected_Callback(busid);
            break;
        case USBD_EVENT_DISCONNECTED:
            USBD_Event_Disconnected_Callback(busid);
            break;
        case USBD_EVENT_RESUME:
            USBD_Event_Resume_Callback(busid);
            break;
        case USBD_EVENT_SUSPEND:
            USBD_Event_Suspend_Callback(busid);
            break;
        case USBD_EVENT_CONFIGURED:
        ${USBD_Event_Handler_String}
            USBD_Event_Configured_Callback(busid);
            break;
        case USBD_EVENT_SET_REMOTE_WAKEUP:
            USBD_Event_Set_Remote_Wakeup_Callback(busid);
            break;
        case USBD_EVENT_CLR_REMOTE_WAKEUP:
            USBD_Event_Clr_Remote_Wakeup_Callback(busid);
            break;

        default:
            break;
    }
}
#pragma endregion USBD_Event_Handler
    `;

    let USBD_Hid_Set_Report_String = `\
__weak void USBD_HID_Set_Report_Callback (uint8_t busid, uint8_t intf, uint8_t report_id, uint8_t report_type, uint8_t *report, uint32_t report_len) {
}
    \r\nvoid usbd_hid_set_report(uint8_t busid, uint8_t intf, uint8_t report_id, uint8_t report_type, uint8_t *report, uint32_t report_len)\
    \r\n{\
        ${haveKeyboard ? `\
        ${(() => {
                if (USBD_KeyBoard_ReportId_List.length) {
                    // Group by intf, generate per-interface conditions
                    let conditions = USBD_KeyBoard_ReportId_List.map(kb => {
                        if (kb.id) {
                            return `(intf == ${kb.intf} && report_id == ${kb.id})`;
                        } else {
                            return `(intf == ${kb.intf})`;
                        }
                    });
                    return `\r\nif (report_type == HID_REPORT_OUTPUT) {\
                    \r\n    if (${conditions.join(' || ')}) {\
                    \r\n        usbd.KeyBoardLedState = report[1];\
                    \r\n    }\
                    \r\n}`;
                }
                return "";
            })()}\
        ` : ""}\
    \r\nUSBD_HID_Set_Report_Callback (busid, intf, report_id, report_type, report, report_len);\
    \r\n}\
    `;

    USBD_TypeDef_Init_String = `\
    \r\nUSBD_TypeDef usbd = {\
    ${USBD_TypeDef_Init_String}\
    \r\n};\
    `;

    cFileData = `${cFileData}\
    \r\n\
    ${USBD_Event_Handler_String}\
    \r\n\
    ${USBD_Hid_Set_Report_String}\
    \r\n\
    ${USBD_Intf_Init_String}\
    \r\n\
    ${USBD_Ep_Callback_String}\
    \r\n\
    ${USBD_Ep_Init_String}\
    \r\n\
    ${USBD_TypeDef_Init_String}\
    \r\n\
    ${USBD_Init_String}\
    \r\n
    ${USBD_Intf_Write_Function_String}\
    `;

    document.getElementById("DevicecFileData").textContent = cFileData;
}
