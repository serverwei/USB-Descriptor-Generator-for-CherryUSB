import { deleteInterface, moveInterfaceUp, moveInterfaceDown, refreshInterfaceNumbers, autoAssignEPs } from './common.js';
import { hexValueInput } from '../utils/hex.js';

function numInput(cls, val, min) {
    let inp = document.createElement("input");
    inp.type = "number";
    if (cls) inp.className = cls;
    inp.value = val;
    if (min !== undefined) inp.min = min;
    return inp;
}

function hexInput(cls, val, length, width) {
    let inp = document.createElement("input");
    inp.type = "text";
    if (cls) inp.className = cls;
    inp.value = val;
    inp.maxLength = length;
    inp.style.width = width;
    inp.style.textAlign = "center";
    inp.oninput = function () { hexValueInput(this, length); };
    return inp;
}

export function GenRandomGUID(element) {
    let tableNode = element.closest('.interface-card-body').querySelector('.guid-table');
    if (!tableNode) return;
    let inputs = tableNode.getElementsByTagName("input");
    const uuid = crypto.randomUUID().toUpperCase();
    inputs[0].value = uuid.slice(0, 8);
    inputs[1].value = uuid.slice(9, 13);
    inputs[2].value = uuid.slice(14, 18);
    inputs[3].value = uuid.slice(19, 23);
    inputs[4].value = uuid.slice(24, 36);
}

export function ClearGUID(element) {
    let tableNode = element.closest('.interface-card-body').querySelector('.guid-table');
    if (!tableNode) return;
    let inputs = tableNode.getElementsByTagName("input");
    inputs[0].value = "00000000";
    inputs[1].value = "0000";
    inputs[2].value = "0000";
    inputs[3].value = "0000";
    inputs[4].value = "000000000000";
}

function parseAndFillGUID(input0) {
    // Get the table and all GUID inputs
    let tableNode = input0.closest('.guid-table');
    if (!tableNode) return;
    let inputs = tableNode.getElementsByTagName("input");

    // Intercept paste on first input — parse full GUID string
    input0.addEventListener('paste', function (e) {
        let pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
        // Strip braces and dashes
        let cleaned = pasteData.replace(/[{}-\s]/g, '').toUpperCase();
        // Must be exactly 32 hex chars
        if (/^[0-9A-F]{32}$/.test(cleaned)) {
            e.preventDefault();
            inputs[0].value = cleaned.slice(0, 8);
            inputs[1].value = cleaned.slice(8, 12);
            inputs[2].value = cleaned.slice(12, 16);
            inputs[3].value = cleaned.slice(16, 20);
            inputs[4].value = cleaned.slice(20, 32);
        }
    });
}

export function CopyGUID(element) {
    let tableNode = element.closest('.interface-card-body').querySelector('.guid-table');
    if (!tableNode) return;
    let inputs = tableNode.getElementsByTagName("input");
    let guid = inputs[0].value + "-" + inputs[1].value + "-" + inputs[2].value + "-" + inputs[3].value + "-" + inputs[4].value;
    navigator.clipboard.writeText(guid).then(() => {
        element.textContent = "\u2713";
        setTimeout(() => { element.textContent = "\uD83D\uDCCB"; }, 800);
    }).catch(() => {});
}

export function addWinUsbInterface() {
    let area = document.getElementById("InterfaceArea");
    let intf = document.createElement("div");
    intf.className = "Interface interface-card";
    intf.value = "WinUSB";

    // ── Header ──
    let header = document.createElement("div");
    header.className = "interface-card-header";
    let badge = document.createElement("span");
    badge.className = "interface-type-badge winusb";
    badge.dataset.baseType = "WinUSB";
    header.appendChild(badge);
    let btnDel = document.createElement("button");
    btnDel.className = "btn btn-danger btn-sm";
    btnDel.textContent = "Delete";
    btnDel.type = "button";
    btnDel.onclick = function () { deleteInterface(this); };
    header.insertBefore(btnDel, badge);
    let btnUp = document.createElement("button");
    btnUp.className = "btn btn-icon btn-sm";
    btnUp.textContent = "\u2191";
    btnUp.type = "button";
    btnUp.onclick = function () { moveInterfaceUp(this); };
    header.insertBefore(btnUp, badge);
    let btnDn = document.createElement("button");
    btnDn.className = "btn btn-icon btn-sm";
    btnDn.textContent = "\u2193";
    btnDn.type = "button";
    btnDn.onclick = function () { moveInterfaceDown(this); };
    header.insertBefore(btnDn, badge);
    let spacer = document.createElement("span");
    spacer.style = "flex:1;";
    header.appendChild(spacer);
    intf.appendChild(header);

    // ── Body ──
    let body = document.createElement("div");
    body.className = "interface-card-body";

    // Endpoint panel
    let epPanel = document.createElement("div");
    epPanel.className = "interface-ep-panel";
    let epTable = document.createElement("table");
    epTable.className = "ep-table";
    let tr, td;

    // IN EP
    tr = document.createElement("tr");
    tr.className = "ep-section-header";
    td = document.createElement("td");
    td.colSpan = 2;
    td.textContent = "IN Endpoint";
    tr.appendChild(td);
    epTable.appendChild(tr);

    tr = document.createElement("tr");
    let tdLbl = document.createElement("td");
    tdLbl.textContent = "Enabled";
    tr.appendChild(tdLbl);
    let tdVal = document.createElement("td");
    let inChk = document.createElement("input");
    inChk.type = "checkbox";
    inChk.className = "WinUSB_Enabled_InEp";
    inChk.checked = true;
    tdVal.appendChild(inChk);
    tr.appendChild(tdVal);
    epTable.appendChild(tr);

    tr = document.createElement("tr");
    tdLbl = document.createElement("td");
    tdLbl.textContent = "Address";
    tr.appendChild(tdLbl);
    tdVal = document.createElement("td");
    tdVal.appendChild(numInput("InEpAddr", 1, 1));
    tr.appendChild(tdVal);
    epTable.appendChild(tr);

    // OUT EP
    tr = document.createElement("tr");
    tr.className = "ep-section-header";
    td = document.createElement("td");
    td.colSpan = 2;
    td.textContent = "OUT Endpoint";
    tr.appendChild(td);
    epTable.appendChild(tr);

    tr = document.createElement("tr");
    tdLbl = document.createElement("td");
    tdLbl.textContent = "Enabled";
    tr.appendChild(tdLbl);
    tdVal = document.createElement("td");
    let outChk = document.createElement("input");
    outChk.type = "checkbox";
    outChk.className = "WinUSB_Enabled_OutEp";
    outChk.checked = true;
    tdVal.appendChild(outChk);
    tr.appendChild(tdVal);
    epTable.appendChild(tr);

    tr = document.createElement("tr");
    tdLbl = document.createElement("td");
    tdLbl.textContent = "Address";
    tr.appendChild(tdLbl);
    tdVal = document.createElement("td");
    tdVal.appendChild(numInput("OutEpAddr", 1, 1));
    tr.appendChild(tdVal);
    epTable.appendChild(tr);

    epPanel.appendChild(epTable);
    body.appendChild(epPanel);

    let featuresWrapper = document.createElement("div");
    featuresWrapper.className = "interface-features";

    // Params panel
    let paramDiv = document.createElement("div");
    paramDiv.className = "interface-feature-panel";
    let paramTable = document.createElement("table");

    tr = document.createElement("tr");
    tdLbl = document.createElement("td");
    tdLbl.textContent = "Rx Length (Bytes)";
    tr.appendChild(tdLbl);
    tdVal = document.createElement("td");
    tdVal.appendChild(numInput("WinUSB_RX_Length", 1024, 0));
    tr.appendChild(tdVal);
    paramTable.appendChild(tr);

    tr = document.createElement("tr");
    tdLbl = document.createElement("td");
    tdLbl.textContent = "Tx Length (Bytes)";
    tr.appendChild(tdLbl);
    tdVal = document.createElement("td");
    tdVal.appendChild(numInput("WinUSB_TX_Length", 1024, 0));
    tr.appendChild(tdVal);
    paramTable.appendChild(tr);

    // Auto start read
    let autoTr = document.createElement("tr");
    let autoTd = document.createElement("td");
    autoTd.colSpan = 2;
    let autoLbl = document.createElement("label");
    autoLbl.className = "inline-label out-read-opt";
    let autoChk = document.createElement("input");
    autoChk.type = "checkbox";
    autoChk.className = "autoStartRead";
    autoChk.checked = true;
    autoLbl.appendChild(autoChk);
    autoLbl.appendChild(document.createTextNode(" Start read in CONFIGURED event"));
    autoTd.appendChild(autoLbl);
    autoTr.appendChild(autoTd);
    paramTable.appendChild(autoTr);
    // Auto re-read in OUT callback
    let rrTr = document.createElement("tr");
    let rrTd = document.createElement("td");
    rrTd.colSpan = 2;
    let rrLbl = document.createElement("label");
    rrLbl.className = "inline-label out-read-opt";
    let rrChk = document.createElement("input");
    rrChk.type = "checkbox";
    rrChk.className = "autoReRead";
    rrChk.checked = true;
    rrLbl.appendChild(rrChk);
    rrLbl.appendChild(document.createTextNode(" Re-read in OUT callback"));
    rrTd.appendChild(rrLbl);
    rrTr.appendChild(rrTd);
    paramTable.appendChild(rrTr);

    // Disable read options when OUT EP is disabled
    outChk.addEventListener('change', function () {
        const enabled = outChk.checked;
        intf.querySelectorAll('.out-read-opt input').forEach(c => { c.disabled = !enabled; });
    });
    (function () {
        const enabled = outChk.checked;
        intf.querySelectorAll('.out-read-opt input').forEach(c => { c.disabled = !enabled; });
    })();

    paramDiv.appendChild(paramTable);
    featuresWrapper.appendChild(paramDiv);

    // GUID panel
    let guidDiv = document.createElement("div");
    guidDiv.className = "interface-feature-panel guid-panel";
    let guidTable = document.createElement("table");
    guidTable.className = "guid-table";

    tr = document.createElement("tr");
    tdLbl = document.createElement("td");
    tdLbl.style = "display:flex;gap:4px;";
    let randBtn = document.createElement("button");
    randBtn.className = "btn btn-outline btn-sm";
    randBtn.type = "button";
    randBtn.textContent = "Random GUID";
    randBtn.onclick = function () { GenRandomGUID(this); };
    tdLbl.appendChild(randBtn);
    let copyBtn = document.createElement("button");
    copyBtn.className = "btn btn-outline btn-sm";
    copyBtn.type = "button";
    copyBtn.textContent = "\uD83D\uDCCB";
    copyBtn.title = "Copy GUID";
    copyBtn.onclick = function () { CopyGUID(this); };
    tdLbl.appendChild(copyBtn);
    let clearBtn = document.createElement("button");
    clearBtn.className = "btn btn-danger btn-sm";
    clearBtn.type = "button";
    clearBtn.textContent = "\u2715";
    clearBtn.title = "Clear GUID";
    clearBtn.onclick = function () { ClearGUID(this); };
    tdLbl.appendChild(clearBtn);
    tr.appendChild(tdLbl);
    tdVal = document.createElement("td");
    tdVal.style = "display:flex;gap:2px;align-items:center;";
    let g0 = hexInput("WinUSB_GUID_0", "00000000", 8, "96px");
    tdVal.appendChild(g0);
    tdVal.appendChild(document.createTextNode("-"));
    tdVal.appendChild(hexInput("WinUSB_GUID_1", "0000", 4, "56px"));
    tdVal.appendChild(document.createTextNode("-"));
    tdVal.appendChild(hexInput("WinUSB_GUID_2", "0000", 4, "56px"));
    tdVal.appendChild(document.createTextNode("-"));
    tdVal.appendChild(hexInput("WinUSB_GUID_3", "0000", 4, "56px"));
    tdVal.appendChild(document.createTextNode("-"));
    tdVal.appendChild(hexInput("WinUSB_GUID_4", "000000000000", 12, "128px"));
    tr.appendChild(tdVal);
    guidTable.appendChild(tr);
    // Wire up paste handler after DOM insertion
    parseAndFillGUID(g0);

    guidDiv.appendChild(guidTable);
    featuresWrapper.appendChild(guidDiv);

    body.appendChild(featuresWrapper);
    intf.appendChild(body);
    area.appendChild(intf);
    autoAssignEPs(intf);
    refreshInterfaceNumbers();
}
