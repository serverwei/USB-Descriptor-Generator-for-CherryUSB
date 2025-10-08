const USB_CONFIG_H = `
/*
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
#define CONFIG_USBDEV_FSDEV_PMA_ACCESS 1 // maybe 1 or 2, many chips may have a difference

#endif
`;

/**
 * 
 * @param {Element} element 
 * @param {number} number 
 */
function hexValueInput(element = new Element, number) {
    const string = element.value;
    const hexOnly = String(string).toUpperCase().replace(/[^0-9A-F]/g, '');
    element.value = hexOnly;
}

function GenRandomGUID(element = new Element) {
    let tableNode = element.parentNode.parentElement.parentNode;
    let input = tableNode.getElementsByTagName("input");

    const uuid = crypto.randomUUID().toUpperCase();
    input[0].value = uuid.slice(0, 8);
    input[1].value = uuid.slice(9, 13);
    input[2].value = uuid.slice(14, 18);
    input[3].value = uuid.slice(19, 23);
    input[4].value = uuid.slice(24, 36);
}

/**
 * 
 * @param {Element} element 
 */
function deleteInterface(element = new Element) {
    element.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        element.parentNode.parentNode.parentNode.parentNode);
}

function addHidInterface() {
    let area = document.getElementById("InterfaceArea");
    let intf = document.createElement("div");
    intf.style = "display: flex; flex-direction: row; border: 2px solid #333;";
    intf.className = "Interface";
    intf.value = "HID";

    let ep = document.createElement("div");
    ep.style = "display: flex; flex-direction: column;"
    let div = document.createElement("div");
    div.appendChild(document.createElement("div"));
    div.getElementsByTagName("div")[0].style = "display: flex; flex-direction: row;"
    div.getElementsByTagName("div")[0].appendChild(document.createElement("div"));
    div.getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML = "HID Class";
    div.getElementsByTagName("div")[0].appendChild(document.createElement("button"));
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].innerHTML = "Delete";
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].type = "button";
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].onclick = function () {
        deleteInterface(this);
    };
    ep.appendChild(div);

    let table = document.createElement("table");
    let tr;
    let td;

    //Input endpoint
    {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "In endpoit";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Address"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "InEpAddr";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Interval(ms)"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "InEpInterval";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 1;
        td.getElementsByTagName("input")[0].min = 1;
        tr.appendChild(td);
        table.appendChild(tr);
    }

    //Output endpoint
    {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Out endpoit";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Address"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "OutEpAddr";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Interval(ms)"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "OutEpInterval";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 1;
        td.getElementsByTagName("input")[0].min = 1;
        tr.appendChild(td);
        table.appendChild(tr);
    }
    ep.appendChild(table);
    intf.appendChild(ep);

    //vendor define
    {
        div = document.createElement("div");

        table = document.createElement("table");
        table.className = "vendorDefine";
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Vendor Define<br>Enabled";
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "vendorDefineEnabled";
        td.getElementsByTagName("input")[0].type = "checkbox";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Input<br>Report ID";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "vendorDefineInReId";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 255;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Input size<br>(Bytes)";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "vendorDefineInSize";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 64;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 65536;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Output<br>Report ID";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "vendorDefineOutReId";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 255;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Output size<br>(Bytes)";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "vendorDefineOutSize";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 64;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 65536;
        tr.appendChild(td);
        table.appendChild(tr);
        div.appendChild(table);
        div.appendChild(document.createElement("div"));
        div.children[1].style = "height: max-content;";

        intf.appendChild(div);
    }

    //mouse
    {
        table = document.createElement("table");
        table.className = "mouse";
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Mouse<br>Enabled";
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseEnabled";
        td.getElementsByTagName("input")[0].type = "checkbox";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Report ID";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseReId";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 255;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Button<br>number";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseBtnNum";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 3;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 16;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "X minimun";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseXMin";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = -127;
        td.getElementsByTagName("input")[0].min = -32768;
        td.getElementsByTagName("input")[0].max = 32767;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "X maximun";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseXMax";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 127;
        td.getElementsByTagName("input")[0].min = -32768;
        td.getElementsByTagName("input")[0].max = 32767;
        tr.appendChild(td);
        table.appendChild(tr);


        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Y minimun";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseYMin";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = -127;
        td.getElementsByTagName("input")[0].min = -32768;
        td.getElementsByTagName("input")[0].max = 32767;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Y maximun";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseYMax";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 127;
        td.getElementsByTagName("input")[0].min = -32768;
        td.getElementsByTagName("input")[0].max = 32767;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Wheel<br>Enabled";
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseWheelEnabled";
        td.getElementsByTagName("input")[0].type = "checkbox";
        td.getElementsByTagName("input")[0].checked = "checked";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "AC Pan<br>Enabled";
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "mouseAcPanEnabled";
        td.getElementsByTagName("input")[0].type = "checkbox";
        tr.appendChild(td);
        table.appendChild(tr);

        intf.appendChild(table);
    }

    //keyboard
    {
        div = document.createElement("div");

        table = document.createElement("table");
        table.className = "keyboard";
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Keyboard<br>Enabled";
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "keyboardEnabled";
        td.getElementsByTagName("input")[0].type = "checkbox";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Report ID";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "keyboardReId";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 255;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Key<br>number";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "keyboardKeyNumber";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 6;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 128;
        tr.appendChild(td);
        table.appendChild(tr);

        div.appendChild(table);
        div.appendChild(document.createElement("div"));
        div.children[1].style = "height: max-content;";

        intf.appendChild(div);
    }

    //comsumer
    {
        div = document.createElement("div");

        table = document.createElement("table");
        table.className = "comsumer";
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Comsumer<br>Enabled";
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "consumerEnabled";
        td.getElementsByTagName("input")[0].type = "checkbox";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Report ID";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "consumerReId";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 255;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Key<br>number";
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "consumerKeyNumber";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 2;
        td.getElementsByTagName("input")[0].min = 0;
        td.getElementsByTagName("input")[0].max = 128;
        tr.appendChild(td);
        table.appendChild(tr);

        div.appendChild(table);
        div.appendChild(document.createElement("div"));
        div.children[1].style = "height: max-content;";

        intf.appendChild(div);
    }

    area.appendChild(intf);
}

function addCdcInterface() {
    let area = document.getElementById("InterfaceArea");
    let intf = document.createElement("div");
    intf.style = "display: flex; flex-direction: row; border: 2px solid #333;";
    intf.className = "Interface";
    intf.value = "CDC-ACM";

    let ep = document.createElement("div");
    ep.style = "display: flex; flex-direction: column;"
    let div = document.createElement("div");
    div.appendChild(document.createElement("div"));
    div.getElementsByTagName("div")[0].style = "display: flex; flex-direction: row;"
    div.getElementsByTagName("div")[0].appendChild(document.createElement("div"));
    div.getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML = "CDC ACM Class";
    div.getElementsByTagName("div")[0].appendChild(document.createElement("button"));
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].innerHTML = "Delete";
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].type = "button";
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].onclick = function () {
        deleteInterface(this);
    };
    ep.appendChild(div);

    let table = document.createElement("table");
    let tr;
    let td;

    //Int endpoint
    {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Interrupt endpoit";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Address"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "IntEpAddr";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);
    }

    //Input endpoint
    {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "In endpoit";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Address"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "InEpAddr";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);
    }

    //Output endpoint
    {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Out endpoit";
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Address"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "OutEpAddr";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);
    }
    ep.appendChild(table);
    intf.appendChild(ep);

    //Cdc params
    {
        table = document.createElement("table");

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "CDC_MAX_MPS(Bytes)"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "CDC_MAX_MPS";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 64;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Rx Length(Bytes)"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "CDC_RX_Length";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 1024;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Tx Length(Bytes)"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "CDC_TX_Length";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 1024;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);
    }
    intf.appendChild(table);

    area.appendChild(intf);
}

function addWinUsbInterface() {
    let area = document.getElementById("InterfaceArea");
    let intf = document.createElement("div");
    intf.style = "display: flex; flex-direction: row; border: 2px solid #333;";
    intf.className = "Interface";
    intf.value = "WinUSB";

    let ep = document.createElement("div");
    ep.style = "display: flex; flex-direction: column;"
    let div = document.createElement("div");
    div.appendChild(document.createElement("div"));
    div.getElementsByTagName("div")[0].style = "display: flex; flex-direction: row;"
    div.getElementsByTagName("div")[0].appendChild(document.createElement("div"));
    div.getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML = "WinUSB Class";
    div.getElementsByTagName("div")[0].appendChild(document.createElement("button"));
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].innerHTML = "Delete";
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].type = "button";
    div.getElementsByTagName("div")[0].getElementsByTagName("button")[0].onclick = function () {
        deleteInterface(this);
    };
    ep.appendChild(div);

    let table = document.createElement("table");
    let tr;
    let td;
    let checkbox;

    //Input endpoint
    {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "In endpoit";
        tr.appendChild(td);
        td = document.createElement("td");
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "WinUSB_Enabled_InEp";
        checkbox.checked = true;
        td.appendChild(checkbox);
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Address"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "InEpAddr";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);
    }

    //Output endpoint
    {
        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Out endpoit";
        tr.appendChild(td);
        td = document.createElement("td");
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "WinUSB_Enabled_OutEp";
        checkbox.checked = true;
        td.appendChild(checkbox);
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Address"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "OutEpAddr";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 0;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);
    }
    ep.appendChild(table);
    intf.appendChild(ep);


    //WinUSB params
    {
        table = document.createElement("table");

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Rx Length(Bytes)"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "WinUSB_RX_Length";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 1024;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "Tx Length(Bytes)"
        tr.appendChild(td);
        td = document.createElement("td");
        td.appendChild(document.createElement("input"));
        td.getElementsByTagName("input")[0].className = "WinUSB_TX_Length";
        td.getElementsByTagName("input")[0].type = "number";
        td.getElementsByTagName("input")[0].value = 1024;
        td.getElementsByTagName("input")[0].min = 0;
        tr.appendChild(td);
        table.appendChild(tr);
    }
    intf.appendChild(table);

    //GUID Setting
    {
        let input;
        let button;
        table = document.createElement("table");
        tr = document.createElement("tr");
        td = document.createElement("td");
        button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "Random GUID";
        button.onclick = function () {
            GenRandomGUID(this);
        };
        td.appendChild(button);
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement("tr");
        td = document.createElement("td");
        td.innerHTML = "GUID";
        tr.appendChild(td);

        //GUID 0
        td = document.createElement("td");
        input = document.createElement("input");
        input.className = "WinUSB_GUID_0";
        input.type = "text";
        input.value = "00000000";
        input.maxLength = 8;
        input.style = "width: 65px";
        input.oninput = function () {
            hexValueInput(this, 8);
        };
        td.appendChild(input);
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = "-";
        tr.appendChild(td);

        //GUID 1
        td = document.createElement("td");
        input = document.createElement("input");
        input.className = "WinUSB_GUID_1";
        input.type = "text";
        input.value = "0000";
        input.maxLength = 4;
        input.style = "width: 35px";
        input.oninput = function () {
            hexValueInput(this, 4);
        };
        td.appendChild(input);
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = "-";
        tr.appendChild(td);

        //GUID 2
        td = document.createElement("td");
        input = document.createElement("input");
        input.className = "WinUSB_GUID_2";
        input.type = "text";
        input.value = "0000";
        input.maxLength = 4;
        input.style = "width: 35px";
        input.oninput = function () {
            hexValueInput(this, 4);
        };
        td.appendChild(input);
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = "-";
        tr.appendChild(td);

        //GUID 3
        td = document.createElement("td");
        input = document.createElement("input");
        input.className = "WinUSB_GUID_3";
        input.type = "text";
        input.value = "0000";
        input.maxLength = 4;
        input.style = "width: 35px";
        input.oninput = function () {
            hexValueInput(this, 4);
        };
        td.appendChild(input);
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = "-";
        tr.appendChild(td);

        //GUID 4
        td = document.createElement("td");
        input = document.createElement("input");
        input.className = "WinUSB_GUID_4";
        input.type = "text";
        input.value = "000000000000";
        input.maxLength = 12;
        input.style = "width: 95px";
        input.oninput = function () {
            hexValueInput(this, 12);
        };
        td.appendChild(input);
        tr.appendChild(td);

        table.appendChild(tr);
    }
    intf.appendChild(table);

    area.appendChild(intf);
}

function toHexFormat(number = 0, width = 2) {
    number >>>= 0;
    let hex = number.toString(16).toUpperCase();
    while (hex.length < width) {
        hex = "0" + hex;
    }

    if (hex.length > width) {
        hex = hex.slice(hex.length - width, hex.length);
    }
    return hex;
}

function stringToWcharArrayStringComplete(str) {
    let result = "";
    let totalBytes = 0; // 新增：用于统计总字节数

    for (let i = 0; i < str.length; i++) {
        let codePoint = str.charCodeAt(i);
        let originalChar = str[i];
        let charBytes = 2; // 默认每个字符占2字节

        // 检查是否是高代理项（用于UTF-16代理对）
        if (codePoint >= 0xD800 && codePoint <= 0xDBFF && i + 1 < str.length) {
            const nextCodePoint = str.charCodeAt(i + 1);
            // 检查是否是低代理项
            if (nextCodePoint >= 0xDC00 && nextCodePoint <= 0xDFFF) {
                // 计算完整的Unicode码点
                codePoint = (codePoint - 0xD800) * 0x400 + (nextCodePoint - 0xDC00) + 0x10000;
                originalChar = str.substring(i, i + 2); // 获取代理对表示的字符
                i++; // 跳过下一个字符（低代理项）
                charBytes = 4; // 代理对字符占4字节
            }
        } else if (codePoint > 0xFFFF) {
            charBytes = 4; // 非BMP字符占4字节
        }

        // 处理特殊字符的显示
        let charDisplay = originalChar;
        switch (originalChar) {
            case '\r': charDisplay = '\\r'; break;
            case '\n': charDisplay = '\\n'; break;
            case '\t': charDisplay = '\\t'; break;
            case '\\': charDisplay = '\\\\'; break;
            // 可以添加其他需要转义的特殊字符
        }

        // 对于16位wchar，使用小端序输出两个字节（低位在前）
        if (codePoint <= 0xFFFF) {
            // 小端序：低位字节在前
            const lowByte = codePoint & 0xFF;
            const highByte = (codePoint & 0xFF00) >> 8;
            result += `0x${lowByte.toString(16).padStart(2, '0').toUpperCase()}, 0x${highByte.toString(16).padStart(2, '0').toUpperCase()},\t\t// ${charDisplay}\r\n`;
        } else {
            // 对于大于16位的码点（需要32位wchar），使用小端序分成四个字节
            // 小端序：最低位字节在前
            const byte4 = codePoint & 0xFF;
            const byte3 = (codePoint & 0xFF00) >> 8;
            const byte2 = (codePoint & 0xFF0000) >> 16;
            const byte1 = (codePoint & 0xFF000000) >> 24;
            result += `0x${byte4.toString(16).padStart(2, '0').toUpperCase()}, 0x${byte3.toString(16).padStart(2, '0').toUpperCase()}, 0x${byte2.toString(16).padStart(2, '0').toUpperCase()}, 0x${byte1.toString(16).padStart(2, '0').toUpperCase()},\t\t// ${charDisplay}\r\n`;
        }

        totalBytes += charBytes; // 累加字节数
    }

    // 添加终止符并更新字节数
    // result += "0x00, 0x00,\r\n";
    // totalBytes += 2; // 终止符占2字节

    // 返回结果对象，包含字符串和字节数
    return [result, totalBytes];
}

function generateCode() {
    if (document.getElementsByClassName("Interface").length == 0) {
        alert("No interface.");
        return;
    }

    let intf = document.getElementsByClassName("Interface");
    console.log("intf.length: " + intf.length);
    let tmp;
    let deviceString;
    let ManufacturerStringSource = document.getElementById("ManufacturerString").value;
    let ProductStringSource = document.getElementById("ProductString").value;
    let SerialNumberStringSource = document.getElementById("SerialNumberString").value;

    //device descriptor
    {
        deviceString = "/* Device Descriptor */\r\n";
        deviceString += "0x12,\t\t// bLength\r\n";
        deviceString += "0x01,\t\t// bDescriptorType\r\n";
        tmp = document.getElementById("bcdUSB").value;
        deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// bcdUSB\r\n`;
        tmp = document.getElementById("bDeviceClass").value;
        deviceString += `0x${tmp},\t\t// bDeviceClass\r\n`;
        tmp = document.getElementById("bDeviceSubClass").value;
        deviceString += `0x${tmp},\t\t// bDeviceSubClass\r\n`;
        tmp = document.getElementById("bDeviceProtocol").value;
        deviceString += `0x${tmp},\t\t// bDeviceProtocol\r\n`;
        tmp = document.getElementById("bMaxPacketSize0").value * 1;
        deviceString += `0x${tmp.toString(16)},\t\t// bMaxPacketSize0\r\n`;
        tmp = document.getElementById("vendorId").value;
        deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// idVendor\r\n`;
        tmp = document.getElementById("productId").value;
        deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// idProduct\r\n`;
        tmp = document.getElementById("bcdDevice").value;
        deviceString += `0x${tmp.slice(2, 4)}, 0x${tmp.slice(0, 2)},\t// bcdDevice\r\n`;
        if (ManufacturerStringSource.length) {
            deviceString += `0x01,\t\t// iManufacturer\r\n`;
        } else {
            deviceString += `0x00,\t\t// iManufacturer\r\n`;
        }
        if (ProductStringSource.length) {
            deviceString += `0x02,\t\t// iProduct\r\n`;
        } else {
            deviceString += `0x00,\t\t// iProduct\r\n`;
        }
        if (SerialNumberStringSource.length) {
            deviceString += `0x03,\t\t// iSerialNumber\r\n`;
        } else {
            deviceString += `0x00,\t\t// iSerialNumber\r\n`;
        }
        deviceString += `0x01,\t\t// bNumConfigurations\r\n`;
    }

    //Inteface handle
    let interfaceNum = 0;//接口数量
    let interfaceConfigString = [];//接口配置字符串
    let interfaceConfigTotalLength = 0;//接口配置总字节长度
    let interfaceDescriptorString = [];//接口描述符集合
    let interfaceDescriptorStringLength = [];//接口描述符长度集合
    let interfaceInfo = [];//接口信息集合
    if (intf.length) {
        for (let i = 0; i < intf.length; i++) {
            const interfaceNode = intf[i];
            interfaceConfigString[i] = "";
            interfaceDescriptorStringLength[i] = 0;


            switch (interfaceNode.value) {
                case "HID":
                    {
                        interfaceInfo[i] = {};
                        interfaceInfo[i]["Type"] = "HID";

                        const InEpAddr = interfaceNode.getElementsByClassName("InEpAddr")[0].value | 0x80;
                        const OutEpAddr = interfaceNode.getElementsByClassName("OutEpAddr")[0].value | 0x00;
                        const InEpInterval = interfaceNode.getElementsByClassName("InEpInterval")[0].value | 0x00;
                        const OutEpInterval = interfaceNode.getElementsByClassName("OutEpInterval")[0].value | 0x00;
                        let needInEp = false;
                        let needOutEp = false;
                        let InEpSize = 0;
                        let OutEpSize = 0;

                        let stringTmp = "";
                        let stringLen = 0;
                        //Check vendor define
                        interfaceInfo[i]["VendorDefine"] = {};
                        interfaceInfo[i]["VendorDefine"]["Enabled"] = interfaceNode.getElementsByClassName("vendorDefineEnabled")[0].checked;
                        if (interfaceInfo[i]["VendorDefine"]["Enabled"]) {
                            stringLen = 0;
                            const inReId = interfaceNode.getElementsByClassName("vendorDefineInReId")[0].value & 0xFF;
                            let inSize = interfaceNode.getElementsByClassName("vendorDefineInSize")[0].value | 0x00;
                            const outReId = interfaceNode.getElementsByClassName("vendorDefineOutReId")[0].value & 0xFF;
                            let outSize = interfaceNode.getElementsByClassName("vendorDefineOutSize")[0].value | 0x00;
                            stringTmp += "\r\n/* Vendor Define Descriptor */\r\n";
                            stringTmp += "0x06, 0x00, 0xFF,\t// Usage page (Vendor Defined Page 0)\r\n";
                            stringLen += 3;
                            stringTmp += "0x09, 0x01,\t\t// Usage (Vendor Usage 1)\r\n";
                            stringLen += 2;
                            stringTmp += "0xA1, 0x01,\t\t// Collection (Application)\r\n";
                            stringLen += 2;

                            interfaceInfo[i]["VendorDefine"]["Input"] = {};
                            interfaceInfo[i]["VendorDefine"]["Input"]["Enabled"] = inSize ? true : false;
                            interfaceInfo[i]["VendorDefine"]["Input"]["Id"] = inReId;
                            if (inSize) {
                                if (inReId) {
                                    inSize++;
                                    stringTmp += `0x85, 0x${toHexFormat(inReId)},\t\t// Report ID\r\n`;
                                    stringLen += 2;
                                }
                                needInEp = true;
                                InEpSize = InEpSize < inSize ? inSize : InEpSize;

                                stringTmp += `0x09, 0x01,\t\t// Usage (Vendor Usage 1)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x00,\t\t// Logical minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0xFF,\t\t// Logical maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report size\r\n`;
                                stringLen += 2;
                                if (inSize <= 255) {
                                    stringTmp += `0x95, 0x${toHexFormat(inSize)},\t\t// Report count\r\n`;
                                    stringLen += 2;
                                } else if (inSize <= 65535) {
                                    stringTmp += `0x96, 0x${toHexFormat(inSize & 0xFF)}, 0x${toHexFormat(inSize >> 8)},\t// Report count\r\n`;
                                    stringLen += 3;
                                }
                                stringTmp += `0x81, 0x02,\t\t// Input (Data,Var,Abs)\r\n`;
                                stringLen += 2;
                            }

                            interfaceInfo[i]["VendorDefine"]["Output"] = {};
                            interfaceInfo[i]["VendorDefine"]["Output"]["Enabled"] = outSize ? true : false;
                            interfaceInfo[i]["VendorDefine"]["Output"]["Id"] = outReId;
                            if (outSize) {
                                if (outReId) {
                                    outSize++;
                                    stringTmp += `0x85, 0x${toHexFormat(outReId)},\t\t// Report ID\r\n`;
                                    stringLen += 2;
                                }
                                needOutEp = true;
                                OutEpSize = OutEpSize < outSize ? outSize : OutEpSize;

                                stringTmp += `0x09, 0x01,\t\t// Usage (Vendor Usage 1)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x00,\t\t// Logical minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0xFF,\t\t// Logical maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report size\r\n`;
                                stringLen += 2;
                                if (outSize <= 255) {
                                    stringTmp += `0x95, 0x${outSize.toString(16)},\t\t// Report count\r\n`;
                                    stringLen += 2;
                                } else if (outSize <= 65535) {
                                    stringTmp += `0x96, 0x${toHexFormat(outSize & 0xFF)}, 0x${toHexFormat(outSize >> 8)},\t// Report count\r\n`;
                                    stringLen += 3;
                                }
                                stringTmp += `0x91, 0x02,\t\t// Output (Data,Var,Abs)\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0xC0,\t\t\t// End collection */\r\n`;
                            stringLen += 1;
                            interfaceInfo[i]["VendorDefine"]["Input"]["Size"] = inSize;
                            interfaceInfo[i]["VendorDefine"]["Output"]["Size"] = outSize;

                            interfaceDescriptorStringLength[i] += stringLen;
                        }

                        //Check mouse
                        interfaceInfo[i]["Mouse"] = {};
                        interfaceInfo[i]["Mouse"]["Enabled"] = interfaceNode.getElementsByClassName("mouseEnabled")[0].checked;
                        if (interfaceInfo[i]["Mouse"]["Enabled"]) {
                            stringLen = 0;
                            let reportSize = 0;
                            const reportId = interfaceNode.getElementsByClassName("mouseReId")[0].value * 1;
                            let buttonNum = interfaceNode.getElementsByClassName("mouseBtnNum")[0].value * 1;
                            let xMin = interfaceNode.getElementsByClassName("mouseXMin")[0].value * 1;
                            let xMax = interfaceNode.getElementsByClassName("mouseXMax")[0].value * 1;
                            let yMin = interfaceNode.getElementsByClassName("mouseYMin")[0].value * 1;
                            let yMax = interfaceNode.getElementsByClassName("mouseYMax")[0].value * 1;
                            const wheel = Boolean(interfaceNode.getElementsByClassName("mouseWheelEnabled")[0].checked);
                            const acPan = Boolean(interfaceNode.getElementsByClassName("mouseAcPanEnabled")[0].checked);

                            stringTmp += "\r\n/* Mouse Descriptor */\r\n";
                            stringTmp += `0x05, 0x01,\t\t// Usage Page (Generic Desktop)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x02,\t\t// Usage (Mouse)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x01,\t\t// Collection (Application)\r\n`;
                            stringLen += 2;

                            interfaceInfo[i]["Mouse"]["Id"] = {};
                            interfaceInfo[i]["Mouse"]["Id"]["Value"] = reportId;
                            interfaceInfo[i]["Mouse"]["Id"]["Shift"] = 0;
                            if (reportId) {
                                reportSize += 1;
                                stringTmp += `0x85, 0x${toHexFormat(reportId)},\t\t// Report ID\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0x09, 0x01,\t\t// Usage (Pointer)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x00,\t\t// Collection (Physical))\r\n`;
                            stringLen += 2;

                            interfaceInfo[i]["Mouse"]["Button"] = {};
                            interfaceInfo[i]["Mouse"]["Button"]["Enabled"] = buttonNum ? true : false;
                            interfaceInfo[i]["Mouse"]["Button"]["Count"] = buttonNum;
                            if (buttonNum) {
                                let bytes = 0;
                                buttonNum = buttonNum > 16 ? 16 : buttonNum;
                                bytes = (buttonNum / 8) + (buttonNum & 0b111) ? 1 : 0;
                                reportSize += bytes;

                                stringTmp += `0x05, 0x09,\t\t// Usage Page (Button)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x19, 0x01,\t\t// Usage Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x29, 0x${toHexFormat(buttonNum)},\t\t// Usage Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x00,\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x01,\t\t// Logical Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x01,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x${toHexFormat(buttonNum)},\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x02,\t\t// Input (Data, Var, Abs)\r\n`;
                                stringLen += 2;
                                if (buttonNum & 0b111) {
                                    let bits = buttonNum & 0b111;
                                    bits = 8 - bits;
                                    stringTmp += `0x75, 0x01,\t\t// Report Size\r\n`;
                                    stringLen += 2;
                                    stringTmp += `0x95, 0x${toHexFormat(bits)},\t\t// Report Count\r\n`;
                                    stringLen += 2;
                                    stringTmp += `0x81, 0x03,\t\t// Input (Const, Var, Abs)\r\n`;
                                    stringLen += 2;
                                }
                                interfaceInfo[i]["Mouse"]["Button"]["Shift"] = reportId ? 1 : 0;
                                interfaceInfo[i]["Mouse"]["Button"]["Bytes"] = bytes;
                            } else {
                                interfaceInfo[i]["Mouse"]["Button"]["Shift"] = 0;
                                interfaceInfo[i]["Mouse"]["Button"]["Bytes"] = 0;
                            }

                            // X
                            interfaceInfo[i]["Mouse"]["X"] = {};
                            interfaceInfo[i]["Mouse"]["X"]["Max"] = xMax;
                            interfaceInfo[i]["Mouse"]["X"]["Min"] = xMin;
                            interfaceInfo[i]["Mouse"]["X"]["Shift"] = reportSize;
                            stringTmp += `0x05, 0x01,\t\t// Usage Page (Generic Desktop)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x30,\t\t// Usage (X)\r\n`;
                            stringLen += 2;
                            if ((xMin >= -128 && xMin < 128) && (xMax >= -128 && xMax < 128)) {
                                interfaceInfo[i]["Mouse"]["X"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x15, 0x${toHexFormat(xMin)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x${toHexFormat(xMax)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x02,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["X"]["Bytes"] = 2;
                                reportSize += 2;

                                stringTmp += `0x16, 0x${toHexFormat((xMin >>> 0) & 0xFF)}, 0x${toHexFormat(((xMin >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x26, 0x${toHexFormat((xMax >>> 0) & 0xFF)}, 0x${toHexFormat(((xMax >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x75, 0x10,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x02,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            }

                            // Y
                            interfaceInfo[i]["Mouse"]["Y"] = {};
                            interfaceInfo[i]["Mouse"]["Y"]["Max"] = yMax;
                            interfaceInfo[i]["Mouse"]["Y"]["Min"] = yMin;
                            interfaceInfo[i]["Mouse"]["Y"]["Shift"] = reportSize;
                            stringTmp += `0x09, 0x31,\t\t// Usage (Y)\r\n`;
                            stringLen += 2;
                            if ((yMin >= -128 && yMin < 128) && (yMax >= -128 && yMax < 128)) {
                                interfaceInfo[i]["Mouse"]["Y"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x15, 0x${toHexFormat(yMin)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x${toHexFormat(yMax)},\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x02,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["Y"]["Bytes"] = 2;
                                reportSize += 2;

                                stringTmp += `0x16, 0x${toHexFormat((yMin >>> 0) & 0xFF)}, 0x${toHexFormat(((yMin >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x26, 0x${toHexFormat((yMax >>> 0) & 0xFF)}, 0x${toHexFormat(((yMax >>> 0) >> 8) & 0xFF)},\t// Logical Minimum\r\n`;
                                stringLen += 3;
                                stringTmp += `0x75, 0x10,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x02,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            }

                            interfaceInfo[i]["Mouse"]["Wheel"] = {};
                            interfaceInfo[i]["Mouse"]["Wheel"]["Enabled"] = wheel;
                            if (wheel) {
                                interfaceInfo[i]["Mouse"]["Wheel"]["Shift"] = reportSize;
                                interfaceInfo[i]["Mouse"]["Wheel"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x09, 0x38,\t\t// Usage (Wheel)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x15, 0x81,\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x7F,\t\t// Logical Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["Wheel"]["Shift"] = 0;
                                interfaceInfo[i]["Mouse"]["Wheel"]["Bytes"] = 0;
                            }

                            interfaceInfo[i]["Mouse"]["AcPan"] = {};
                            interfaceInfo[i]["Mouse"]["AcPan"]["Enabled"] = acPan;
                            if (acPan) {
                                interfaceInfo[i]["Mouse"]["AcPan"]["Shift"] = reportSize;
                                interfaceInfo[i]["Mouse"]["AcPan"]["Bytes"] = 1;
                                reportSize += 1;

                                stringTmp += `0x05, 0x0C,\t\t// Usage Page (Consumer Page)\r\n`;
                                stringLen += 2;
                                stringTmp += `0x0A, 0x38, 0x02,\t// Usage (AC Pan)\r\n`;
                                stringLen += 3;
                                stringTmp += `0x15, 0x81,\t\t// Logical Minimum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x25, 0x7F,\t\t// Logical Maximum\r\n`;
                                stringLen += 2;
                                stringTmp += `0x75, 0x08,\t\t// Report Size\r\n`;
                                stringLen += 2;
                                stringTmp += `0x95, 0x01,\t\t// Report Count\r\n`;
                                stringLen += 2;
                                stringTmp += `0x81, 0x06,\t\t// Input (Data, Var, Relative)\r\n`;
                                stringLen += 2;
                            } else {
                                interfaceInfo[i]["Mouse"]["AcPan"]["Shift"] = 0;
                                interfaceInfo[i]["Mouse"]["AcPan"]["Bytes"] = 0;
                            }

                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;
                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;

                            interfaceDescriptorStringLength[i] += stringLen;
                            needInEp = true;
                            InEpSize = InEpSize < reportSize ? reportSize : InEpSize;
                        }

                        //Check keyboard
                        interfaceInfo[i]["Keyboard"] = {};
                        interfaceInfo[i]["Keyboard"]["Enabled"] = interfaceNode.getElementsByClassName("keyboardEnabled")[0].checked;
                        if (interfaceInfo[i]["Keyboard"]["Enabled"]) {
                            stringLen = 0;
                            let reportSize = 0;
                            let reportId = interfaceNode.getElementsByClassName("keyboardReId")[0].value & 0xFF;
                            let keyNum = interfaceNode.getElementsByClassName("keyboardKeyNumber")[0].value & 0xFF;

                            stringTmp += "\r\n/* Keyboard Descriptor */\r\n";
                            stringTmp += `0x05, 0x01,\t\t// Usage Page (Generic Desktop)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x06,\t\t// Usage (Keyboard)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x01,\t\t// Collection (Application)\r\n`;
                            stringLen += 2;
                            interfaceInfo[i]["Keyboard"]["Id"] = {};
                            interfaceInfo[i]["Keyboard"]["Id"]["Value"] = reportId;
                            interfaceInfo[i]["Keyboard"]["Id"]["Shift"] = 0;
                            if (reportId) {
                                stringTmp += `0x85, 0x${toHexFormat(reportId)},\t\t// Report ID\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0x05, 0x07,\t\t// Usage Page (Key Codes)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x19, 0xE0,\t\t// Usage Minimum (224)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x29, 0xE7,\t\t// Usage Maximum (231)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x15, 0x00,\t\t// Logical Minimum (0)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x25, 0x01,\t\t// Logical Maximum (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x01,\t\t// Report Size (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x08,\t\t// Report Count (8)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x02,\t\t// Input (Data,Variable,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x01,\t\t// Report Count (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x08,\t\t// Report Size (8)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x01,\t\t// Input (Constant)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x01,\t\t// Report Size (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x03,\t\t// Report Count (3)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x05, 0x08,\t\t// Usage Page (LEDs)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x19, 0x01,\t\t// Usage Minimum (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x29, 0x03,\t\t// Usage Maximum (3)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x91, 0x02,\t\t// Output (Data,Variable,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x75, 0x01,\t\t// Report Size (1)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x05,\t\t// Report Count (5)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x91, 0x01,\t\t// Output (Constant,Array,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x26, 0xFF, 0x00,\t// Logical Maximum (255)\r\n`;
                            stringLen += 3;
                            stringTmp += `0x05, 0x07,\t\t// Usage Page (Key Codes)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x19, 0x00,\t\t// Usage Minimum (0)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x2A, 0xDD, 0x00,\t// Usage Maximum (221)\r\n`;
                            stringLen += 3;
                            stringTmp += `0x75, 0x08,\t\t// Report Size (8)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x${toHexFormat(keyNum)},\t\t// Report Count (${keyNum})\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x00,\t\t// Input(Data,Array,Absolute)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;

                            interfaceInfo[i]["Keyboard"]["FunctionKey"] = {};
                            interfaceInfo[i]["Keyboard"]["FunctionKey"]["Shift"] = reportId ? 1 : 0;
                            interfaceInfo[i]["Keyboard"]["FunctionKey"]["Bytes"] = 1;
                            interfaceInfo[i]["Keyboard"]["NormalKey"] = {};
                            interfaceInfo[i]["Keyboard"]["NormalKey"]["Shift"] = 2 + reportId ? 1 : 0;
                            interfaceInfo[i]["Keyboard"]["NormalKey"]["Bytes"] = keyNum;
                            interfaceInfo[i]["Keyboard"]["NormalKey"]["Number"] = keyNum;

                            interfaceDescriptorStringLength[i] += stringLen;
                            needInEp = true;
                            reportSize = 2 + keyNum + (reportId ? 1 : 0);
                            InEpSize = InEpSize < reportSize ? reportSize : InEpSize;
                        }

                        //Consumer
                        interfaceInfo[i]["Consumer"] = {};
                        interfaceInfo[i]["Consumer"]["Enabled"] = interfaceNode.getElementsByClassName("consumerEnabled")[0].checked;
                        if (interfaceInfo[i]["Consumer"]["Enabled"]) {
                            stringLen = 0;
                            let reportSize = 0;
                            let reportId = interfaceNode.getElementsByClassName("consumerReId")[0].value & 0xFF;
                            let keyNum = interfaceNode.getElementsByClassName("consumerKeyNumber")[0].value & 0xFF;
                            keyNum = keyNum > 2 ? 2 : keyNum;

                            stringTmp += "\r\n/* Comsumer Descriptor */\r\n";
                            stringTmp += `0x05, 0x0C,\t\t// Usage Page (Consumer Page)\r\n`;
                            stringLen += 2;
                            stringTmp += `0x09, 0x01,\t\t// Usage (Consumer Control)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xA1, 0x01,\t\t// Collection (Application)\r\n`;
                            stringLen += 2;
                            interfaceInfo[i]["Consumer"]["Id"] = {};
                            interfaceInfo[i]["Consumer"]["Id"]["Value"] = reportId;
                            interfaceInfo[i]["Consumer"]["Id"]["Shift"] = 0;
                            if (reportId) {
                                stringTmp += `0x85, 0x${toHexFormat(reportId)},\t\t// Report ID\r\n`;
                                stringLen += 2;
                            }
                            stringTmp += `0x15, 0x01,\t\t// Logical Minimum\r\n`;
                            stringLen += 2;
                            stringTmp += `0x26, 0xFF, 0x02,\t// Logical Maximum\r\n`;
                            stringLen += 3;
                            stringTmp += `0x19, 0x01,\t\t// Usage Minimum\r\n`;
                            stringLen += 2;
                            stringTmp += `0x2A, 0xFF, 0x02,\t// Usage Maximum\r\n`;
                            stringLen += 3;
                            stringTmp += `0x75, 0x10,\t\t// Report Size\r\n`;
                            stringLen += 2;
                            stringTmp += `0x95, 0x${toHexFormat(keyNum)},\t\t// Report Count\r\n`;
                            stringLen += 2;
                            stringTmp += `0x81, 0x00,\t\t// Input (Data, Array, Abs)\r\n`;
                            stringLen += 2;
                            stringTmp += `0xC0,\t\t\t// End Collection\r\n`;
                            stringLen += 1;
                            interfaceInfo[i]["Consumer"]["Key"] = {};
                            interfaceInfo[i]["Consumer"]["Key"]["Shift"] = reportId ? 1 : 0;
                            interfaceInfo[i]["Consumer"]["Key"]["Number"] = keyNum;
                            interfaceInfo[i]["Consumer"]["Key"]["Bytes"] = keyNum * 2;

                            interfaceDescriptorStringLength[i] += stringLen;

                            needInEp = true;
                            reportSize = reportId ? 1 : 0 + keyNum * 2;
                            InEpSize = InEpSize < reportSize ? reportSize : InEpSize;
                        }

                        console.log(interfaceInfo[i]);

                        // interfaceDescriptorString[i] = stringTmp;

                        interfaceInfo[i]["Descriptor"] = {};
                        interfaceInfo[i]["Descriptor"]["String"] = stringTmp;
                        interfaceInfo[i]["Descriptor"]["Bytes"] = interfaceDescriptorStringLength[i];

                        //Full interface descriptor
                        {
                            stringLen = 0;
                            stringTmp = "\r\n/* Interface Descriptor */\r\n"

                            stringTmp += `0x09,\t\t\t// bLength\r\n`;
                            stringLen += 1;
                            stringTmp += `0x04,\t\t\t// bDescriptorType (Interface)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat(interfaceNum)},\t\t\t// bInterfaceNumber: Interface number\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bAlternateSetting: Alternate setting\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat((needInEp ? 1 : 0) + (needOutEp ? 1 : 0))},\t\t\t// bNumEndpoints\r\n`;
                            stringLen += 1;
                            stringTmp += `0x03,\t\t\t// bInterfaceClass: HID\r\n`;
                            stringLen += 1;
                            stringTmp += `0x01,\t\t\t// bInterfaceSubClass: 1=BOOT, 0=no boot\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bInterfaceProtocol: 0=none, 1=keyboard, 2=mouse\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// iInterface: Index of string descriptor\r\n`;
                            stringLen += 1;

                            stringTmp += "\r\n/* HID Descriptor */\r\n";
                            stringTmp += `0x09,\t\t\t// bLength\r\n`;
                            stringLen += 1;
                            stringTmp += `0x21,\t\t\t// bDescriptorType (HID)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x11, 0x01,\t// bcdHID\r\n`;
                            stringLen += 2;
                            stringTmp += `0x00,\t\t\t// bCountryCode\r\n`;
                            stringLen += 1;
                            stringTmp += `0x01,\t\t\t// bNumDescriptors: Number of HID class descriptors to follow\r\n`;
                            stringLen += 1;
                            stringTmp += `0x22,\t\t\t// bDescriptorType (Report)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat(interfaceDescriptorStringLength[i] & 0xFF)}, 0x${toHexFormat(interfaceDescriptorStringLength[i] >> 8)},\t// wItemLength\r\n`;
                            stringLen += 2;

                            interfaceInfo[i]["Endpoint"] = {};
                            interfaceInfo[i]["Endpoint"]["In"] = {};
                            interfaceInfo[i]["Endpoint"]["In"]["Enabled"] = needInEp;
                            if (needInEp) {
                                stringTmp += "\r\n/* Input Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(InEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x03,\t\t\t// bmAttributes: Interrupt endpoint\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(InEpSize & 0xFF)}, 0x${toHexFormat(InEpSize >> 8)},\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x${toHexFormat(InEpInterval)},\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;

                                interfaceInfo[i]["Endpoint"]["In"]["Addr"] = InEpAddr;
                                interfaceInfo[i]["Endpoint"]["In"]["Size"] = InEpSize;
                                interfaceInfo[i]["Endpoint"]["In"]["Interval"] = InEpInterval;
                            } else {
                                interfaceInfo[i]["Endpoint"]["In"]["Addr"] = 0;
                                interfaceInfo[i]["Endpoint"]["In"]["Size"] = 0;
                                interfaceInfo[i]["Endpoint"]["In"]["Interval"] = 0;
                            }

                            interfaceInfo[i]["Endpoint"]["Out"] = {};
                            interfaceInfo[i]["Endpoint"]["Out"]["Enabled"] = needOutEp;
                            if (needOutEp) {
                                stringTmp += "\r\n/* Output Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(OutEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x03,\t\t\t// bmAttributes: Interrupt endpoint\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(OutEpSize & 0xFF)}, 0x${toHexFormat(OutEpSize >> 8)},\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x${toHexFormat(OutEpInterval)},\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;

                                interfaceInfo[i]["Endpoint"]["Out"]["Addr"] = OutEpAddr;
                                interfaceInfo[i]["Endpoint"]["Out"]["Size"] = OutEpSize;
                                interfaceInfo[i]["Endpoint"]["Out"]["Interval"] = OutEpInterval;
                            } else {
                                interfaceInfo[i]["Endpoint"]["Out"]["Addr"] = 0;
                                interfaceInfo[i]["Endpoint"]["Out"]["Size"] = 0;
                                interfaceInfo[i]["Endpoint"]["Out"]["Interval"] = 0;
                            }
                        }

                        interfaceConfigString[i] = stringTmp;
                        interfaceConfigTotalLength += stringLen;
                        interfaceNum += 1;

                    }
                    break;

                case "CDC-ACM":
                    {
                        interfaceInfo[i] = {};
                        interfaceInfo[i]["Type"] = "CDC-ACM";
                        const InEpAddr = interfaceNode.getElementsByClassName("InEpAddr")[0].value | 0x80;
                        const OutEpAddr = interfaceNode.getElementsByClassName("OutEpAddr")[0].value | 0x00;
                        const IntEpAddr = interfaceNode.getElementsByClassName("IntEpAddr")[0].value | 0x80;
                        const RxLength = interfaceNode.getElementsByClassName("CDC_RX_Length")[0].value * 1;
                        const TxLength = interfaceNode.getElementsByClassName("CDC_TX_Length")[0].value * 1;
                        const MaxMps = interfaceNode.getElementsByClassName("CDC_MAX_MPS")[0].value * 1;

                        interfaceInfo[i]["IntEpAddr"] = IntEpAddr;
                        interfaceInfo[i]["InEpAddr"] = InEpAddr;
                        interfaceInfo[i]["OutEpAddr"] = OutEpAddr;
                        interfaceInfo[i]["RxLength"] = RxLength;
                        interfaceInfo[i]["TxLength"] = TxLength;
                        interfaceInfo[i]["MaxMps"] = MaxMps;

                        let stringTmp = "\r\n/* CDC-ACM Interface */\r\n";
                        let byteCount = 0;
                        {

                            stringTmp += `\r\n0x08,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x0B,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum},\t/* bFirstInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bInterfaceCount */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bFunctionClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bFunctionSubClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bFunctionProtocol */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* iFunction */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x09,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x04,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum},\t/* bInterfaceNumber */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bAlternateSetting */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x01,\t/* bNumEndpoints */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bInterfaceClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bInterfaceSubClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bInterfaceProtocol */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* iInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x10, 0x01,\t/* bcdCDC */`;
                            byteCount += 2;

                            stringTmp += `\r\n0x05,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x01,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bmCapabilities */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum + 1},\t/* bDataInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x04,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bmCapabilities */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x24,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x06,\t/* bDescriptorSubtype */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum},\t/* bMasterInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum + 1},\t/* bSlaveInterface0 */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x07,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(IntEpAddr)},\t/* bEndpointAddress */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x03,\t/* bmAttributes */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x08, 0x00,\t/* wMaxPacketSize */`;
                            byteCount += 2;

                            stringTmp += `\r\n0x01,\t/* bInterval */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x09,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x04,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n${interfaceNum + 1},\t/* bInterfaceNumber */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bAlternateSetting */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bNumEndpoints */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x0A,\t/* bInterfaceClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bInterfaceSubClass */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* bInterfaceProtocol */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x00,\t/* iInterface */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x07,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(OutEpAddr)},\t/* bEndpointAddress */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bmAttributes */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(MaxMps & 0xFF)}, 0x${toHexFormat(MaxMps >> 8)},\t/* wMaxPacketSize */`;
                            byteCount += 2; // WBVAL占用2字节

                            stringTmp += `\r\n0x00,\t/* bInterval */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x07,\t/* bLength */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x05,\t/* bDescriptorType */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(InEpAddr)},\t/* bEndpointAddress */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x02,\t/* bmAttributes */`;
                            byteCount += 1;

                            stringTmp += `\r\n0x${toHexFormat(MaxMps & 0xFF)}, 0x${toHexFormat(MaxMps >> 8)},\t/* wMaxPacketSize */`;
                            byteCount += 2;

                            stringTmp += `\r\n0x00,\t/* bInterval */`;
                            byteCount += 1;
                        }
                        interfaceConfigString[i] = stringTmp + `\r\n`;
                        interfaceConfigTotalLength += byteCount;
                        interfaceNum += 2;
                    }
                    break;

                case "WinUSB":
                    {
                        const InEpEnabled = interfaceNode.getElementsByClassName("WinUSB_Enabled_InEp")[0].checked;
                        const OutEpEnabled = interfaceNode.getElementsByClassName("WinUSB_Enabled_OutEp")[0].checked;
                        const InEpAddr = interfaceNode.getElementsByClassName("InEpAddr")[0].value | 0x80;
                        const OutEpAddr = interfaceNode.getElementsByClassName("OutEpAddr")[0].value | 0x00;
                        const RxLength = interfaceNode.getElementsByClassName("WinUSB_RX_Length")[0].value * 1;
                        const TxLength = interfaceNode.getElementsByClassName("WinUSB_TX_Length")[0].value * 1;
                        let GUID0 = interfaceNode.getElementsByClassName("WinUSB_GUID_0")[0].value;
                        let GUID1 = interfaceNode.getElementsByClassName("WinUSB_GUID_1")[0].value;
                        let GUID2 = interfaceNode.getElementsByClassName("WinUSB_GUID_2")[0].value;
                        let GUID3 = interfaceNode.getElementsByClassName("WinUSB_GUID_3")[0].value;
                        let GUID4 = interfaceNode.getElementsByClassName("WinUSB_GUID_4")[0].value;
                        while (GUID0.length < 8) {
                            GUID0 = "0" + GUID0;
                        }
                        while (GUID1.length < 4) {
                            GUID1 = "0" + GUID1;
                        }
                        while (GUID2.length < 4) {
                            GUID2 = "0" + GUID2;
                        }
                        while (GUID3.length < 4) {
                            GUID3 = "0" + GUID3;
                        }
                        while (GUID4.length < 12) {
                            GUID4 = "0" + GUID4;
                        }
                        let stringLen = 0;
                        let stringTmp = "";

                        if (!InEpEnabled && !OutEpEnabled) {
                            continue;
                        }

                        interfaceInfo[i] = {};
                        interfaceInfo[i]["Type"] = "WinUSB";
                        interfaceInfo[i]["InEpEnabled"] = InEpEnabled;
                        interfaceInfo[i]["OutEpEnabled"] = OutEpEnabled;
                        interfaceInfo[i]["InEpAddr"] = InEpAddr;
                        interfaceInfo[i]["OutEpAddr"] = OutEpAddr;
                        interfaceInfo[i]["RxLength"] = RxLength;
                        interfaceInfo[i]["TxLength"] = TxLength;

                        {
                            stringTmp = "\r\n/* WinUSB */\r\n";
                            stringTmp += "\r\n/* Interface */\r\n";
                            stringTmp += `0x09,\t\t\t// bLength\r\n`;
                            stringLen += 1;
                            stringTmp += `0x04,\t\t\t// bDescriptorType (Interface)\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat(interfaceNum)},\t\t\t// bInterfaceNumber: Interface number\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bAlternateSetting: Alternate setting\r\n`;
                            stringLen += 1;
                            stringTmp += `0x${toHexFormat((InEpEnabled ? 1 : 0) + (OutEpEnabled ? 1 : 0))},\t\t\t// bNumEndpoints\r\n`;
                            stringLen += 1;
                            stringTmp += `0xFF,\t\t\t// bInterfaceClass\r\n`;
                            stringLen += 1;
                            stringTmp += `0xFF,\t\t\t// bInterfaceSubClass\r\n`;
                            stringLen += 1;
                            stringTmp += `0x00,\t\t\t// bInterfaceProtocol\r\n`;
                            stringLen += 1;
                            stringTmp += `0x04,\t\t\t// iInterface: Index of string descriptor\r\n`;
                            stringLen += 1;

                            if (InEpEnabled) {
                                stringTmp += "\r\n/* Input Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(InEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x02,\t\t\t// bmAttributes: bulk endpoint\r\n`;
                                stringLen += 1;
                                stringTmp += `0x40, 0x00,\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x00,\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;
                            }

                            if (OutEpEnabled) {
                                stringTmp += "\r\n/* Input Endpoint Descriptor */\r\n";
                                stringTmp += `0x07,\t\t\t// bLength\r\n`;
                                stringLen += 1;
                                stringTmp += `0x05,\t\t\t// bDescriptorType (Endpoint)\r\n`;
                                stringLen += 1;
                                stringTmp += `0x${toHexFormat(OutEpAddr)},\t\t\t// bEndpointAddress\r\n`;
                                stringLen += 1;
                                stringTmp += `0x02,\t\t\t// bmAttributes: bulk endpoint\r\n`;
                                stringLen += 1;
                                stringTmp += `0x40, 0x00,\t// wMaxPacketSize\r\n`;
                                stringLen += 2;
                                stringTmp += `0x00,\t\t\t// binterval * 1ms\r\n`;
                                stringLen += 1;
                            }
                        }
                        interfaceConfigString[i] = stringTmp + `\r\n`;
                        interfaceConfigTotalLength += stringLen;

                        {
                            //WinUSB descriptor
                            stringTmp = "\r\n/* WinUSB Descriptor*/\r\n";
                            stringTmp += `\
                            \r\n#pragma pack(4)
                            \r\nconst unsigned char Intf${interfaceNum}_WCID_StringDescriptor_MSOS[18] = {\
                            \r\n///////////////////////////////////////\
                            \r\n/// MS OS string descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x12,   /* bLength */\
                            \r\n0x03,   /* bDescriptorType */\
                            \r\n/* MSFT100 */\
                            \r\n'M', 0x00, 'S', 0x00, 'F', 0x00, 'T', 0x00, /* wcChar_7 */\
                            \r\n'1', 0x00, '0', 0x00, '0', 0x00,            /* wcChar_7 */\
                            \r\n0x17,                                       /* bVendorCode */\
                            \r\n0x00,                                       /* bReserved */\
                            \r\n};\
                            \r\n\
                            \r\nconst unsigned char Intf${interfaceNum}_WINUSB_WCIDDescriptor[40] = {
                            \r\n///////////////////////////////////////\
                            \r\n/// WCID descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x28, 0x00, 0x00, 0x00,                   /* dwLength */\
                            \r\n0x00, 0x01,                               /* bcdVersion */\
                            \r\n0x04, 0x00,                               /* wIndex */\
                            \r\n0x01,                                     /* bCount */\
                            \r\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* bReserved_7 */\
                            \r\n\
                            \r\n///////////////////////////////////////\
                            \r\n/// WCID function descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x00, /* bFirstInterfaceNumber */\
                            \r\n0x01, /* bReserved */\
                            \r\n/* WINUSB */\
                            \r\n'W', 'I', 'N', 'U', 'S', 'B', 0x00, 0x00, /* cCID_8 */\
                            \r\n/*  */\
                            \r\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, /* cSubCID_8 */\
                            \r\n0x00, 0x00, 0x00, 0x00, 0x00, 0x00,             /* bReserved_6 */\
                            \r\n};\
                            \r\n\
                            \r\nconst unsigned char Intf${interfaceNum}_WINUSB_IF0_WCIDProperties [142] = {\
                            \r\n///////////////////////////////////////\
                            \r\n/// WCID property descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x8e, 0x00, 0x00, 0x00,                           /* dwLength */\
                            \r\n0x00, 0x01,                                       /* bcdVersion */\
                            \r\n0x05, 0x00,                                       /* wIndex */\
                            \r\n0x01, 0x00,                                       /* wCount */\
                            \r\n\
                            \r\n///////////////////////////////////////\
                            \r\n/// registry propter descriptor\
                            \r\n///////////////////////////////////////\
                            \r\n0x84, 0x00, 0x00, 0x00,                           /* dwSize */\
                            \r\n0x01, 0x00, 0x00, 0x00,                           /* dwPropertyDataType */\
                            \r\n0x28, 0x00,                                       /* wPropertyNameLength */\
                            \r\n/* DeviceInterfaceGUID */\
                            \r\n'D', 0x00, 'e', 0x00, 'v', 0x00, 'i', 0x00,       /* wcName_20 */\
                            \r\n'c', 0x00, 'e', 0x00, 'I', 0x00, 'n', 0x00,       /* wcName_20 */\
                            \r\n't', 0x00, 'e', 0x00, 'r', 0x00, 'f', 0x00,       /* wcName_20 */\
                            \r\n'a', 0x00, 'c', 0x00, 'e', 0x00, 'G', 0x00,       /* wcName_20 */\
                            \r\n'U', 0x00, 'I', 0x00, 'D', 0x00, 0x00, 0x00,      /* wcName_20 */\
                            \r\n0x4e, 0x00, 0x00, 0x00,                           /* dwPropertyDataLength */\
                            \r\n/* {${GUID0}-${GUID1}-${GUID2}-${GUID3}-${GUID4}} */\
                            \r\n'{', 0x00, '${GUID0[0]}', 0x00, '${GUID0[1]}', 0x00, '${GUID0[2]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID0[3]}', 0x00, '${GUID0[4]}', 0x00, '${GUID0[5]}', 0x00, '${GUID0[6]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID0[7]}', 0x00, '-', 0x00, '${GUID1[0]}', 0x00, '${GUID1[1]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID1[2]}', 0x00, '${GUID1[3]}', 0x00, '-', 0x00, '${GUID2[0]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID2[1]}', 0x00, '${GUID2[2]}', 0x00, '${GUID2[3]}', 0x00, '-', 0x00,       /* wcData_39 */\
                            \r\n'${GUID3[0]}', 0x00, '${GUID3[1]}', 0x00, '${GUID3[2]}', 0x00, '${GUID3[3]}', 0x00,       /* wcData_39 */\
                            \r\n'-', 0x00, '${GUID4[0]}', 0x00, '${GUID4[1]}', 0x00, '${GUID4[2]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID4[3]}', 0x00, '${GUID4[4]}', 0x00, '${GUID4[5]}', 0x00, '${GUID4[6]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID4[7]}', 0x00, '${GUID4[8]}', 0x00, '${GUID4[9]}', 0x00, '${GUID4[10]}', 0x00,       /* wcData_39 */\
                            \r\n'${GUID4[11]}', 0x00, '}', 0x00, 0x00, 0x00,                 /* wcData_39 */\
                            \r\n};\
                            \r\n\
                            \r\nconst unsigned char *Intf${interfaceNum}_WINUSB_IFx_WCIDProperties[] = {\
                            \r\n    Intf${interfaceNum}_WINUSB_IF0_WCIDProperties,\
                            \r\n};\
                            \r\n\
                            \r\n#pragma pack(0)\
                            \r\n\
                            `;

                            interfaceInfo[i]["msosv1_desc"] = stringTmp;

                        }

                        interfaceNum += 1;
                    }
                    break;

                default:
                    break;
            }
        }
    }

    //Configuration descriptor
    let configString = "\r\n/* Configuration Descriptor */\r\n";
    {

        let configLen = 0;
        const busPower = document.getElementById("busPowered").checked ? 0 : 1;
        const remoteWakeup = document.getElementById("remoteWakeup").checked ? 1 : 0;
        let bmAttributes = 0x80 | (busPower << 6) | (remoteWakeup << 5);
        const maxPower = document.getElementById("maxPower").value | 0x00;

        interfaceConfigTotalLength += 9;
        configString += `0x09,\t\t\t// bLength\r\n`;
        configLen += 1;
        configString += `0x02,\t\t\t// bDescriptorType (Configuration)\r\n`;
        configLen += 1;
        configString += `0x${toHexFormat(interfaceConfigTotalLength & 0xFF)}, 0x${toHexFormat(interfaceConfigTotalLength >> 8)},\t\t// wTotalLength\r\n`;
        configLen += 2;
        configString += `0x${toHexFormat(interfaceNum)},\t\t\t// bNumInterfaces: Total number of interface\r\n`;
        configLen += 1;
        configString += `0x01,\t\t\t// bConfigurationValue\r\n`;
        configLen += 1;
        configString += `0x00,\t\t\t// iConfiguration\r\n`;
        configLen += 1;
        configString += `0x${toHexFormat(bmAttributes)},\t\t\t// bmAttributes: Bus Powered; Remote Wakeup\r\n`;
        configLen += 1;
        configString += `0x${toHexFormat(maxPower >> 1)},\t\t\t// MaxPower\r\n`;
        configLen += 1;
    }

    let lenguageIdString = "\r\n/* Language Id */\r\n";
    let lenguageIdLen = 0;
    lenguageIdString += "0x04,\t\t\t// bLength\r\n";
    lenguageIdLen += 1;
    lenguageIdString += "0x03,\t\t\t// bDescriptorType\r\n";
    lenguageIdLen += 1;
    lenguageIdString += "0x33, 0x10,\t\t\t// bLength\r\n";
    lenguageIdLen += 2;

    let ManufacturerString = "";
    let ManufacturerStringLen = 0;
    if (ManufacturerStringSource.length) {
        let tmp = stringToWcharArrayStringComplete(ManufacturerStringSource);
        ManufacturerStringLen = tmp[1] + 2;
        ManufacturerString = "\r\n/* Manufacturer Descriptor */\r\n"
        ManufacturerString += `0x${toHexFormat(ManufacturerStringLen)},\t\t\t// bLength\r\n`;
        ManufacturerString += "0x03,\t\t\t// bDescriptorType\r\n";
        ManufacturerString += tmp[0];
    }

    let ProductString = "";
    let ProductStringLen = 0;
    if (ProductStringSource.length) {
        let tmp = stringToWcharArrayStringComplete(ProductStringSource);
        ProductStringLen = tmp[1] + 2;
        ProductString = "\r\n/* Product Descriptor */\r\n"
        ProductString += `0x${toHexFormat(ProductStringLen)},\t\t\t// bLength\r\n`;
        ProductString += "0x03,\t\t\t// bDescriptorType\r\n";
        ProductString += tmp[0];
    }

    let SerialNumberString = "";
    let SerialNumberStringLen = 0;
    if (SerialNumberStringSource.length) {
        let tmp = stringToWcharArrayStringComplete(SerialNumberStringSource);
        SerialNumberStringLen = tmp[1] + 2;
        SerialNumberString = "\r\n/* SerialNumber Descriptor */\r\n"
        SerialNumberString += `0x${toHexFormat(SerialNumberStringLen)},\t\t\t// bLength\r\n`;
        SerialNumberString += "0x03,\t\t\t// bDescriptorType\r\n";
        SerialNumberString += tmp[0];
    }

    let cFileData = "";
    let cFileName = document.getElementById("DescriptorcFileNameInput").value + "";
    let hFileName = document.getElementById("DescriptorhFileNameInput").value + "";
    let DescriptorLength = 18 + 9 + interfaceConfigTotalLength + 4 + 1 + ManufacturerStringLen + ProductStringLen + SerialNumberStringLen;//USB报告符长度
    let cFileDataLen = DescriptorLength;
    // if (interfaceDescriptorStringLength.length) {
    //     for (let i = 0; i < interfaceDescriptorStringLength.length; i++) {
    //         cFileDataLen += interfaceDescriptorStringLength[i];
    //     }
    // }

    let hFileData = "";
    let handleString = "";
    let typedefString = "";
    let defineString = "";
    if (interfaceInfo.length) {
        let InterfaceNum = 0;
        defineString = `\
        \r\n.Descriptor.buffer = USBD_DESC,\
        \r\n.Descriptor.Length = ${DescriptorLength},\
        `;
        //生成interface结构体
        for (let i = 0; i < interfaceInfo.length; i++) {

            let stringTmp = ``;
            switch (interfaceInfo[i]["Type"]) {
                case "HID":
                    {
                        let inputString = "";
                        let outputString = "";


                        defineString += `\
                        \r\n.Intf${InterfaceNum}.Type = 0,\
                        \r\n.Intf${InterfaceNum}.Descriptor.buffer = Intf${i}Desc,\
                        \r\n.Intf${InterfaceNum}.Descriptor.Length = ${interfaceDescriptorStringLength[i]},\
                        \r\n.Intf${InterfaceNum}.Input.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["In"]["Addr"])},\
                        \r\n.Intf${InterfaceNum}.Input.Size = ${interfaceInfo[i]["Endpoint"]["In"]["Size"]},\
                        `;

                        if (interfaceInfo[i]["Endpoint"]["In"]["Enabled"]) {
                            inputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} Input;\
                            `;
                        }

                        if (interfaceInfo[i]["Endpoint"]["Out"]["Enabled"]) {
                            defineString += `\
                            \r\n.Intf${InterfaceNum}.Output.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["Out"]["Addr"])},\
                            \r\n.Intf${InterfaceNum}.Output.Size = ${interfaceInfo[i]["Endpoint"]["Out"]["Size"]},\
                            `;

                            outputString = `\
                            \r\struct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} Output;\
                            `;
                        }

                        stringTmp = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nunsigned char Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned char *buffer;\
                            \r\nconst unsigned int Length;\
                            \r\n} Descriptor;\
                            ${inputString}\
                            ${outputString}\
                            \r\n} Intf${InterfaceNum};\r\n\
                            `;

                        InterfaceNum += 1;
                    }
                    break;

                case "CDC-ACM":
                    {
                        let inputString = "";
                        let outputString = "";
                        let intString = "";

                        intString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst unsigned int Address : 8;\
                        \r\nconst unsigned int Size : 24;\
                        \r\n} IntEndpoint;\
                        `;

                        inputString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst unsigned int Address : 8;\
                        \r\nconst unsigned int Size : 24;\
                        \r\n} InEndpoint;\
                        `;

                        outputString = `\
                        \r\nstruct\
                        \r\n{\
                        \r\nconst unsigned int Address : 8;\
                        \r\nconst unsigned int Size : 24;\
                        \r\n} OutEndpoint;\
                        `;

                        stringTmp = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nunsigned char Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                            ${intString}\
                            ${inputString}\
                            ${outputString}\
                            \r\n} Intf${InterfaceNum};\r\n\
                            `;

                        defineString += `\
                        \r\n.Intf${InterfaceNum}.Type = 1,\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["IntEpAddr"])},\
                        \r\n.Intf${InterfaceNum}.IntEndpoint.Size = 10,\
                        \r\n.Intf${InterfaceNum}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                        \r\n.Intf${InterfaceNum}.InEndpoint.Size = ${(interfaceInfo[i]["MaxMps"])},\
                        \r\n.Intf${InterfaceNum}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                        \r\n.Intf${InterfaceNum}.OutEndpoint.Size = ${(interfaceInfo[i]["MaxMps"])},\
                        `;

                        InterfaceNum += 2;
                    }
                    break;

                case "WinUSB":
                    {
                        let inputString = "";
                        let outputString = "";

                        if (interfaceInfo[i]["InEpEnabled"]) {
                            inputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} InEndpoint;\
                            `;
                        }

                        if (interfaceInfo[i]["OutEpEnabled"]) {
                            outputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst unsigned int Address : 8;\
                            \r\nconst unsigned int Size : 24;\
                            \r\n} OutEndpoint;\
                            `;
                        }

                        stringTmp = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nunsigned char Type; // 0 = HID, 1 = CDC-ACM, 2 = WinUSB\
                            \r\nconst unsigned char *WCID_StringDescriptor_MSOS;\
                            \r\nconst unsigned char *WINUSB_WCIDDescriptor;\
                            \r\nconst unsigned char **WINUSB_IFx_WCIDProperties;\
                            ${inputString}\
                            ${outputString}\
                            \r\n} Intf${InterfaceNum};\r\n\
                            `;

                        defineString += `\
                        \r\n.Intf${InterfaceNum}.Type = 2,\
                        \r\n.Intf${InterfaceNum}.WCID_StringDescriptor_MSOS = Intf${InterfaceNum}_WCID_StringDescriptor_MSOS,\
                        \r\n.Intf${InterfaceNum}.WINUSB_WCIDDescriptor = Intf${InterfaceNum}_WINUSB_WCIDDescriptor,\
                        \r\n.Intf${InterfaceNum}.WINUSB_IFx_WCIDProperties = Intf${InterfaceNum}_WINUSB_IFx_WCIDProperties,\
                        \r\n${interfaceInfo[i]["InEpEnabled"] ? `\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                            \r\n.Intf${InterfaceNum}.InEndpoint.Size = 64,\
                            ` : ""}\
                        \r\n${interfaceInfo[i]["OutEpEnabled"] ? `\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Address = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                            \r\n.Intf${InterfaceNum}.OutEndpoint.Size = 64,\
                            ` : ""}\
                        `;

                        InterfaceNum += 1;
                    }
                    break;

                default:
                    break;
            }
            typedefString += stringTmp;
        }
        typedefString = `\
        \r\ntypedef struct\
        \r\n{\
        \r\nstruct\
        \r\n{\
        \r\nconst unsigned char *buffer;\
        \r\nconst unsigned int Length;\
        \r\n} Descriptor;\
        ${typedefString}\
        \r\n} USBD_DescriptorTypeDef;\r\n\
        `;
    }

    //生成USBD_DescriptorTypeDef句柄并初始化值
    handleString = `\
    ${defineString != "" ? `\
    \r\nconst USBD_DescriptorTypeDef usbddesc = {\
    ${defineString}\
    \r\n};\
    ` : ""}\
    `;

    let interfaceConfigStringTmp = "";
    if (interfaceConfigString.length) {
        for (let i = 0; i < interfaceConfigString.length; i++) {
            interfaceConfigStringTmp += interfaceConfigString[i];
        }
    }
    cFileData = `#include "${hFileName}"\r\n`;
    cFileData += `\
    \r\nconst unsigned char USBD_DESC[${DescriptorLength}] = \r\n{\
        \r\n${deviceString}\
        ${configString}\
        ${interfaceConfigStringTmp}\
        ${lenguageIdString}\
        ${ManufacturerString}\
        ${ProductString}\
        ${SerialNumberString}\
        \r\n/* Descriptor End */\
        \r\n0x00,\
        \r\n};\
        \r\n\
        ${interfaceInfo.length ? `\
        \r\n/* Interface Content Descriptor */\r\n\
        ${(() => {
                let stringTmp = "";
                for (let i = 0; i < interfaceInfo.length; i++) {
                    if (interfaceInfo[i]["Type"] == "HID") {
                        stringTmp += `\
                        \r\nconst unsigned char Intf${i}Desc[${interfaceInfo[i]["Descriptor"]["Bytes"]}] = {\
                        \r\n${interfaceInfo[i]["Descriptor"]["String"]}\
                        \r\n};\
                        \r\n\
                        `;
                    } else if (interfaceInfo[i]["Type"] == "WinUSB") {
                        stringTmp += interfaceInfo[i]["msosv1_desc"];
                    }
                }
                return stringTmp;
            })()}\
        ` : ""}\
        ${handleString}\r\n\
        `;

    hFileData = `\#ifndef ${hFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n#define ${hFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n\
    \r\n#ifdef __cplusplus\
    \r\nextern "C" {\
    \r\n#endif\
    \r\n
    ${typedefString}\
    \r\nextern const USBD_DescriptorTypeDef usbddesc;\
    \r\n\
    \r\n#ifdef __cplusplus\
    \r\n}\
    \r\n#endif\
    \r\n\
    \r\n#endif`;

    document.getElementById("DescriptorcFileData").value = cFileData;
    document.getElementById("DescriptorhFileData").value = hFileData;

    const devicecFileName = document.getElementById("DevicecFileNameInput").value;
    const devicehFileName = document.getElementById("DevicehFileNameInput").value;
    let haveHid = false;
    let haveCdc = false;
    let haveWinUSB = false;
    let functionDefString = "";
    let USBD_Event_Handler_String = "";
    let USBD_Ep_Callback_String = "";
    let USBD_Intf_Init_String = "";
    let USBD_Ep_Init_String = "";
    let USBD_TypeDef_Init_String = "";
    let USBD_TypeDef_InitInFunc_String = "";
    let USBD_Intf_Write_Function_String = "";
    let USBD_Init_String = `\r\nusbd_desc_register(USBD_BUSID, usbddesc.Descriptor.buffer);`;
    hFileData = "";
    cFileData = "";
    handleString = "";
    typedefString = "";

    cFileData = `#include "${devicehFileName}"\
    \r\n#include "${hFileName}"\
    \r\n\
    \r\n#if defined(STM32F0) || defined(STM32L0) || defined(STM32G4) || defined(STM32F1)\
    \r\nvoid usb_dc_low_level_init(void)\
    \r\n{\
    \r\n#if defined(STM32G4) || defined(STM32F1)\
    \r\n    RCC_PeriphCLKInitTypeDef PeriphClkInit = {0};\
    \r\n\        
    \r\n    PeriphClkInit.PeriphClockSelection = RCC_PERIPHCLK_USB;\
    \r\n    PeriphClkInit.UsbClockSelection    = RCC_USBCLKSOURCE_HSI48;\
    \r\n    if (HAL_RCCEx_PeriphCLKConfig(&PeriphClkInit) != HAL_OK) {\
    \r\n        Error_Handler();\
    \r\n    }\
    \r\n#endif\
    \r\n    /* USB clock enable */\
    \r\n    __HAL_RCC_USB_CLK_ENABLE();\
    \r\n\        
    \r\n    /* USB interrupt Init */\
    \r\n    HAL_NVIC_SetPriority(USB_IRQn, 0, 0);\
    \r\n    HAL_NVIC_EnableIRQ(USB_IRQn);\
    \r\n}\
    \r\n\
    \r\n#elif defined(__CH32F10x_H)\
    \r\nvoid usb_dc_low_level_init(void)\
    \r\n{\
    \r\n    if (SystemCoreClock == 72000000) {\
    \r\n        RCC_USBCLKConfig(RCC_USBCLKSource_PLLCLK_1Div5);\
    \r\n    } else if (SystemCoreClock == 48000000) {\
    \r\n        RCC_USBCLKConfig(RCC_USBCLKSource_PLLCLK_Div1);\
    \r\n    }\
    \r\n    RCC_APB1PeriphClockCmd(RCC_APB1Periph_USB, ENABLE);\
    \r\n\
    \r\n    if (PWR_VDD_SupplyVoltage() == PWR_VDD_5V) {\
    \r\n        EXTEN->EXTEN_CTR |= EXTEN_USB_5V_SEL;\
    \r\n    } else {\
    \r\n        EXTEN->EXTEN_CTR &= ~EXTEN_USB_5V_SEL;\
    \r\n    }\
    \r\n\
    \r\n    (EXTEN->EXTEN_CTR) |= EXTEN_USBD_PU_EN;\
    \r\n\
    \r\n    NVIC_InitTypeDef NVIC_InitStructure;\
    \r\n    NVIC_InitStructure.NVIC_IRQChannel                   = USB_LP_CAN1_RX0_IRQn;\
    \r\n    NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0;\
    \r\n    NVIC_InitStructure.NVIC_IRQChannelSubPriority        = 0;\
    \r\n    NVIC_InitStructure.NVIC_IRQChannelCmd                = ENABLE;\
    \r\n    NVIC_Init(&NVIC_InitStructure);\
    \r\n}\
    \r\n      
    \r\n#else\
    \r\n// You need to fill the usb_dc_low_level_init function correctly\
    \r\nvoid usb_dc_low_level_init(void)\
    \r\n{\
    \r\n}\
    \r\n#endif\
    \r\n\
    \r\n#if defined(STM32F0) || defined(STM32L0)\
    \r\nvoid USB_IRQHandler(void)\
    \r\n{\
    \r\n    extern void USBD_IRQHandler(uint8_t busid);\
    \r\n    USBD_IRQHandler(USBD_BUSID);\
    \r\n}
    \r\n\
    \r\n#elif defined(STM32G4) || defined(STM32F1)\
    \r\nvoid USB_LP_IRQHandler(void)\
    \r\n{\
    \r\n    extern void USBD_IRQHandler(uint8_t busid);\
    \r\n    USBD_IRQHandler(USBD_BUSID);\
    \r\n}\
    \r\n\
    \r\n#elif defined(__CH32F10x_H)\
    \r\nvoid USB_LP_CAN1_RX0_IRQHandler(void)\
    \r\n{\
    \r\n    extern void USBD_IRQHandler(uint8_t busid);\
    \r\n    USBD_IRQHandler(USBD_BUSID);\
    \r\n}\
    \r\n\
    \r\n#else\
    \r\n// You need to replace USB_IRQHandler with the correct USB interrupt callback function\
    \r\nvoid USB_IRQHandler(void)\
    \r\n{\
    \r\n    extern void USBD_IRQHandler(uint8_t busid);\
    \r\n    USBD_IRQHandler(USBD_BUSID);\
    \r\n}\
    \r\n#endif\
    \r\n\
    \r\nint USBD_InEp_Write(uint8_t Usb_BusId, uint8_t InEp, uint8_t *data, size_t Length, __IO uint8_t *state)\
    \r\n{\
    \r\n    if (!usb_device_is_configured(Usb_BusId)) {\
    \r\n         return -1;\
    \r\n    }\
    \r\n\
    \r\n    if (!data || !state || !Length || !(InEp >> 7)) {\
    \r\n        return -2;\
    \r\n    }\
    \r\n\
    \r\n    if(*state != USBD_STATE_IDLE) {\
    \r\n        return -3;\
    \r\n    }\
    \r\n\        
    \r\n    *state = USBD_STATE_BUSY;\
    \r\n    if (usbd_ep_start_write(Usb_BusId, InEp, data, Length) < 0) {\
    \r\n        *state = USBD_STATE_IDLE;\
    \r\n        return -4;\
    \r\n    } else {\
    \r\n        while (*state == USBD_STATE_BUSY) {\
    \r\n        }\
    \r\n        return 0;\
    \r\n    }\
    \r\n}\
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

                        //Input Endpoint
                        if (interfaceInfo[i]["Endpoint"]["In"]["Enabled"]) {
                            USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}InEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["In"]["Addr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_InEp0_Callback,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}InEp0);\
                            `;

                            USBD_Ep_Callback_String += `\
                            \r\nstatic void USBD_Intf${InterfaceNum}_InEp0_Callback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum}.Input.State = USBD_STATE_IDLE;\
                            \r\n}\
                            `;

                            //Vendor define
                            if (interfaceInfo[i]["VendorDefine"]["Enabled"]) {
                                if (interfaceInfo[i]["VendorDefine"]["Input"]["Enabled"]) {
                                    VendorDefineReportId = interfaceInfo[i]["VendorDefine"]["Input"]["Id"];
                                    inputString += `\
                                    \r\nstruct {\
                                    ${VendorDefineReportId ? `\
                                        \r\nuint8_t ReportId;
                                        ` : ""}\
                                    \r\nuint8_t Data[${interfaceInfo[i]["VendorDefine"]["Input"]["Size"] - (VendorDefineReportId ? 1 : 0)}];\
                                    \r\n} VendorDefine;\
                                    `;
                                }

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_VendorApp_Input(void)\
                                \r\n{\
                                \r\n    return USBD_InEp_Write(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.Input.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.Input.Frame.VendorDefine,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.Input.Frame.VendorDefine),\
                                \r\n        &usbd.Intf${InterfaceNum}.Input.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `\r\nint USBD_Intf${InterfaceNum}_VendorApp_Input(void);`;
                            }

                            //Mouse
                            if (interfaceInfo[i]["Mouse"]["Enabled"]) {
                                MouseReportId = interfaceInfo[i]["Mouse"]["Id"]["Value"];

                                inputString += `\
                                \r\nstruct\
                                \r\n{\
                                ${MouseReportId ? `\
                                    \r\nunsigned char ReportId;\
                                    ` : ""}\
                                ${interfaceInfo[i]["Mouse"]["Button"]["Count"] ?
                                        (() => {
                                            let string = "";
                                            const dataType = interfaceInfo[i]["Mouse"]["Button"]["Count"] <= 8 ? "unsigned char" : "unsigned short";

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
                                ${interfaceInfo[i]["Mouse"]["X"]["Bytes"] < 2 ? "\r\nchar X;" : "\r\nshort X;"}\
                                ${interfaceInfo[i]["Mouse"]["Y"]["Bytes"] < 2 ? "\r\nchar Y;" : "\r\nshort Y;"}\
                                ${interfaceInfo[i]["Mouse"]["Wheel"]["Enabled"] ? "\r\nchar Wheel;" : ""}\
                                ${interfaceInfo[i]["Mouse"]["AcPan"]["Enabled"] ? "\r\nchar AcPan;" : ""}\
                                \r\n} Mouse;\
                                \r\n`;

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_Mouse_Input(void)\
                                \r\n{\
                                \r\n    return USBD_InEp_Write(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.Input.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.Input.Frame.Mouse,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.Input.Frame.Mouse),\
                                \r\n        &usbd.Intf${InterfaceNum}.Input.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `\r\nint USBD_Intf${InterfaceNum}_Mouse_Input(void);`;
                            }

                            //Keyboard
                            if (interfaceInfo[i]["Keyboard"]["Enabled"]) {
                                KeyboardReportId = interfaceInfo[i]["Keyboard"]["Id"]["Value"];

                                inputString += `\
                                \r\nstruct\
                                \r\n{\
                                ${KeyboardReportId ? `\
                                    \r\nunsigned char ReportId;\
                                    ` : ""}\
                                \r\nstruct\
                                \r\n{\
                                \r\nunsigned char LeftCtrl : 1;\
                                \r\nunsigned char LeftShift : 1;\
                                \r\nunsigned char LeftAlt : 1;\
                                \r\nunsigned char LeftGUI : 1;\
                                \r\nunsigned char RightCtrl : 1;\
                                \r\nunsigned char RightShift : 1;\
                                \r\nunsigned char RightAlt : 1;\
                                \r\nunsigned char RightGUI : 1;\
                                \r\n} FunctionKey;\
                                \r\nunsigned char : 8;\
                                \r\nunsigned char NormalKey[${interfaceInfo[i]["Keyboard"]["NormalKey"]["Number"]}];\
                                \r\n} Keyboard; \
                                \r\n`;

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_Keyboard_Input(void)\
                                \r\n{\
                                \r\n    return USBD_InEp_Write(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.Input.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.Input.Frame.Keyboard,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.Input.Frame.Keyboard),\
                                \r\n        &usbd.Intf${InterfaceNum}.Input.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `\r\nint USBD_Intf${InterfaceNum}_Keyboard_Input(void);`;
                            }

                            //Consumer
                            if (interfaceInfo[i]["Consumer"]["Enabled"]) {
                                ConsumerReportId = interfaceInfo[i]["Consumer"]["Id"]["Value"];

                                inputString += `\
                                \r\nstruct {\
                                ${ConsumerReportId ? `\
                                    \r\nunsigned char ReportId;\
                                    ` : ""}\
                                \r\nunsigned short Key[${interfaceInfo[i]["Consumer"]["Key"]["Number"]}];\
                                \r\n} Consumer;\
                                \r\n`;

                                USBD_Intf_Write_Function_String += `\
                                \r\nint USBD_Intf${InterfaceNum}_Consumer_Input(void)\
                                \r\n{\
                                \r\n    return USBD_InEp_Write(\
                                \r\n        USBD_BUSID,\
                                \r\n        usbd.Intf${InterfaceNum}.Input.Address,\
                                \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.Input.Frame.Consumer,\
                                \r\n        sizeof(usbd.Intf${InterfaceNum}.Input.Frame.Consumer),\
                                \r\n        &usbd.Intf${InterfaceNum}.Input.State);\
                                \r\n}\
                                \r\n`;
                                functionDefString += `\r\nint USBD_Intf${InterfaceNum}_Consumer_Input(void);`;
                            }

                            haveReportId = VendorDefineReportId | MouseReportId | KeyboardReportId | ConsumerReportId;

                            inputString = `\
                            \r\nstruct\
                            \r\n{\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n__IO uint8_t State;// Tx done flag\
                            ${haveReportId ? `\
                            \r\nstruct\
                            \r\n{\
                            ${VendorDefineReportId ? "\r\nuint8_t VendorDefine;" : ""}\
                            ${MouseReportId ? "\r\nuint8_t Mouse;" : ""}\
                            ${KeyboardReportId ? "\r\nuint8_t Keyboard;" : ""}\
                            ${ConsumerReportId ? "\r\nuint8_t Consumer;" : ""}\
                            \r\n} ReportId;\
                                ` : ""}\
                            ${inputString != "" ? `\
                                \r\n#pragma pack(1)\
                                \r\nunion {\
                                \r\nuint8_t Buffer[${interfaceInfo[i]["Endpoint"]["In"]["Size"]}];\
                                ${inputString}\
                                \r\n} Frame;\
                                \r\n#pragma pack()\
                                ` : ""}\
                            \r\n} Input;\
                            `;

                            USBD_TypeDef_Init_String += `\
                            \r\n.Intf${InterfaceNum}.Input.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["In"]["Addr"])},\
                            \r\n.Intf${InterfaceNum}.Input.Size = ${interfaceInfo[i]["Endpoint"]["In"]["Size"]},\
                            \r\n.Intf${InterfaceNum}.Input.State = 0,\
                            ${haveReportId ? `\
                            ${VendorDefineReportId ? `\r\r.Intf${InterfaceNum}.Input.ReportId.VendorDefine = ${VendorDefineReportId}\,` : ""}\
                            ${MouseReportId ? `\r\r.Intf${InterfaceNum}.Input.ReportId.Mouse = ${MouseReportId}\,` : ""}\
                            ${KeyboardReportId ? `\r\r.Intf${InterfaceNum}.Input.ReportId.Keyboard = ${KeyboardReportId}\,` : ""}\
                            ${ConsumerReportId ? `\r\r.Intf${InterfaceNum}.Input.ReportId.Consumer = ${ConsumerReportId}\,` : ""}\
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
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_OutEp0_Callback,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}OutEp0);\
                            `;

                            USBD_Ep_Callback_String += `\
                            \r\nstatic void USBD_Intf${InterfaceNum}_OutEp0_Callback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum}.Output.State = 1;\               
                            \r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum}.Output.Address,\
                            \r\n\tusbd.Intf${InterfaceNum}.Output.Frame.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum}.Output.Frame.Buffer));\
                            \r\n}\
                            `;

                            if (interfaceInfo[i]["VendorDefine"]["Enabled"]) {
                                if (interfaceInfo[i]["VendorDefine"]["Output"]["Enabled"]) {

                                    USBD_Event_Handler_String += `\
                                    \r\nusbd_ep_start_read(\
                                    \r\n\tUSBD_BUSID,\
                                    \r\n\tusbd.Intf${InterfaceNum}.Output.Address,\
                                    \r\n\tusbd.Intf${InterfaceNum}.Output.Frame.Buffer,\
                                    \r\n\tsizeof(usbd.Intf${InterfaceNum}.Output.Frame.Buffer));\
                                    `;

                                    VendorDefineReportId = interfaceInfo[i]["VendorDefine"]["Output"]["Id"];

                                    outputString += `\
                                    \r\nstruct\
                                    \r\n{\
                                    ${interfaceInfo[i]["VendorDefine"]["Output"]["Id"] ? `\
                                        \r\nunsigned char ReportId;\
                                        ` : ""}\
                                    \r\nunsigned char Data[${interfaceInfo[i]["VendorDefine"]["Output"]["Size"] - (interfaceInfo[i]["VendorDefine"]["Output"]["Id"] ? 1 : 0)}];\
                                    \r\n} VendorDefine;\
                                    \r\n`;
                                }
                            }
                            haveReportId = VendorDefineReportId;

                            outputString = `\
                            \r\struct\
                            \r\n{\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n__IO uint8_t State; // Rx done flag\
                            ${haveReportId ? `\
                            \r\nstruct\
                            \r\n{\
                            ${VendorDefineReportId ? "\r\nuint8_t VendorDefine;" : ""}\
                            \r\n} ReportId;\
                                ` : ""}\
                            ${outputString != "" ? `\
                                \r\n#pragma pack(1)\
                                \r\nunion {\
                                \r\nuint8_t Buffer[${interfaceInfo[i]["Endpoint"]["Out"]["Size"]}];\
                                ${outputString}\
                                \r\n} Frame;\
                                \r\n#pragma pack()\
                                ` : ""}\
                            \r\n} Output;\
                            `;

                            USBD_TypeDef_Init_String += `\
                            \r\n.Intf${InterfaceNum}.Output.Address = 0x${toHexFormat(interfaceInfo[i]["Endpoint"]["Out"]["Addr"])},\
                            \r\n.Intf${InterfaceNum}.Output.Size = ${interfaceInfo[i]["Endpoint"]["Out"]["Size"]},\
                            \r\n.Intf${InterfaceNum}.Output.State = 0,\
                            ${VendorDefineReportId ? `\
                                \r\r.Intf${InterfaceNum}.Output.ReportId.VendorDefine = ${VendorDefineReportId},
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
                        \r\nstruct {\
                        \r\nconst uint32_t Address : 8;\
                        \r\nconst uint32_t Size : 24;\
                        \r\n__IO uint8_t State;// Tx done flag\
                        \r\n#pragma pack(1)\
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
                        \r\n} Frame;\
                        \r\n#pragma pack()\
                        \r\n} IntEndpoint;\
                        `;

                        USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}IntEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["IntEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_IntEp0_Callback,\
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
                            \r\nstatic void USBD_Intf${InterfaceNum}_IntEp0_Callback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum}.IntEndpoint.State = USBD_STATE_IDLE;\
                            \r\n}\
                            `;

                        USBD_Intf_Write_Function_String += `\
                        \r\nint USBD_Intf${InterfaceNum}_CDC_ACM_Int_Input(void)\
                        \r\n{\
                        \r\n    return USBD_InEp_Write(\
                        \r\n        USBD_BUSID,\
                        \r\n        usbd.Intf${InterfaceNum}.IntEndpoint.Address,\
                        \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.IntEndpoint.State,\
                        \r\n        sizeof(usbd.Intf${InterfaceNum}.IntEndpoint.State),\
                        \r\n        &usbd.Intf${InterfaceNum}.IntEndpoint.State);\
                        \r\n}\
                        \r\n`;
                        functionDefString += `\r\nint USBD_Intf${InterfaceNum}_CDC_ACM_Int_Input(void);`;

                        inputTypeDefString = `\
                        \r\nstruct {\
                        \r\nconst uint32_t Address : 8;\
                        \r\nconst uint32_t Size : 24;\
                        \r\n__IO uint8_t State;// Tx done flag\
                        \r\nuint8_t Buffer[${interfaceInfo[i]["TxLength"]}];\
                        \r\n} InEndpoint;\
                        `;

                        USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum + 1}InEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum + 1}_InEp0_Callback,\
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
                            \r\nstatic void USBD_Intf${InterfaceNum + 1}_InEp0_Callback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n    if (((nbytes & (${interfaceInfo[i]["MaxMps"]} - 1)) == 0) && nbytes) {\
                            \r\n        /* send zlp */\
                            \r\n        usbd_ep_start_write(busid, ep, NULL, 0);\
                            \r\n    } else {\
                            \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.State = USBD_STATE_IDLE;\
                            \r\n    }\
                            \r\n}\
                            `;

                        USBD_Intf_Write_Function_String += `\
                        \r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Data_Input(size_t Length)\
                        \r\n{\
                        \r\n    Length = Length > sizeof(usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer)\
                        \r\n        ? sizeof(usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer) \
                        \r\n        : Length;\
                        \r\n\
                        \r\n    return USBD_InEp_Write(\
                        \r\n        USBD_BUSID,\
                        \r\n        usbd.Intf${InterfaceNum + 1}.InEndpoint.Address,\
                        \r\n        (uint8_t *)&usbd.Intf${InterfaceNum + 1}.InEndpoint.Buffer,\
                        \r\n        Length,\
                        \r\n        &usbd.Intf${InterfaceNum + 1}.InEndpoint.State);\
                        \r\n}\
                        \r\n`;
                        functionDefString += `\r\nint USBD_Intf${InterfaceNum + 1}_CDC_ACM_Data_Input(size_t Length);`;

                        outputTypeDefString = `\
                        \r\nstruct {\
                        \r\nconst uint32_t Address : 8;\
                        \r\nconst uint32_t Size : 24;\
                        \r\n__IO uint8_t State;// Rx done flag\
                        \r\nuint8_t Buffer[${interfaceInfo[i]["RxLength"]}];\
                        \r\n} OutEndpoint;\
                        `;

                        USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum + 1}OutEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum + 1}_OutEp0_Callback,\
                            \r\n};\
                            `;
                        USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum + 1}OutEp0);\
                            `;

                        USBD_Ep_Callback_String += `\
                            \r\nstatic void USBD_Intf${InterfaceNum + 1}_OutEp0_Callback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum + 1}.OutEndpoint.State = 1;\
                            \r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer));\
                            \r\n}\
                            `;

                        USBD_Event_Handler_String += `\
                            \r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum + 1}.OutEndpoint.Buffer));\
                            `;

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
                            \r\nstruct {\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n__IO uint8_t State;// Tx done flag\
                            \r\nuint8_t Buffer[${interfaceInfo[i]["TxLength"]}];\
                            \r\n} InEndpoint;\
                            `;

                            USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}InEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["InEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_InEp0_Callback,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}InEp0);\
                            `;

                            USBD_Ep_Callback_String += `\
                            \r\nstatic void USBD_Intf${InterfaceNum}_InEp0_Callback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\n    if ((nbytes & (64 - 1)) == 0 && nbytes) {\
                            \r\n        /* send zlp */\
                            \r\n        usbd_ep_start_write(busid, ep, NULL, 0);\
                            \r\n    } else {\
                            \r\n        usbd.Intf${InterfaceNum}.InEndpoint.State = USBD_STATE_IDLE;\
                            \r\n    }\
                            \r\n}\
                            `;

                            USBD_Intf_Write_Function_String += `\
                            \r\nint USBD_Intf${InterfaceNum}_WinUSB_Input(size_t Length)\
                            \r\n{\
                            \r\n    Length = Length > sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Buffer)\
                            \r\n        ? sizeof(usbd.Intf${InterfaceNum}.InEndpoint.Buffer) \
                            \r\n        : Length;\
                            \r\n\
                            \r\n    return USBD_InEp_Write(\
                            \r\n        USBD_BUSID,\
                            \r\n        usbd.Intf${InterfaceNum}.InEndpoint.Address,\
                            \r\n        (uint8_t *)&usbd.Intf${InterfaceNum}.InEndpoint.Buffer,\
                            \r\n        Length,\
                            \r\n        &usbd.Intf${InterfaceNum}.InEndpoint.State);\
                            \r\n}\
                            \r\n`;
                            functionDefString += `\r\nint USBD_Intf${InterfaceNum}_WinUSB_Input(size_t Length);`;
                        }

                        if (interfaceInfo[i]["OutEpEnabled"]) {
                            outputTypeDefString = `\
                            \r\nstruct {\
                            \r\nconst uint32_t Address : 8;\
                            \r\nconst uint32_t Size : 24;\
                            \r\n__IO uint8_t State;// Rx done flag\
                            \r\nuint8_t Buffer[${interfaceInfo[i]["RxLength"]}];\
                            \r\n} OutEndpoint;\
                            `;

                            USBD_Ep_Init_String += `\
                            \r\nstatic struct usbd_endpoint Intf${InterfaceNum}OutEp0 = {\
                            \r\n.ep_addr = 0x${toHexFormat(interfaceInfo[i]["OutEpAddr"])},\
                            \r\n.ep_cb = USBD_Intf${InterfaceNum}_OutEp0_Callback,\
                            \r\n};\
                            `;

                            USBD_Init_String += `\
                            \r\nusbd_add_endpoint(USBD_BUSID, &Intf${InterfaceNum}OutEp0);\
                            `;

                            USBD_Event_Handler_String += `\
                            \r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum}.OutEndpoint.Buffer));\
                            `;

                            USBD_Ep_Callback_String += `\
                            \r\nstatic void USBD_Intf${InterfaceNum}_OutEp0_Callback(uint8_t busid, uint8_t ep, uint32_t nbytes)\
                            \r\n{\
                            \r\nusbd.Intf${InterfaceNum}.OutEndpoint.State = 1;\
                            \r\nusbd_ep_start_read(\
                            \r\n\tUSBD_BUSID,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Address,\
                            \r\n\tusbd.Intf${InterfaceNum}.OutEndpoint.Buffer,\
                            \r\n\tsizeof(usbd.Intf${InterfaceNum}.OutEndpoint.Buffer));\
                            \r\n}\
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
    \r\n} USBD_TypeDef;\
    `;

    hFileData = `\#ifndef ${devicehFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n#define ${devicehFileName.toLocaleUpperCase().replace(".H", "_H")}\
    \r\n\
    \r\n#ifdef __cplusplus\
    \r\nextern "C" {\
    \r\n#endif\
    \r\n\
    \r\n#include "main.h"\
    \r\n#include "CherryUSB/core/usbd_core.h"\
    ${haveHid ? `\r\n#include "CherryUSB/class/hid/usbd_hid.h"` : ""}\
    ${(haveCdc || haveWinUSB) ? `\r\n#include "../CherryUSB/class/hid/usbd_cdc_acm.h"` : ""}\
    \r\n\
    \r\n#define USBD_STATE_IDLE 0u\
    \r\n#define USBD_STATE_BUSY 1u\
    \r\n#define USBD_BUSID 0u\
    \r\n\
    ${typedefString}\
    \r\n\
    \r\nint USBD_InEp_Write(uint8_t Usb_BusId, uint8_t InEp, uint8_t *data, size_t Length, __IO uint8_t *state);\
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

    document.getElementById("DevicehFileData").value = hFileData;

    USBD_Init_String = `\
    \r\nvoid USBD_Init(void)\
    \r\n{\
    \r\n\
    ${USBD_TypeDef_InitInFunc_String}\
    \r\n\
    ${USBD_Init_String}\
    \r\nusbd_initialize(USBD_BUSID, USB_BASE, USBD_Event_Handler);\
    \r\n}\
    `;

    USBD_Event_Handler_String = `\
    \r\nstatic void USBD_Event_Handler(uint8_t busid, uint8_t event)\
    \r\n{\
    \r\n    switch (event) {\
    \r\n        case USBD_EVENT_RESET:\
    \r\n            break;\
    \r\n        case USBD_EVENT_CONNECTED:\
    \r\n            break;\
    \r\n        case USBD_EVENT_DISCONNECTED:\
    \r\n            break;\
    \r\n        case USBD_EVENT_RESUME:\
    \r\n            break;\
    \r\n        case USBD_EVENT_SUSPEND:\
    \r\n            break;\
    \r\n        case USBD_EVENT_CONFIGURED:\
    ${USBD_Event_Handler_String}\
    \r\n            break;\
    \r\n        case USBD_EVENT_SET_REMOTE_WAKEUP:\
    \r\n            break;\
    \r\n        case USBD_EVENT_CLR_REMOTE_WAKEUP:\
    \r\n            break;\
    \r\n\
    \r\n        default:\
    \r\n            break;\
    \r\n    }\
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

    document.getElementById("DevicecFileData").value = cFileData;
}

function downloadFile(FileNameElementName = new String, DataElementName = new String) {
    const fileName = document.getElementById(FileNameElementName).value;
    const dataString = document.getElementById(DataElementName).value;

    const blob = new Blob([dataString], { type: 'text/plain;charset=utf-8' });
    // 创建对象URL
    const url = URL.createObjectURL(blob);

    // 创建隐藏的下载链接
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';

    // 将链接添加到文档中
    document.body.appendChild(link);

    // 模拟点击下载
    link.click();

    // 清理资源
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

/**
 * 创建USB包 - 优先使用本地文件，远程获取为备选方案
 * @param {Object} additionalFiles - 额外添加的文件内容
 * @returns {Promise} 返回Promise，成功时触发下载
 */
async function createUSBPackage(additionalFiles = {}) {
    try {
        // 创建ZIP实例
        const zip = new JSZip();
        const usbFolder = zip.folder('USB');

        // 尝试使用本地CherryUSB文件夹
        const useLocal = await tryUseLocalCherryUSB(usbFolder);

        // 如果本地文件不可用，则从GitHub获取
        if (!useLocal) {
            console.log('本地CherryUSB文件夹不可用，从GitHub获取...');
            await fetchFromGitHub(usbFolder);
        } else {
            console.log('使用本地CherryUSB文件夹');
        }

        // 添加额外的文件
        for (const [filename, content] of Object.entries(additionalFiles)) {
            usbFolder.file(filename, content);
        }

        // 生成ZIP文件并下载
        const zipContent = await usbFolder.generateAsync({ type: 'blob' });
        saveAs(zipContent, 'USB.zip');

        console.log('USB包下载完成');
    } catch (error) {
        console.error('创建USB包失败:', error);
        throw error;
    }
}

/**
 * 尝试使用本地CherryUSB文件夹
 * @param {JSZip} usbFolder - JSZip文件夹实例
 * @returns {Promise<boolean>} 返回是否成功使用本地文件
 */
async function tryUseLocalCherryUSB(usbFolder) {
    try {
        // 尝试访问本地CherryUSB文件夹
        const response = await fetch('./CherryUSB/');
        if (!response.ok) {
            return false;
        }

        // 获取文件夹内容
        const folderContent = await getLocalFolderContent('./CherryUSB/');
        if (!folderContent || folderContent.length === 0) {
            return false;
        }

        // 处理本地文件夹内容
        await processLocalFolder(folderContent, usbFolder.folder('CherryUSB'), './CherryUSB/');
        return true;
    } catch (error) {
        console.warn('无法访问本地CherryUSB文件夹:', error);
        return false;
    }
}

/**
 * 获取本地文件夹内容
 * @param {string} folderPath - 文件夹路径
 * @returns {Promise<Array>} 返回文件列表
 */
async function getLocalFolderContent(folderPath) {
    try {
        // 这里简化处理，实际应用中可能需要根据服务器配置调整
        // 对于静态文件服务器，我们可以尝试获取目录列表
        const response = await fetch(folderPath);
        const text = await response.text();

        // 解析HTML获取文件列表（如果服务器返回目录列表）
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a');

        const files = [];
        for (const link of links) {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('?') && href !== '../') {
                files.push({
                    name: href,
                    path: folderPath + href,
                    type: href.endsWith('/') ? 'dir' : 'file'
                });
            }
        }

        return files;
    } catch (error) {
        console.error('获取本地文件夹内容失败:', error);
        return [];
    }
}

/**
 * 处理本地文件夹内容
 * @param {Array} items - 文件/文件夹列表
 * @param {JSZip} zipFolder - JSZip文件夹实例
 * @param {string} currentPath - 当前路径
 */
async function processLocalFolder(items, zipFolder, currentPath) {
    for (const item of items) {
        if (item.type === 'file') {
            // 获取文件内容
            try {
                const fileResponse = await fetch(item.path);
                if (fileResponse.ok) {
                    const fileContent = await fileResponse.blob();
                    // 在ZIP中创建文件，保持相对路径
                    const relativePath = item.path.replace(currentPath, '');
                    zipFolder.file(relativePath, fileContent);
                }
            } catch (error) {
                console.warn(`无法读取本地文件 ${item.path}:`, error);
            }
        } else if (item.type === 'dir') {
            // 递归处理子文件夹
            try {
                const subItems = await getLocalFolderContent(item.path);
                if (subItems && subItems.length > 0) {
                    const subFolder = zipFolder.folder(item.name);
                    await processLocalFolder(subItems, subFolder, item.path);
                }
            } catch (error) {
                console.warn(`无法访问本地子文件夹 ${item.path}:`, error);
            }
        }
    }
}

/**
 * 从GitHub获取CherryUSB文件夹
 * @param {JSZip} usbFolder - JSZip文件夹实例
 */
async function fetchFromGitHub(usbFolder) {
    try {
        // GitHub仓库信息
        const repo = 'serverwei/USB-Descriptor-Generator-for-CherryUSB';
        const branch = 'main';
        const cherryUSBPath = 'CherryUSB';

        // 获取CherryUSB文件夹内容
        const apiUrl = `https://api.github.com/repos/${repo}/contents/${cherryUSBPath}?ref=${branch}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`GitHub API请求失败: ${response.status} ${response.statusText}`);
        }

        const items = await response.json();

        // 递归处理GitHub文件夹内容
        await processGitHubItems(items, usbFolder.folder('CherryUSB'), cherryUSBPath, repo, branch);
    } catch (error) {
        console.error('从GitHub获取CherryUSB失败:', error);
        throw error;
    }
}

/**
 * 递归处理GitHub文件夹内容
 * @param {Array} items - GitHub API返回的文件/文件夹列表
 * @param {JSZip} zipFolder - JSZip文件夹实例
 * @param {string} currentPath - 当前路径
 * @param {string} repo - 仓库路径
 * @param {string} branch - 分支名称
 */
async function processGitHubItems(items, zipFolder, currentPath, repo, branch) {
    for (const item of items) {
        if (item.type === 'file') {
            // 下载文件内容
            try {
                const fileResponse = await fetch(item.download_url);
                if (fileResponse.ok) {
                    const fileContent = await fileResponse.blob();
                    // 在ZIP中创建文件，保持相对路径
                    const relativePath = item.path.replace(`${currentPath}/`, '');
                    zipFolder.file(relativePath, fileContent);
                }
            } catch (error) {
                console.warn(`无法下载文件 ${item.path}:`, error);
            }
        } else if (item.type === 'dir') {
            // 递归处理子文件夹
            const subFolderUrl = `https://api.github.com/repos/${repo}/contents/${item.path}?ref=${branch}`;
            try {
                const subResponse = await fetch(subFolderUrl);
                if (subResponse.ok) {
                    const subItems = await subResponse.json();
                    const subFolder = zipFolder.folder(item.name);
                    await processGitHubItems(subItems, subFolder, item.path, repo, branch);
                }
            } catch (error) {
                console.warn(`无法访问子文件夹 ${item.path}:`, error);
            }
        }
    }
}

function downloadZip() {
    if (document.getElementsByClassName("Interface").length == 0) {
        alert("No interface.");
        return;
    }

    generateCode();
    
    const usb_descriptor_c_data = document.getElementById("DescriptorcFileData").value;
    const usb_descriptor_h_data = document.getElementById("DescriptorhFileData").value;
    const usb_device_c_data = document.getElementById("DevicecFileData").value;
    const usb_device_h_data = document.getElementById("DevicehFileData").value;

    const usb_descriptor_c_name = document.getElementById("DescriptorcFileNameInput").value;
    const usb_descriptor_h_name = document.getElementById("DescriptorhFileNameInput").value;
    const usb_device_c_name = document.getElementById("DevicecFileNameInput").value;
    const usb_device_h_name = document.getElementById("DevicehFileNameInput").value;

    const additionalFiles = {
        'usb_config.h': USB_CONFIG_H,

        [usb_device_c_name]: usb_device_c_data,

        [usb_device_h_name]: usb_device_h_data,

        [usb_descriptor_c_name]: usb_descriptor_c_data,

        [usb_descriptor_h_name]: usb_descriptor_h_data
    };

    createUSBPackage(additionalFiles);
}