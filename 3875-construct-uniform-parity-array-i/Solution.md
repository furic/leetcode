# Odd Count Parity Feasibility | 5 Lines | O(n) | 0ms

# Intuition
Without the `>= 1` constraint, any element can subtract any other element freely. This means parity conversion is unconstrained — subtracting an odd from any value flips its parity, and we can always find an odd to subtract (or not subtract anything to keep parity).

# Approach
- Count `oddCount` — the number of odd elements in `nums1`.
- **`canBeAllOdd`:** Always achievable as long as there's at least one odd (`oddCount >= 1`). Evens can subtract that odd to become odd; odds keep their value.
- **`canBeAllEven`:** 
  - If `oddCount === 0`: all already even — trivially true.
  - If `oddCount >= 2`: odds can subtract each other (odd - odd = even) — true.
  - If `oddCount === 1`: the single odd has no other odd to subtract from, and subtracting an even keeps it odd — impossible.
- Note: the previous version required `min(odds) < min(evens)` because subtraction needed to be positive. Here that restriction is gone, making the logic purely a count check.

# Complexity
- Time complexity: $$O(n)$$ — one pass to count odds.

- Space complexity: $$O(1)$$ — only a counter.

# Code
```typescript []
const uniformArray = (nums1: number[]): boolean => {
    const oddCount = nums1.filter((v) => v % 2 !== 0).length;

    const canBeAllEven = oddCount === 0 || oddCount >= 2;
    const canBeAllOdd  = oddCount >= 1;

    return canBeAllEven || canBeAllOdd;
};
```