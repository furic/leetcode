# Forward Length + Backward Index Trace | 20 Lines | O(n) | 40ms

# Intuition
Building the result string explicitly is impossible — it can grow to `10^15` characters. Instead, simulate the length forward, then trace backwards through the operations to find which original character `k` maps to.

# Approach
- **Forward pass:** Simulate only the length: `*` decrements, `#` doubles, `%` leaves it unchanged, letters increment. If `k >= len` after this pass, return `'.'`.
- **Backward pass:** Walk the operations in reverse, undoing each one to track which position `k` corresponds to before that operation:
  - `*`: The deleted character is now restored — length increments. `k` is unaffected (it still points to the same logical position before the deletion).
  - `#`: Undo duplication. The second half maps back to the first half: if `k >= ceil(len/2)`, subtract `floor(len/2)` from `k`. Then halve the length (ceiling).
  - `%`: Undo reversal: `k = len - k - 1`.
  - Lowercase letter: This character occupies position `len - 1` (the last slot before it was appended). If `k === len - 1`, return this character. Otherwise, decrement `len`.
- Return `'.'` if no character is found (shouldn't happen if forward pass was correct).

# Complexity
- Time complexity: $$O(n)$$ — two linear passes over `s`.

- Space complexity: $$O(1)$$ — only scalar variables.

# Code
```typescript []
const processStr = (s: string, k: number): string => {
    let len = 0;
    for (const ch of s) {
        if      (ch === '*') { if (len > 0) len--; }
        else if (ch === '#') len *= 2;
        else if (ch !== '%') len++;
    }

    if (k >= len) return '.';

    for (let i = s.length - 1; i >= 0; i--) {
        const ch = s[i];
        if (ch === '*') {
            len++;
        } else if (ch === '#') {
            if (k >= Math.ceil(len / 2)) k -= Math.floor(len / 2);
            len = Math.ceil(len / 2);
        } else if (ch === '%') {
            k = len - k - 1;
        } else {
            if (k === len - 1) return ch;
            len--;
        }
    }

    return '.';
};
```