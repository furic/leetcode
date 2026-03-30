# Parity-Partitioned Frequency Check | 8 Lines | O(n) | 5ms

# Intuition
Swapping indices `i` and `j` where `j - i` is even preserves parity — even indices only mix with even indices, odd with odd. So `s1` and `s2` are reachable from each other if and only if they have the same multiset of characters at even positions and the same multiset at odd positions.

# Approach
- Use a single `Int32Array(256)` to track character frequency differences for both parities simultaneously:
  - Even-position characters occupy slots `[0, 127]` (offset `0`).
  - Odd-position characters occupy slots `[128, 255]` (offset `128`).
  - Offset is computed as `(i & 1) << 7` — `0` for even, `128` for odd.
- In one pass: increment for `s1` characters and decrement for `s2` characters at the parity-adjusted slot.
- If every count is `0` at the end, both parity-partitioned multisets match — return `true`. Otherwise `false`.
- This avoids two separate frequency arrays by packing both parities into one array with a fixed offset.

# Complexity
- Time complexity: $$O(n)$$ — single pass over both strings, plus a constant-size (256) final check.

- Space complexity: $$O(1)$$ — fixed-size array of 256 integers.

# Code
```typescript []
const checkStrings = (s1: string, s2: string): boolean => {
    const counts = new Int32Array(256);

    for (let i = 0; i < s1.length; i++) {
        const parityOffset = (i & 1) << 7;
        counts[parityOffset + s1.charCodeAt(i)]++;
        counts[parityOffset + s2.charCodeAt(i)]--;
    }

    return counts.every(c => c === 0);
};
```