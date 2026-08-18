# Endpoint Uniqueness Constraint | 8 Lines | O(n) | 2ms

# Intuition
An element at index `i` appears in exactly `min(i+1, n-k+1, k, n-i)` subarrays of size `k`. For an element to appear in exactly one such subarray, it must be near an endpoint. With a bit of analysis:
- `k = n`: only one subarray exists — any unique element qualifies.
- `k = 1`: every element forms its own subarray — unique elements (appearing once in `nums`) qualify.
- `k > 1, k < n`: only `nums[0]` and `nums[n-1]` can appear in exactly one size-k subarray, and only if they're unique in `nums`.

# Approach
- Count frequencies of all elements.
- For `k = n`: return the global max.
- For `k = 1`: filter elements appearing exactly once and return the max.
- Otherwise: check `nums[0]` and `nums[n-1]` — return the max among those that are unique.
- Return `-1` if no candidate exists.

# Complexity
- Time complexity: $$O(n)$$ — frequency count and small candidate check.

- Space complexity: $$O(n)$$ — frequency map.

# Code
```typescript []
const largestInteger = (nums: number[], k: number): number => {
    const n = nums.length;
    const freq = new Map<number, number>();
    for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);

    const unique = (x: number) => freq.get(x) === 1;

    if (k === n) return Math.max(...nums);

    const candidates = k === 1
        ? nums.filter(unique)
        : [nums[0], nums[n - 1]].filter(unique);

    return candidates.length ? Math.max(...candidates) : -1;
};
```