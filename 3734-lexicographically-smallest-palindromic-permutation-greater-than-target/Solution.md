# Greedy Prefix Match + Backtrack Increment | 38 Lines | O(n × 26) | 3ms

# Intuition
A palindrome is determined by its first half (plus an optional middle). We need the smallest half that produces a palindrome strictly greater than `target`. Greedily match the target's prefix as long as characters are available, then backtrack to find the first position where we can increment.

# Approach
- **Validate palindromability:** Count character frequencies. At most one character may have odd frequency (the center). If more than one, return `""`. Halve all frequencies.
- **Greedy prefix match:** Try to match the first half of `target` character by character, consuming from available frequencies. Stop when a needed character is unavailable.
- **Backtrack and increment:** From the last matched position backward, try each character strictly greater than the current target character at that position. For each candidate:
  - Decrement its frequency.
  - Fill remaining half positions with the smallest available characters.
  - Build the full palindrome and check if it's strictly greater than `target`.
  - If yes, return it immediately (it's the smallest such palindrome).
  - If no, restore the frequency and try the next candidate.
- Also check the exact-match case at `pos === halfLen` (full target prefix matched, palindrome is the candidate without incrementing — just check if it exceeds target).
- Return `""` if no valid permutation is found.

# Complexity
- Time complexity: $$O(n \times 26)$$ — at most `halfLen` backtrack steps, each trying up to 26 characters with O(1) suffix fill.

- Space complexity: $$O(n)$$ — half array and candidate string.

# Code
```typescript []
const lexPalindromicPermutation = (s: string, target: string): string => {
    const n = s.length;
    const freq = new Array(26).fill(0);
    for (const ch of s) freq[ch.charCodeAt(0) - 97]++;

    let middle = '';
    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 === 1) {
            if (middle !== '') return '';
            middle = String.fromCharCode(97 + i);
        }
        freq[i] >>= 1;
    }

    const halfLen = n >> 1;
    const half: string[] = [];

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

    let pos = matched;
    while (pos >= 0) {
        if (pos < halfLen) {
            const minChar = target.charCodeAt(pos) - 97 + 1;
            for (let c = minChar; c < 26; c++) {
                if (freq[c] === 0) continue;
                freq[c]--;
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
        if (pos >= 0) { freq[half[pos].charCodeAt(0) - 97]++; half.pop(); }
    }

    return '';
};
```