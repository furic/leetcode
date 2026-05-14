# Frequency Validation Against Base | 8 Lines | O(n) | 1ms

# Intuition
The only candidate `n` is `nums.length - 1` (since `base[n]` has length `n + 1`). We just need to verify the frequency constraints: each value `1..n-1` appears exactly once, and `n` appears exactly twice.

# Approach
- Set `n = nums.length`. The target is `base[n-1]`, which has values `1..n-1` once and `n-1` twice.
- Build a frequency count. For each value, reject immediately if it's ≥ `n` (out of range), or if its count exceeds the allowed maximum (2 for value `n-1`, 1 for all others).
- If we make it through all elements without rejection, return `true`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(n)$$ — frequency array.

# Code
```typescript []
const isGood = (nums: number[]): boolean => {
    const n = nums.length;
    const freq = new Array(n).fill(0);

    for (const val of nums) {
        if (val >= n) return false;
        if (++freq[val] > (val === n - 1 ? 2 : 1)) return false;
    }

    return true;
};
```