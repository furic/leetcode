# Bit-Filtered LIS | 35 Lines | O(30 × n log n) | 837ms

# Intuition

For a subsequence to have non-zero AND, at least one bit position must be set in all elements. For each bit position, filter numbers with that bit set and find LIS. The maximum LIS across all bit positions is the answer.

# Approach

**Key Insight:**
- AND of numbers is non-zero ⟺ at least one bit is 1 in all numbers
- If we fix a bit that must be set, we can filter and find LIS

**Algorithm:**
1. For each bit position (0 to 29, covering 32-bit integers):
   - Filter numbers with this bit set
   - Find LIS in filtered array
   - Track maximum LIS length
2. Return maximum across all bit positions

**LIS Algorithm:**
- Use patience sorting with binary search
- Maintain array of smallest tail values for each length
- O(n log n) per bit position

**Why This Works:**
- Any valid subsequence with non-zero AND must have all elements share at least one bit
- By trying all possible shared bits, we find the optimal subsequence

**Example: nums=[5,4,7]**

Binary: 5=101, 4=100, 7=111

Bit 0 (rightmost): filter={5,7} → LIS=[5,7] length=2 ✓
Bit 1: filter={} → length=0
Bit 2: filter={5,4,7} → LIS=[4,7] length=2

Maximum: 2 ✓

# Complexity

- Time complexity: $$O(30 \times n \log n)$$
  - 30 bit positions
  - Per bit: filter O(n) + LIS O(n log n)
  - Overall: O(30n log n) = O(n log n)

- Space complexity: $$O(n)$$
  - Filtered array: O(n)
  - LIS tails array: O(n)
  - Overall: O(n)

# Code
```typescript []
const longestSubsequence = (nums: number[]): number => {
    let maxLen = 0;
    
    for (let bit = 0; bit < 30; bit++) {
        const mask = 1 << bit;
        
        const filtered: number[] = [];
        for (const num of nums) {
            if ((num & mask) !== 0) {
                filtered.push(num);
            }
        }
        
        if (filtered.length === 0) continue;
        
        const lis = findLIS(filtered);
        maxLen = Math.max(maxLen, lis);
    }
    
    return maxLen;
};

const findLIS = (arr: number[]): number => {
    const tails: number[] = [];
    
    for (const num of arr) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        if (left === tails.length) {
            tails.push(num);
        } else {
            tails[left] = num;
        }
    }
    
    return tails.length;
};
```