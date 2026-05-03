# Reverse Suffix Opposite Parity Count | 7 Lines | O(n) | 1ms

# Intuition
The score of index `i` is the count of elements after it with the opposite parity. By scanning right to left and maintaining running counts of even and odd elements seen so far, each element's score is just the running count of its opposite parity at that point.

# Approach
- Maintain `parityCount[0]` (evens seen) and `parityCount[1]` (odds seen), both starting at `0`.
- Iterate from right to left. For each element:
  - Determine its parity: `parity = nums[i] & 1`.
  - Its score is the count of the opposite parity seen so far: `parityCount[1 ^ parity]`.
  - Overwrite `nums[i]` with this score (in-place).
  - Increment `parityCount[parity]`.
- Return the modified `nums`.

# Complexity
- Time complexity: $$O(n)$$ — single right-to-left pass.

- Space complexity: $$O(1)$$ — two counters, in-place modification.

# Code
```typescript []
const countOppositeParity = (nums: number[]): number[] => {
    const parityCount = [0, 0];

    for (let i = nums.length - 1; i >= 0; i--) {
        const parity = nums[i] & 1;
        nums[i] = parityCount[1 ^ parity];
        parityCount[parity]++;
    }

    return nums;
};
```