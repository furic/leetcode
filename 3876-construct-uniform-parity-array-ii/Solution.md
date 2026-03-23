# Parity Conversion Feasibility Check | 8 Lines | O(n) | 32ms

# Intuition
Each element can either keep its value or subtract another element to change parity. The key observation is that subtracting an odd number flips parity (even→odd, odd→even), and subtracting an even number preserves parity. So converting an element's parity always requires borrowing from a smaller element of the opposite parity.

# Approach
- Partition `nums1` into `odds` and `evens`.
- **`canBeAllEven`:** Odd numbers can be made even by subtracting a smaller odd. But the smallest odd in the array has nothing smaller to subtract — it can't be converted. So all-even is only possible if there are no odd numbers at all.
- **`canBeAllOdd`:** Odd numbers stay odd. Even numbers can be made odd by subtracting a smaller odd number (`even - odd = odd`, and we need `nums1[i] > nums1[j]`). For every even to have a valid smaller odd to borrow from, we need `min(odds) < min(evens)` — if the smallest odd is less than the smallest even, then every even has at least one smaller odd available. If there are no evens, it's trivially all-odd already.
- Return `canBeAllEven || canBeAllOdd`.

# Complexity
- Time complexity: $$O(n)$$ — two filter passes and two min scans, each $$O(n)$$.

- Space complexity: $$O(n)$$ — for the filtered odds and evens arrays.

# Code
```typescript []
const uniformArray = (nums1: number[]): boolean => {
    const odds  = nums1.filter((v) => v % 2 !== 0);
    const evens = nums1.filter((v) => v % 2 === 0);

    const canBeAllEven = odds.length === 0;

    const canBeAllOdd  = evens.length === 0
        || (odds.length > 0 && Math.min(...odds) < Math.min(...evens));

    return canBeAllEven || canBeAllOdd;
};
```