# Recursive Mirror Invert Lookup | 8 Lines | O(n) | 0ms

# Intuition
The structure of `Sn` is self-similar: the first half is exactly `Sn-1`, the middle is always `'1'`, and the second half is the reverse-inverted `Sn-1`. This lets us recurse directly to a smaller subproblem without ever building the string.

# Approach
- **Base case:** `n === 1` → the only string is `"0"`, return `'0'`.
- **Compute the midpoint:** `mid = 2^(n-1)` (1-indexed center of `Sn`, which has length `2^n - 1`).
- **Three cases for position `k`:**
  - `k === mid`: always `'1'` (the literal middle character in the construction).
  - `k < mid`: `k` falls in the first half, which is a verbatim copy of `Sn-1` — recurse with `findKthBit(n - 1, k)` unchanged.
  - `k > mid`: `k` falls in the second half, which is `reverse(invert(Sn-1))`. The mirror position in `Sn-1` is `mirroredPosition = 2 * mid - k` (reflecting `k` around the center). We recurse to get the bit at that position in `Sn-1`, then **invert** it (flip `'0'`↔`'1'`) to account for the invert operation.
- Recursion depth is exactly `n`, and each level does O(1) work.

# Complexity
- Time complexity: $$O(n)$$ — one recursive call per level, depth is `n`.

- Space complexity: $$O(n)$$ — call stack depth.

# Code
```typescript []
const findKthBit = (n: number, k: number): string => {
    if (n === 1) return '0';

    const mid = 1 << (n - 1);

    if (k === mid) return '1';

    if (k < mid) return findKthBit(n - 1, k);

    const mirroredPosition = 2 * mid - k;
    return findKthBit(n - 1, mirroredPosition) === '0' ? '1' : '0';
};
```