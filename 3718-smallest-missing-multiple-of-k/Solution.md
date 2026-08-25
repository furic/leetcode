# Set Probe Smallest Missing Multiple | 4 Lines | O(n) | 0ms

# Intuition
Put all numbers in a set, then check multiples of `k` starting from `k` until one is absent.

# Approach
- Build a `Set` from `nums`.
- Increment a counter `multiple` starting at 1, checking `k * multiple` until it's not in the set.
- Return `k * multiple`.

# Complexity
- Time complexity: $$O(n + m)$$ where $$m$$ is the answer divided by $$k$$ — set build is $$O(n)$$, probe loop is at most $$O(n)$$ steps (bounded by how many multiples of $$k$$ fit in `nums`).

- Space complexity: $$O(n)$$ — the set.

# Code
```typescript []
const missingMultiple = (nums: number[], k: number): number => {
    const seen = new Set(nums);
    let multiple = 1;
    while (seen.has(k * multiple)) multiple++;
    return k * multiple;
};
```