# Prefix Max + Suffix Min Backward Propagation | 12 Lines | O(n) | 45ms

# Intuition
From any index, you can jump backward to larger values (unlimited chain until you hit the global max reachable from there), and forward to smaller values. The key insight: once you reach any index `k`, you can keep jumping backward to collect the maximum of `nums[0..k]` — so the answer at `k` is at least `prefixMax[k]`. The challenge is determining which indices can reach which `k`.

# Approach
- **Forward pass:** Build `prefixMax[i] = max(nums[0..i])`. This gives the best value reachable if you can somehow arrive at index `i` and then freely jump backward through larger values.
- **Backward pass:** Propagate forward-jump reachability right to left, tracking `suffixMinIdx` — the index of the smallest value in the suffix `[i+1, n-1]`.
  - From index `i`, if `nums[i] > nums[suffixMinIdx]`, we can jump forward to `suffixMinIdx` (since it's smaller). From there, `prefixMax[suffixMinIdx]` is reachable. So `prefixMax[i] = prefixMax[suffixMinIdx]`.
  - If `nums[i] <= nums[suffixMinIdx]`, no forward jump improves things — `prefixMax[i]` stays as is.
  - Update `suffixMinIdx` when a new minimum is found scanning rightward.
- The final `prefixMax[i]` represents the maximum value reachable starting from `i`.
- **Why `suffixMinIdx` suffices:** To jump forward, you need a smaller element ahead. The globally smallest suffix element is the "easiest" to jump to from the most positions. Once there, `prefixMax` captures the best backward-reachable value from that landing point.

# Complexity
- Time complexity: $$O(n)$$ — one forward pass, one backward pass.

- Space complexity: $$O(n)$$ — for the `prefixMax` array (also used as output).

# Code
```typescript []
const maxValue = (nums: number[]): number[] => {
    const n = nums.length;

    const prefixMax: number[] = [nums[0]];
    for (let i = 1; i < n; i++)
        prefixMax.push(Math.max(prefixMax[i - 1], nums[i]));

    let suffixMinIdx = n - 1;
    for (let i = n - 2; i >= 0; i--) {
        if (prefixMax[i] > nums[suffixMinIdx])
            prefixMax[i] = prefixMax[suffixMinIdx];
        if (nums[i] < nums[suffixMinIdx])
            suffixMinIdx = i;
    }

    return prefixMax;
};
```