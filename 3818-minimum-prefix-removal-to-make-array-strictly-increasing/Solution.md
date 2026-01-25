# Backward Scan for Longest Suffix | 13 Lines | O(n) | 1ms

# Intuition

To minimize the prefix removal, maximize the strictly increasing suffix. Scan backward from the end to find the longest strictly increasing sequence, then remove everything before it.

# Approach

**Backward Scan:**
1. Start from second-to-last element
2. Scan backward while nums[i] < nums[i+1] (strictly increasing)
3. Stop at first violation (nums[i] ≥ nums[i+1])
4. Suffix length = elements that satisfy condition
5. Prefix to remove = n - suffix length

**Why Backward:**
- Suffix must be strictly increasing
- Scanning backward finds longest such suffix
- Greedy: keep as much as possible from end

**Example: nums=[1,-1,2,3,3,4,5]**

Backward scan:
- i=5: 4<5 ✓, suffix=2
- i=4: 3<4 ✓, suffix=3
- i=3: 3≥3 ✗, stop

Suffix: [3,4,5] (length 3)
Prefix to remove: 7-3=4 ✓

**Example: nums=[1,2,3,4]**

Backward scan:
- i=2: 3<4 ✓
- i=1: 2<3 ✓
- i=0: 1<2 ✓
- i=-1: stop

Suffix: entire array (length 4)
Prefix to remove: 4-4=0 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single backward pass
  - Constant work per element
  - Overall: O(n)

- Space complexity: $$O(1)$$
  - Only counter variable
  - No additional data structures

# Code
```typescript []
const minimumPrefixLength = (nums: number[]): number => {
    let strictlyIncreasingSuffixLength = 1;
    
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] >= nums[i + 1]) {
            break;
        }
        strictlyIncreasingSuffixLength++;
    }
    
    return nums.length - strictlyIncreasingSuffixLength;
};
```