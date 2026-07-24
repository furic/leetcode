# Unique Pair XOR then Triplet XOR Count | 16 Lines | O(V² + V·U) | 147ms

# Intuition
XOR is commutative and associative, and since `i <= j <= k` allows repeats, any element can XOR with itself (giving 0) or with others. We can decompose the problem: first enumerate all unique pair XOR values, then XOR each with every unique element to get all reachable triplet values.

# Approach
- **Deduplicate:** Since `nums[j] XOR nums[j] = 0` and repeats only matter through distinct values, work with `uniqueNums`.
- **Pair XOR (`computeXorPairs`):** For all pairs `(i, j)` with `i <= j` in `uniqueNums`, mark `uniqueNums[i] ^ uniqueNums[j]` in a boolean array of size 2048 (values ≤ 1500, so XOR ≤ 2047).
- **Triplet XOR (`computeXorTriplets`):** For each marked pair-XOR value, XOR it with every unique element and mark the result.
- **Count** the number of `true` entries in the triplet flag array.
- The range 2048 covers all possible XOR values since `1500 < 2048 = 2^11`.

# Complexity
- Time complexity: $$O(U^2 + V \cdot U)$$ where $$U$$ = number of unique elements (≤ 1500) and $$V = 2048$$ — pair enumeration is $$O(U^2)$$; triplet step is $$O(V \cdot U)$$.

- Space complexity: $$O(V)$$ — two boolean arrays of size 2048.

# Code
```typescript []
const computeXorPairs = (uniqueNums: number[]): boolean[] => {
    const xorPairs: boolean[] = Array(2048).fill(false);

    for (let i = 0; i < uniqueNums.length; i++) {
        for (let j = i; j < uniqueNums.length; j++) {
            xorPairs[uniqueNums[i] ^ uniqueNums[j]] = true;
        }
    }

    return xorPairs;
};

const computeXorTriplets = (uniqueNums: number[], xorPairValues: boolean[]): boolean[] => {
    const xorTripletFlags: boolean[] = Array(2048).fill(false);

    for (let xorPairValue = 0; xorPairValue < 2048; xorPairValue++) {
        if (xorPairValues[xorPairValue]) {
            for (const num of uniqueNums) {
                xorTripletFlags[xorPairValue ^ num] = true;
            }
        }
    }

    return xorTripletFlags;
};

const uniqueXorTriplets = (nums: number[]): number => {
    const uniqueNums = Array.from(new Set(nums));
    const xorPairValues = computeXorPairs(uniqueNums);
    const xorTripletFlags = computeXorTriplets(uniqueNums, xorPairValues);
    return xorTripletFlags.reduce((count, exists) => count + (exists ? 1 : 0), 0);
};
```