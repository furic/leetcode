# Bit Tracking in Reverse | 20 Lines | O(n·logM) | 50ms

# Intuition
To get the smallest subarray starting from each index `i` that reaches the maximum possible OR from `i` to `n-1`, we need to track how far we need to go to collect all significant bits.

# Approach
We scan the array in reverse. For each position `i`, we check which bits are set in `nums[i]`. For unset bits, we remember the furthest index to the right where they last occurred. The answer at position `i` is the maximum of all these indices minus `i`, plus 1 (to make it a length).

# Complexity
- Time complexity: $$O(n \cdot \log M)$$ where M is the maximum integer in the array (we consider up to 31 bits)
- Space complexity: $$O(\log M)$$

# Code
```typescript
const smallestSubarrays = (nums: number[]): number[] => {
    const n = nums.length;
    const lastSeenBitIndex: number[] = Array(31).fill(-1);
    const result: number[] = Array(n);

    for (let i = n - 1; i >= 0; i--) {
        let furthestIndex = i;

        for (let bit = 0; bit < 31; bit++) {
            const hasBit = (nums[i] & (1 << bit)) !== 0;

            if (hasBit) {
                lastSeenBitIndex[bit] = i;
            } else if (lastSeenBitIndex[bit] !== -1) {
                furthestIndex = Math.max(furthestIndex, lastSeenBitIndex[bit]);
            }
        }

        result[i] = furthestIndex - i + 1;
    }

    return result;
};
```