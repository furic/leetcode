# XOR Property Analysis | 11 Lines | O(n) | 2ms

# Intuition
The XOR operation has a special property: any value XORed with itself equals 0. This means if we XOR all elements and get 0, we're combining pairs that cancel out. To maximize subsequence length with non-zero XOR, we should leverage the fact that removing just one element might break this cancellation.

# Approach
**Step 1: Calculate Total XOR**
- Compute the XOR of all elements in the array
- This tells us what happens when we include everything

**Step 2: Analyze the Result**
- If total XOR ≠ 0: The entire array already has non-zero XOR, so return the full length
- If total XOR = 0: All elements together cancel out to zero

**Step 3: Handle Zero XOR Case**
- When total XOR is 0, we need to exclude at least one element
- Check if any element is non-zero:
  - If yes: Removing one non-zero element leaves the rest with non-zero XOR (length - 1)
  - If no: All elements are 0, any subsequence XORs to 0, so return 0

**Why This Works:**
- XOR has the property: a ⊕ a = 0 and a ⊕ 0 = a
- If all elements XOR to 0, removing any non-zero element breaks the cancellation
- If all elements are 0, no subsequence can have non-zero XOR

# Complexity
- Time complexity: $$O(n)$$ for iterating through the array
- Space complexity: $$O(1)$$

# Code
```typescript
const longestSubsequence = (nums: number[]): number => {
    let totalXor = 0;
    for (const num of nums) {
        totalXor ^= num;
    }
    
    if (totalXor !== 0) {
        return nums.length;
    }
    
    const hasNonZero = nums.some(num => num !== 0);
    return hasNonZero ? nums.length - 1 : 0;
};
```