# Mirror Pair Frequency Diff Sum | 10 Lines | O(n) | 15ms

# Intuition
Each character has exactly one mirror partner. We only need to count each pair once, so we iterate over the "smaller half" of each character set and sum the absolute frequency differences with their mirrors.

# Approach
- Build a frequency array indexed by ASCII code using a `Uint32Array(123)` — covers digits (`48–57`) and lowercase letters (`97–122`).
- **Digit mirror pairs:** `'0'↔'9'`, `'1'↔'8'`, ..., `'4'↔'5'`. The mirror of code `i` is `48 + 57 - i = 105 - i`. Iterate `i` from `48` to `52` (lower half: `'0'` to `'4'`) — this covers all 5 distinct digit mirror pairs exactly once.
- **Letter mirror pairs:** `'a'↔'z'`, `'b'↔'y'`, ..., `'m'↔'n'`. The mirror of code `i` is `97 + 122 - i = 219 - i`. Iterate `i` from `97` to `109` (lower half: `'a'` to `'m'`) — covers all 13 distinct letter mirror pairs exactly once.
- Sum `|freq[i] - freq[mirror(i)]|` for each pair and return.

# Complexity
- Time complexity: $$O(n)$$ — one pass to build frequencies; the summation loop is over a constant 18 pairs.

- Space complexity: $$O(1)$$ — fixed-size frequency array of 123 entries.

# Code
```typescript []
const mirrorFrequency = (s: string): number => {
    const freq = new Uint32Array(123);
    for (let i = 0; i < s.length; i++) freq[s.charCodeAt(i)]++;

    let total = 0;

    for (let i = 48; i <= 52; i++)
        total += Math.abs(freq[i] - freq[105 - i]);

    for (let i = 97; i <= 109; i++)
        total += Math.abs(freq[i] - freq[219 - i]);

    return total;
};
```