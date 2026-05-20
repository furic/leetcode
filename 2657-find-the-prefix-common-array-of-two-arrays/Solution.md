# 21:33Frequency Count Common Prefix | 8 Lines | O(n) | 1ms

# Intuition
A value becomes "common" in both prefixes the moment it has been seen in both `A` and `B`. Using a single frequency array, a value's count reaches exactly `2` when that happens — no matter which array provided the second occurrence.

# Approach
- Maintain a `freq` array of size `n+1` (values are `1..n`).
- At each index `i`, increment `freq[A[i]]` and `freq[B[i]]`. When either hits `2`, that value just became common — increment `commonCount`.
- Append `commonCount` to the result after processing both elements at index `i`.

# Complexity
- Time complexity: $$O(n)$$ — single pass.

- Space complexity: $$O(n)$$ — frequency array.

# Code
```typescript []
const findThePrefixCommonArray = (A: number[], B: number[]): number[] => {
    const n = A.length;
    const freq = new Array(n + 1).fill(0);
    const result: number[] = [];
    let commonCount = 0;

    for (let i = 0; i < n; i++) {
        if (++freq[A[i]] === 2) commonCount++;
        if (++freq[B[i]] === 2) commonCount++;
        result.push(commonCount);
    }

    return result;
};
```