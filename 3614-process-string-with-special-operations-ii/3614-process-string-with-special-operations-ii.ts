const processStr = (s: string, k: number): string => {
    // Forward pass: compute final length without building the string
    let len = 0;
    for (const ch of s) {
        if      (ch === '*') { if (len > 0) len--; }
        else if (ch === '#') len *= 2;
        else if (ch !== '%') len++;
    }

    if (k >= len) return '.';

    // Backward pass: trace which original character k maps to
    for (let i = s.length - 1; i >= 0; i--) {
        const ch = s[i];
        if (ch === '*') {
            len++;
        } else if (ch === '#') {
            // Undo duplication: second half indices map back to first half
            if (k >= Math.ceil(len / 2)) k -= Math.floor(len / 2);
            len = Math.ceil(len / 2);
        } else if (ch === '%') {
            k = len - k - 1; // Undo reversal
        } else {
            if (k === len - 1) return ch; // k points to this appended char
            len--;
        }
    }

    return '.';
};