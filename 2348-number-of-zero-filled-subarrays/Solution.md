# Single Pass Counting | 13 Lines | O(n) | 7ms

# Intuition
The key insight is that when we have a consecutive sequence of zeros, the number of subarrays we can form follows a mathematical pattern. For a sequence of n consecutive zeros, we can form 1 + 2 + 3 + ... + n = n(n+1)/2 total subarrays. However, instead of calculating this formula for each sequence, we can use an incremental approach: when we extend a zero sequence by one element, we add exactly as many new subarrays as the current length of the sequence.

# Approach
I'll use a single-pass algorithm with incremental counting:

1. **Track Consecutive Zeros**: Maintain a counter for the current streak of consecutive zeros.

2. **Incremental Subarray Counting**: When we encounter a zero:
   - Increment the consecutive zero counter
   - Add the current streak length to the total count
   - This works because extending a sequence of k-1 zeros to k zeros creates exactly k new subarrays ending at the current position

3. **Reset on Non-Zero**: When we encounter a non-zero element, reset the consecutive counter to 0.

4. **Mathematical Insight**: If we have a sequence [0,0,0], the subarrays are:
   - Position 0: [0] → 1 subarray
   - Position 1: [0], [0,0] → 2 subarrays  
   - Position 2: [0], [0,0], [0,0,0] → 3 subarrays
   - Total: 1+2+3 = 6 subarrays

This incremental approach avoids the need to calculate n(n+1)/2 for each sequence.

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through the array, visiting each element exactly once
  - Each element is processed in constant time with simple arithmetic operations
  - No nested loops or recursive calls

- Space complexity: $$O(1)$$
  - Only using two variables (totalSubarrays and consecutiveZeros) regardless of input size
  - No additional data structures that scale with the input
  - All operations performed in-place

# Code
```typescript []
const zeroFilledSubarray = (nums: number[]): number => {
    let totalSubarrays = 0;
    let consecutiveZeros = 0;
    
    for (const currentNumber of nums) {
        if (currentNumber === 0) {
            consecutiveZeros++;
            
            totalSubarrays += consecutiveZeros;
        } else {
            consecutiveZeros = 0;
        }
    }
    
    return totalSubarrays;
};
```