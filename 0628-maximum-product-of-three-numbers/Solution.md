# Top 3 Max and Bottom 2 Min Scan | 10 Lines | O(n) | 0ms

# Intuition
The maximum product of three numbers is either the three largest positives, or the largest positive multiplied by the two most negative numbers (whose product is a large positive). Track both cases in one pass.

# Approach
- Maintain `max1`, `max2`, `max3` (top 3 values) and `min1`, `min2` (bottom 2 values) in a single scan.
- Return `max(max1 * max2 * max3, max1 * min1 * min2)`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(1)$$ — five scalar variables.

# Code
```typescript []
const maximumProduct = (nums: number[]): number => {
    let max1 = -Infinity, max2 = -Infinity, max3 = -Infinity;
    let min1 = Infinity,  min2 = Infinity;

    for (const num of nums) {
        if      (num > max1) { max3 = max2; max2 = max1; max1 = num; }
        else if (num > max2) { max3 = max2; max2 = num; }
        else if (num > max3) { max3 = num; }

        if      (num < min1) { min2 = min1; min1 = num; }
        else if (num < min2) { min2 = num; }
    }

    return Math.max(max1 * max2 * max3, max1 * min1 * min2);
};
```