# Greedy Sort Increment Cap | 5 Lines | O(n log n) | 4ms

# Intuition
After sorting, we greedily assign the maximum possible value to each element. The first element must be 1, and each subsequent element can be at most 1 more than the previous. An element can only "claim" the next slot if its original value is large enough to allow it.

# Approach
- Sort ascending so we process smaller values first.
- Track `maxVal` — the next value we want to assign (starts at 1). For each element, if it can fill slot `maxVal` (i.e. `x >= maxVal`), advance `maxVal`. Otherwise the element must be reduced to fit below, and it can't push the frontier forward.
- Return `maxVal - 1` after the loop (the last slot successfully filled).

# Complexity
- Time complexity: $$O(n \log n)$$ — dominated by sorting.

- Space complexity: $$O(\log n)$$ — sort stack.

# Code
```typescript []
const maximumElementAfterDecrementingAndRearranging = (arr: number[]): number => {
    arr.sort((a, b) => a - b);
    let maxVal = 1;
    for (const x of arr) {
        if (x >= maxVal) maxVal++;
    }
    return maxVal - 1;
};
```