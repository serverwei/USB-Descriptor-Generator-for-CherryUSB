/**
 * 删除所有接口
 */
window.deleteAllInterfaces = function () {
    document.querySelectorAll('.interface-card').forEach(c => c.remove());
    refreshInterfaceNumbers();
};

/**
 * 获取所有接口中指定方向的最大 EP 地址（raw number）
 */
function getMaxEpAddr(className) {
    let max = 0;
    document.querySelectorAll('.' + className).forEach(el => {
        const v = parseInt(el.value) || 0;
        if (v > max) max = v;
    });
    return max;
}

/**
 * 为新接口卡片自动分配 EP 地址（INT 与 IN 共享地址空间）
 */
export function autoAssignEPs(card) {
    const container = card.parentNode; // InterfaceArea
    let maxIn = 0, maxOut = 0;

    // Scan all other cards for max EP values
    container.querySelectorAll('.interface-card').forEach(c => {
        if (c === card) return; // skip self
        const inEl = c.querySelector('.InEpAddr');
        const outEl = c.querySelector('.OutEpAddr');
        const intEl = c.querySelector('.IntEpAddr');
        if (inEl) maxIn = Math.max(maxIn, parseInt(inEl.value) || 0);
        if (outEl) maxOut = Math.max(maxOut, parseInt(outEl.value) || 0);
        if (intEl) maxIn = Math.max(maxIn, parseInt(intEl.value) || 0); // INT shares IN space
    });

    const inEl = card.querySelector('.InEpAddr');
    const outEl = card.querySelector('.OutEpAddr');
    const intEl = card.querySelector('.IntEpAddr');

    // INT and IN share the same increment counter
    if (intEl) intEl.value = ++maxIn;
    if (inEl) inEl.value = ++maxIn;
    if (outEl) outEl.value = ++maxOut;
}

/**
 * 检查所有接口的 EP 地址是否冲突，返回冲突描述字符串
 */
export function checkEPConflicts() {
    const cards = document.querySelectorAll('.interface-card');
    const conflicts = [];
    const seen = {}; // key: "dir:addr" → card index

    cards.forEach((card, i) => {
        const badge = card.querySelector('.interface-type-badge');
        const label = badge ? badge.textContent : ('#' + (i + 1));
        [
            { cls: 'InEpAddr', dir: 'IN' },
            { cls: 'OutEpAddr', dir: 'OUT' },
            { cls: 'IntEpAddr', dir: 'IN' }
        ].forEach(({ cls, dir }) => {
            const el = card.querySelector('.' + cls);
            if (!el) return;
            const v = parseInt(el.value) || 0;
            if (v === 0) return;
            const key = dir + ':' + v;
            if (seen[key] !== undefined) {
                conflicts.push(dir + ' EP ' + v + ' conflict: ' + seen[key] + ' <-> ' + label);
            } else {
                seen[key] = label;
            }
        });
    });

    return conflicts;
}

/**
 * 刷新所有接口卡片的序号
 */
export function refreshInterfaceNumbers() {
    const cards = document.querySelectorAll('.interface-card');
    cards.forEach((card, i) => {
        const badge = card.querySelector('.interface-type-badge');
        if (badge) {
            const base = badge.dataset.baseType || '';
            badge.textContent = base + ' #' + (i + 1);
        }
    });
}

/**
 * 从 DOM 中删除接口卡片
 * @param {Element} element - 触发按钮的元素
 */
export function deleteInterface(element) {
    const card = element.closest('.interface-card');
    if (card) { card.remove(); refreshInterfaceNumbers(); }
}

/**
 * 上移接口（与前一个兄弟节点交换位置）
 * @param {Element} element - 触发按钮的元素
 */
export function moveInterfaceUp(element) {
    const card = element.closest('.interface-card');
    if (!card) return;
    const prev = card.previousElementSibling;
    if (prev && prev.classList.contains('interface-card')) {
        card.parentNode.insertBefore(card, prev);
        refreshInterfaceNumbers();
    }
}

/**
 * 下移接口（与后一个兄弟节点交换位置）
 * @param {Element} element - 触发按钮的元素
 */
export function moveInterfaceDown(element) {
    const card = element.closest('.interface-card');
    if (!card) return;
    const next = card.nextElementSibling;
    if (next && next.classList.contains('interface-card')) {
        card.parentNode.insertBefore(next, card);
        refreshInterfaceNumbers();
    }
}
