import { deleteInterface, moveInterfaceUp, moveInterfaceDown, refreshInterfaceNumbers, autoAssignEPs } from './common.js';

function numInput(cls, val, min) {
    let inp = document.createElement("input");
    inp.type = "number";
    if (cls) inp.className = cls;
    inp.value = val;
    if (min !== undefined) inp.min = min;
    return inp;
}

function makeRow(labelHtml, inputEl) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = labelHtml;
    tr.appendChild(td1);
    let td2 = document.createElement("td");
    td2.appendChild(inputEl);
    tr.appendChild(td2);
    return tr;
}

export function addCdcInterface() {
    let area = document.getElementById("InterfaceArea");
    let intf = document.createElement("div");
    intf.className = "Interface interface-card";
    intf.value = "CDC-ACM";

    // ── Header ──
    let header = document.createElement("div");
    header.className = "interface-card-header";
    let badge = document.createElement("span");
    badge.className = "interface-type-badge cdc";
    badge.dataset.baseType = "CDC-ACM";
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
    let tr;

    // Interrupt EP
    tr = document.createElement("tr");
    tr.className = "ep-section-header";
    let tdHdr = document.createElement("td");
    tdHdr.colSpan = 2;
    tdHdr.textContent = "INT Endpoint";
    tr.appendChild(tdHdr);
    epTable.appendChild(tr);
    epTable.appendChild(makeRow("Address", numInput("IntEpAddr", 1, 1)));

    // IN EP
    tr = document.createElement("tr");
    tr.className = "ep-section-header";
    tdHdr = document.createElement("td");
    tdHdr.colSpan = 2;
    tdHdr.textContent = "IN Endpoint";
    tr.appendChild(tdHdr);
    epTable.appendChild(tr);
    epTable.appendChild(makeRow("Address", numInput("InEpAddr", 1, 1)));

    // OUT EP
    tr = document.createElement("tr");
    tr.className = "ep-section-header";
    tdHdr = document.createElement("td");
    tdHdr.colSpan = 2;
    tdHdr.textContent = "OUT Endpoint";
    tr.appendChild(tdHdr);
    epTable.appendChild(tr);
    epTable.appendChild(makeRow("Address", numInput("OutEpAddr", 1, 1)));

    epPanel.appendChild(epTable);
    body.appendChild(epPanel);

    let featuresWrapper = document.createElement("div");
    featuresWrapper.className = "interface-features";

    // CDC params panel
    let paramDiv = document.createElement("div");
    paramDiv.className = "interface-feature-panel";
    let paramTable = document.createElement("table");

    paramTable.appendChild(makeRow("CDC Max MPS (Bytes)", numInput("CDC_MAX_MPS", 64, 0)));
    paramTable.appendChild(makeRow("Rx Length (Bytes)", numInput("CDC_RX_Length", 1024, 0)));
    paramTable.appendChild(makeRow("Tx Length (Bytes)", numInput("CDC_TX_Length", 1024, 0)));

    // Auto start read
    let autoTr = document.createElement("tr");
    let autoTd = document.createElement("td");
    autoTd.colSpan = 2;
    let autoLbl = document.createElement("label");
    autoLbl.className = "inline-label";
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
    rrLbl.className = "inline-label";
    let rrChk = document.createElement("input");
    rrChk.type = "checkbox";
    rrChk.className = "autoReRead";
    rrChk.checked = true;
    rrLbl.appendChild(rrChk);
    rrLbl.appendChild(document.createTextNode(" Re-read in OUT callback"));
    rrTd.appendChild(rrLbl);
    rrTr.appendChild(rrTd);
    paramTable.appendChild(rrTr);

    paramDiv.appendChild(paramTable);
    featuresWrapper.appendChild(paramDiv);

    body.appendChild(featuresWrapper);
    intf.appendChild(body);
    area.appendChild(intf);
    autoAssignEPs(intf);
    refreshInterfaceNumbers();
}
