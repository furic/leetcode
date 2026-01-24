# Sort and Two-Pointer Pairing | 11 Lines | O(n log n) | 251ms

# Intuition

To minimize the maximum pair sum, avoid pairing two large numbers together. Sort the array and pair the smallest with the largest, second smallest with second largest, etc. This balances pair sums optimally.

# Approach

**Greedy Strategy:**
1. Sort array in ascending order
2. Use two pointers: one at start, one at end
3. Pair nums[i] with nums[n-1-i]
4. Track maximum pair sum

**Why This Works:**
- Pairing smallest with largest prevents any pair from being too large
- If we paired two large numbers, their sum would dominate
- This greedy choice minimizes the maximum sum

**Example: nums=[3,5,2,3]**

Sort: [2,3,3,5]

Pairs:
- i=0: pair 2 with 5 → sum=7
- i=1: pair 3 with 3 → sum=6

Maximum: 7 ✓

**Proof Sketch:**
- Let sorted array be [a₁, a₂, ..., aₙ]
- Pairing (a₁,aₙ), (a₂,aₙ₋₁), ... gives max sum ≤ a₁+aₙ or a₂+aₙ₋₁...
- Any other pairing would create a larger sum (e.g., aₙ₋₁+aₙ > a₁+aₙ)

# Complexity

- Time complexity: $$O(n \log n)$$
  - Sort: O(n log n)
  - Pairing: O(n/2) = O(n)
  - Overall: O(n log n)

- Space complexity: $$O(1)$$
  - In-place sort (typically)
  - Only scalar variables
  - Overall: O(1) auxiliary space

# Code
```typescript []
const minPairSum = (nums: number[]): number => {
    nums.sort((a, b) => a - b);
    
    const arrayLength = nums.length;
    let minMaxPairSum = 0;
    
    for (let pairIndex = 0; pairIndex < arrayLength / 2; pairIndex++) {
        const smallValue = nums[pairIndex];
        const largeValue = nums[arrayLength - pairIndex - 1];
        const pairSum = smallValue + largeValue;
        
        minMaxPairSum = Math.max(minMaxPairSum, pairSum);
    }
    
    return minMaxPairSum;
};
```