# Two-Pointer Shorter Side First | 12 Lines | O(n) | 0ms

# Intuition
Water trapped at any position is bounded by `min(maxLeft, maxRight) - height[i]`. We don't need to know both maxes simultaneously — if we always process the shorter side, the taller side guarantees a wall exists on the opposite end, so the running max on the shorter side is the binding constraint.

# Approach
- Use two pointers `left` and `right` converging inward, with `leftMax` and `rightMax` tracking the tallest bar seen so far on each side (initialised to `-1` to distinguish "no bar seen yet").
- Each iteration, process whichever side has the shorter current bar (`height[left] <= height[right]`):
  - If the current bar is shorter than `leftMax` (or `rightMax`), water fills the gap: add `max - height[current]` to `water`.
  - Otherwise, the current bar becomes the new max — no water here since it can't be bounded by a shorter wall on this side.
  - Advance the corresponding pointer.
- **Why correctness holds:** When `height[left] <= height[right]`, we know `rightMax >= height[right] >= height[left]`, so the water at `left` is fully determined by `leftMax` — the right side is definitely taller. Symmetrically for the right pointer.
- No auxiliary arrays needed — the two running maxes carry all necessary state.

# Complexity
- Time complexity: $$O(n)$$ — each element is processed exactly once.

- Space complexity: $$O(1)$$ — four scalar variables only.

# Code
```typescript []
const trap = (height: number[]): number => {
    let left = 0;
    let right = height.length - 1;
    let leftMax = -1;
    let rightMax = -1;
    let water = 0;

    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] < leftMax) water += leftMax - height[left];
            else leftMax = height[left];
            left++;
        } else {
            if (height[right] < rightMax) water += rightMax - height[right];
            else rightMax = height[right];
            right--;
        }
    }

    return water;
};
```