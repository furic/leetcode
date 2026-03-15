# Frequency Balance Excess Count | 16 Lines | O(n) | 163ms

# Intuition
Since free swaps let us rearrange each array arbitrarily, the arrays are identical if and only if they contain the same multiset of values. Each value just needs to be split evenly between the two arrays — half in `nums1`, half in `nums2`. The cost is the number of cross-array swaps needed, which equals the total excess of any value in `nums1` above its target half-count.

# Approach
- Count frequencies of each value in `nums1` and `nums2` using two maps.
- For every distinct value across both arrays:
  - Compute `total = c1 + c2` (combined occurrences). If `total` is odd, it's impossible to split evenly — return `-1`.
  - `targetCount = total / 2` — each array must end up with exactly this many of this value.
  - `excessInNums1 = c1 - targetCount` — how many extra copies of this value are in `nums1` that need to move to `nums2`.
  - If `excessInNums1 > 0`, each excess requires one cross-array swap (cost 1 each). Accumulate into `swapCount`.
- Excesses in `nums2` (negative `excessInNums1`) are implicitly balanced by the excesses in `nums1` — every value that leaves `nums1` is replaced by a value arriving from `nums2`, so we only count one direction.
- Return `swapCount`.

# Complexity
- Time complexity: $$O(n)$$ — two passes to build frequency maps, one pass over distinct values (at most `2n` entries).

- Space complexity: $$O(n)$$ — for the two frequency maps and the value set.

# Code
```typescript []
const minCost = (nums1: number[], nums2: number[]): number => {
    const count1 = new Map<number, number>();
    const count2 = new Map<number, number>();

    for (const v of nums1) count1.set(v, (count1.get(v) ?? 0) + 1);
    for (const v of nums2) count2.set(v, (count2.get(v) ?? 0) + 1);

    const allValues = new Set([...count1.keys(), ...count2.keys()]);

    let swapCount = 0;

    for (const v of allValues) {
        const c1 = count1.get(v) ?? 0;
        const c2 = count2.get(v) ?? 0;
        const total = c1 + c2;

        if (total % 2 !== 0) return -1;

        const targetCount = total / 2;
        const excessInNums1 = c1 - targetCount;

        if (excessInNums1 > 0) swapCount += excessInNums1;
    }

    return swapCount;
};
```