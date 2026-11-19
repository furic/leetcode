# Three Extremes Spread Minimization | 18 Lines | O(n) | 5ms

# Intuition
Changing two elements lets us make the low score `0` for free: set one changed element equal to any other element. So the score reduces to the high score, which is `max - min` of the array after the change. Since n >= 3, at least one element stays untouched, and the two changed elements can be set to any value in the remaining range without widening it, so the best strategy is to remove the two most extreme values.

# Approach
- Only three removal patterns matter, because the changed elements should be extremes:
  - Remove the two largest: spread becomes `max3 - min1`.
  - Remove one smallest and one largest: spread becomes `max2 - min2`.
  - Remove the two smallest: spread becomes `max1 - min3`.
- Here `min1 <= min2 <= min3` are the three smallest values and `max1 >= max2 >= max3` are the three largest.
- Find these in a single pass with `keepSmallest3`, which maintains the three smallest values in ascending order by insertion. Running it on `-num` gives the three largest values, negated.
- Return the minimum of the three spreads.

# Complexity
- Time complexity: $$O(n)$$ — one pass, with constant work (at most 3 shifts) per element.

- Space complexity: $$O(1)$$ — two fixed-size arrays of length 3.

# Code
```typescript []
const keepSmallest3 = (smallest3: number[], value: number): void => {
    if (value >= smallest3[2]) return;

    let pos = 2;
    for (; pos > 0 && smallest3[pos - 1] > value; pos--) smallest3[pos] = smallest3[pos - 1];
    smallest3[pos] = value;
};

const minimizeSum = (nums: number[]): number => {
    const lowest = [Infinity, Infinity, Infinity];
    const negatedHighest = [Infinity, Infinity, Infinity];

    for (const num of nums) {
        keepSmallest3(lowest, num);
        keepSmallest3(negatedHighest, -num);
    }

    const min1 = lowest[0], min2 = lowest[1], min3 = lowest[2];
    const max1 = -negatedHighest[0], max2 = -negatedHighest[1], max3 = -negatedHighest[2];

    return Math.min(max3 - min1, max2 - min2, max1 - min3);
};
```