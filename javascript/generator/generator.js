import { parseAndBuildDescriptors } from './builder-parser.js';
import { buildDeviceCode } from './builder-device.js';
import { checkEPConflicts } from '../ui/common.js';

export function generateCode() {
    // Check EP conflicts
    const conflicts = checkEPConflicts();
    if (conflicts.length) {
        alert('Endpoint conflict detected:\n' + conflicts.join('\n'));
        return;
    }

    // Phase 1: Parse DOM → descriptor .c/.h + interfaceInfo[]
    const result = parseAndBuildDescriptors(document);
    if (!result) return;

    // Phase 2: Build device .c/.h from interfaceInfo[]
    const chip = document.getElementById('chipSelect')?.value || 'STM32';
    buildDeviceCode(result.interfaceInfo, result.cFileName, result.hFileName, chip);

    // Highlight all code blocks (reset hljs class first for re-generation)
    if (typeof hljs !== 'undefined') {
        ['DescriptorcFileData','DescriptorhFileData','DevicecFileData','DevicehFileData'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('hljs');
                el.removeAttribute('data-highlighted');
                el.textContent = el.textContent; // ensure plain text
                hljs.highlightElement(el);
            }
        });
    }
}
