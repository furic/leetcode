const lexPalindromicPermutation = (s: string, target: string): string => {
    const n = s.length;
    const freq = new Array(26).fill(0);
    for (const ch of s) freq[ch.charCodeAt(0) - 97]++;

    // Find the odd-frequency character (palindrome center)
    let middle = '';
    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 === 1) {
            if (middle !== '') return ''; // More than one odd → not palindromable
            middle = String.fromCharCode(97 + i);
        }
        freq[i] >>= 1;
    }

    const halfLen = n >> 1;
    const half: string[] = [];

    // Greedily match target's prefix as long as chars are available
    let matched = 0;
    while (matched < halfLen) {
        const c = target.charCodeAt(matched) - 97;
        if (freq[c] === 0) break;
        freq[c]--;
        half.push(String.fromCharCode(97 + c));
        matched++;
    }

    const buildCandidate = (leftHalf: string): string =>
        leftHalf + middle + [...leftHalf].reverse().join('');

    // Backtrack: try incrementing at each position
    let pos = matched;
    while (pos >= 0) {
        if (pos < halfLen) {
            const minChar = target.charCodeAt(pos) - 97 + 1;
            for (let c = minChar; c < 26; c++) {
                if (freq[c] === 0) continue;
                freq[c]--;

                // Fill remaining positions with smallest available chars
                let suffix = '';
                for (let j = 0; j < 26; j++) suffix += String.fromCharCode(97 + j).repeat(freq[j]);

                const leftHalf = half.slice(0, pos).join('') + String.fromCharCode(97 + c) + suffix;
                const candidate = buildCandidate(leftHalf);
                if (candidate > target) return candidate;

                freq[c]++;
            }
        }

        if (pos === halfLen) {
            const candidate = buildCandidate(half.join(''));
            if (candidate > target) return candidate;
        }

        pos--;
        if (pos >= 0) {
            freq[half[pos].charCodeAt(0) - 97]++;
            half.pop();
        }
    }

    return '';
};