import { deleteInterface, moveInterfaceUp, moveInterfaceDown, refreshInterfaceNumbers, autoAssignEPs } from './common.js';
import { hexValueInput } from '../utils/hex.js';

// Helper: create a labeled row (label | input)
function makeRow(labelHtml, inputEl, className) {
    let tr = document.createElement("tr");
    let tdLabel = document.createElement("td");
    tdLabel.innerHTML = labelHtml;
    tr.appendChild(tdLabel);
    let tdInput = document.createElement("td");
    if (className) inputEl.className = className;
    tdInput.appendChild(inputEl);
    tr.appendChild(tdInput);
    return tr;
}

// Helper: number input with defaults
function numInput(cls, val, min, max) {
    let inp = document.createElement("input");
    inp.type = "number";
    if (cls) inp.className = cls;
    inp.value = val;
    if (min !== undefined) inp.min = min;
    if (max !== undefined) inp.max = max;
    return inp;
}

// Helper: checkbox row
function makeCheckRow(labelHtml, cls) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let label = document.createElement("label");
    label.className = "inline-label";
    label.innerHTML = labelHtml;
    let chk = document.createElement("input");
    chk.type = "checkbox";
    if (cls) chk.className = cls;
    label.insertBefore(chk, label.firstChild);
    td.appendChild(label);
    tr.appendChild(td);
    return tr;
}

// Helper: create a feature panel div
function makeFeaturePanel(className) {
    let div = document.createElement("div");
    div.className = "interface-feature-panel";
    let table = document.createElement("table");
    if (className) table.className = className;
    div.appendChild(table);
    return [div, table];
}

export function addHidInterface() {
    let area = document.getElementById("InterfaceArea");
    let intf = document.createElement("div");
    intf.className = "Interface interface-card";
    intf.value = "HID";

    // Auto-assign Report IDs starting from 1 (only when 2+ features enabled)
    function autoReportIds() {
        const card = intf;
        let checked = [
            card.querySelector('.vendorDefineEnabled'),
            card.querySelector('.mouseEnabled'),
            card.querySelector('.keyboardEnabled'),
            card.querySelector('.consumerEnabled'),
            card.querySelector('.systemControlEnabled')
        ].filter(c => c?.checked);
        if (checked.length < 2) {
            // Single feature — no Report ID needed, reset all to 0
            card.querySelectorAll('.vendorDefineInReId, .vendorDefineOutReId, .mouseReId, .keyboardReId, .consumerReId, .systemControlReId').forEach(el => { el.value = 0; });
            return;
        }
        let nextId = 1;
        if (card.querySelector('.vendorDefineEnabled')?.checked) {
            card.querySelector('.vendorDefineInReId').value = nextId++;
            card.querySelector('.vendorDefineOutReId').value = nextId++;
        }
        if (card.querySelector('.mouseEnabled')?.checked) {
            card.querySelector('.mouseReId').value = nextId++;
        }
        if (card.querySelector('.keyboardEnabled')?.checked) {
            card.querySelector('.keyboardReId').value = nextId++;
        }
        if (card.querySelector('.consumerEnabled')?.checked) {
            card.querySelector('.consumerReId').value = nextId++;
        }
        if (card.querySelector('.systemControlEnabled')?.checked) {
            card.querySelector('.systemControlReId').value = nextId++;
        }
    }

    // ── Header ──
    let header = document.createElement("div");
    header.className = "interface-card-header";
    let badge = document.createElement("span");
    badge.className = "interface-type-badge";
    badge.dataset.baseType = "HID";
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
    // Select All / Clear All
    let btnSelAll = document.createElement("button");
    btnSelAll.className = "btn btn-outline btn-sm";
    btnSelAll.textContent = "Check All";
    btnSelAll.title = "Enable all features";
    btnSelAll.type = "button";
    btnSelAll.onclick = function () {
        const card = this.closest('.interface-card');
        card.querySelectorAll('.vendorDefineEnabled, .mouseEnabled, .keyboardEnabled, .consumerEnabled, .systemControlEnabled').forEach(chk => {
            chk.checked = true;
            chk.dispatchEvent(new Event('change', { bubbles: true }));
        });
    };
    header.insertBefore(btnSelAll, badge);
    let btnClrAll = document.createElement("button");
    btnClrAll.className = "btn btn-outline btn-sm";
    btnClrAll.textContent = "Clear All";
    btnClrAll.title = "Disable all features";
    btnClrAll.type = "button";
    btnClrAll.onclick = function () {
        const card = this.closest('.interface-card');
        card.querySelectorAll('.vendorDefineEnabled, .mouseEnabled, .keyboardEnabled, .consumerEnabled, .systemControlEnabled').forEach(chk => {
            chk.checked = false;
            chk.dispatchEvent(new Event('change', { bubbles: true }));
        });
    };
    header.insertBefore(btnClrAll, badge);
    let spacer = document.createElement("span");
    spacer.style = "flex:1;";
    header.appendChild(spacer);
    intf.appendChild(header);

    // ── Body ──
    let body = document.createElement("div");
    body.className = "interface-card-body";

    // -- Endpoint panel --
    let epPanel = document.createElement("div");
    epPanel.className = "interface-ep-panel";
    let epTable = document.createElement("table");
    epTable.className = "ep-table";
    let tr, td;

    // In endpoint section header
    tr = document.createElement("tr");
    tr.className = "ep-section-header";
    td = document.createElement("td");
    td.colSpan = 2;
    td.textContent = "IN Endpoint";
    tr.appendChild(td);
    epTable.appendChild(tr);

    tr = makeRow("Address", numInput("InEpAddr", 1, 1));
    epTable.appendChild(tr);
    tr = makeRow("Interval (ms)", numInput("InEpInterval", 1, 1));
    epTable.appendChild(tr);

    // Out endpoint section header
    tr = document.createElement("tr");
    tr.className = "ep-section-header";
    td = document.createElement("td");
    td.colSpan = 2;
    td.textContent = "OUT Endpoint";
    tr.appendChild(td);
    epTable.appendChild(tr);

    tr = makeRow("Address", numInput("OutEpAddr", 1, 1));
    epTable.appendChild(tr);
    tr = makeRow("Interval (ms)", numInput("OutEpInterval", 1, 1));
    epTable.appendChild(tr);

    epPanel.appendChild(epTable);
    body.appendChild(epPanel);

    let featuresWrapper = document.createElement("div");
    featuresWrapper.className = "interface-features";

    // -- Vendor Define --
    {
        let [div, table] = makeFeaturePanel("vendorDefine");

        let enabledTr = document.createElement("tr");
        let enabledTd = document.createElement("td");
        let enabledLbl = document.createElement("label");
        enabledLbl.className = "inline-label";
        let enabledChk = document.createElement("input");
        enabledChk.type = "checkbox";
        enabledChk.className = "vendorDefineEnabled";
        enabledLbl.appendChild(enabledChk);
        enabledLbl.appendChild(document.createTextNode(" Vendor Define"));
        enabledTd.appendChild(enabledLbl);
        enabledTr.appendChild(enabledTd);
        table.appendChild(enabledTr);

        table.appendChild(makeRow("Input Report ID", numInput("vendorDefineInReId", 0, 0, 255)));
        table.appendChild(makeRow("Input Size (Bytes)", numInput("vendorDefineInSize", 64, 0, 65536)));
        table.appendChild(makeRow("Output Report ID", numInput("vendorDefineOutReId", 0, 0, 255)));
        table.appendChild(makeRow("Output Size (Bytes)", numInput("vendorDefineOutSize", 64, 0, 65536)));

        // Auto start read
        let chkRow = document.createElement("div");
        chkRow.className = "auto-read-row";
        let chkLbl = document.createElement("label");
        chkLbl.className = "inline-label";
        let chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "autoStartRead";
        chk.checked = true;
        chkLbl.appendChild(chk);
        chkLbl.appendChild(document.createTextNode(" Start read in CONFIGURED event"));
        chkRow.appendChild(chkLbl);
        div.appendChild(chkRow);
        // Auto re-read in OUT callback
        let rrRow = document.createElement("div");
        rrRow.className = "auto-read-row";
        let rrLbl = document.createElement("label");
        rrLbl.className = "inline-label";
        let rrChk = document.createElement("input");
        rrChk.type = "checkbox";
        rrChk.className = "autoReRead";
        rrChk.checked = true;
        rrLbl.appendChild(rrChk);
        rrLbl.appendChild(document.createTextNode(" Re-read in OUT callback"));
        rrRow.appendChild(rrLbl);
        div.appendChild(rrRow);

        featuresWrapper.appendChild(div);
    }

    // -- Mouse --
    {
        let [div, table] = makeFeaturePanel("mouse");

        table.appendChild(makeCheckRow("Mouse", "mouseEnabled"));
        table.appendChild(makeRow("Report ID", numInput("mouseReId", 0, 0, 255)));
        table.appendChild(makeRow("Button Number", numInput("mouseBtnNum", 3, 0, 16)));
        table.appendChild(makeRow("X Minimum", numInput("mouseXMin", -127, -32768, 32767)));
        table.appendChild(makeRow("X Maximum", numInput("mouseXMax", 127, -32768, 32767)));
        table.appendChild(makeRow("Y Minimum", numInput("mouseYMin", -127, -32768, 32767)));
        table.appendChild(makeRow("Y Maximum", numInput("mouseYMax", 127, -32768, 32767)));
        // Wheel checkbox
        {
            let whTr = document.createElement("tr");
            let whTd = document.createElement("td");
            let whLbl = document.createElement("label");
            whLbl.className = "inline-label";
            let whChk = document.createElement("input");
            whChk.type = "checkbox";
            whChk.className = "mouseWheelEnabled";
            whChk.checked = true;
            whLbl.appendChild(whChk);
            whLbl.appendChild(document.createTextNode(" Wheel"));
            whTd.appendChild(whLbl);
            whTr.appendChild(whTd);
            table.appendChild(whTr);
        }
        // AC Pan checkbox
        {
            let acTr = document.createElement("tr");
            let acTd = document.createElement("td");
            let acLbl = document.createElement("label");
            acLbl.className = "inline-label";
            let acChk = document.createElement("input");
            acChk.type = "checkbox";
            acChk.className = "mouseAcPanEnabled";
            acLbl.appendChild(acChk);
            acLbl.appendChild(document.createTextNode(" AC Pan"));
            acTd.appendChild(acLbl);
            acTr.appendChild(acTd);
            table.appendChild(acTr);
        }

        featuresWrapper.appendChild(div);
    }

    // -- Keyboard --
    {
        let [div, table] = makeFeaturePanel("keyboard");

        table.appendChild(makeCheckRow("Keyboard", "keyboardEnabled"));
        table.appendChild(makeRow("Report ID", numInput("keyboardReId", 0, 0, 255)));
        table.appendChild(makeRow("Key Number", numInput("keyboardKeyNumber", 6, 0, 128)));

        featuresWrapper.appendChild(div);
    }

    // -- Consumer --
    {
        let [div, table] = makeFeaturePanel("comsumer");

        table.appendChild(makeCheckRow("Consumer", "consumerEnabled"));
        table.appendChild(makeRow("Report ID", numInput("consumerReId", 0, 0, 255)));
        table.appendChild(makeRow("Key Number", numInput("consumerKeyNumber", 2, 0, 128)));

        featuresWrapper.appendChild(div);
    }

    // -- System Control --
    {
        let [div, table] = makeFeaturePanel("systemControl");

        table.appendChild(makeCheckRow("System Control", "systemControlEnabled"));
        table.appendChild(makeRow("Report ID", numInput("systemControlReId", 0, 0, 255)));
        table.appendChild(makeRow("Key Number", numInput("systemControlKeyNumber", 1, 0, 2)));

        featuresWrapper.appendChild(div);
    }

    // Auto Report ID on checkbox change
    featuresWrapper.querySelectorAll('input[type=checkbox]').forEach(chk => {
        chk.addEventListener('change', autoReportIds);
    });

    body.appendChild(featuresWrapper);
    intf.appendChild(body);
    area.appendChild(intf);
    autoAssignEPs(intf);
    refreshInterfaceNumbers();
}
