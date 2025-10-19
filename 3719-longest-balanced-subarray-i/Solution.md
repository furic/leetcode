# Nested Loop with Sets | 24 Lines | O(n²) | 267ms

# Intuition
We need to find the longest subarray where the count of distinct even numbers equals the count of distinct odd numbers. By checking all possible subarrays and tracking distinct values using sets, we can identify when the balance condition is met.

# Approach
**Nested Loop with Set Tracking:**
- Use two nested loops to generate all possible subarrays
- Maintain separate sets for distinct even and odd numbers
- Check the balance condition after adding each element
- Track the maximum length found

**Step-by-Step Process:**

1. **Outer Loop (Starting Position):**
   - Iterate through each possible starting index i
   - For each start, initialize empty sets for evens and odds

2. **Inner Loop (Ending Position):**
   - Extend from position i to each possible ending position j
   - This generates all subarrays starting at i: [i], [i,i+1], [i,i+1,i+2], ...

3. **Track Distinct Values:**
   - For each new element nums[j]:
     - Check parity using modulo: `nums[j] % 2`
     - If even (remainder 0), add to `evens` set
     - If odd (remainder 1), add to `odds` set
   - Sets automatically handle duplicates, giving us distinct counts

4. **Check Balance Condition:**
   - After adding each element, compare set sizes
   - If `evens.size === odds.size`, the subarray is balanced
   - Update `maxLength` if current length (j - i + 1) is larger

5. **Continue Until All Subarrays Checked:**
   - Inner loop ensures we check all subarrays ending at each position
   - Outer loop ensures we start from every possible position

**Why This Works:**
- Sets efficiently track distinct values (O(1) add and size operations)
- Nested loops guarantee we examine every possible subarray
- Checking balance at each step captures all valid configurations
- Taking maximum ensures we find the longest balanced subarray

**Example Walkthrough (nums = [2,5,4,3]):**
- i=0, j=0: [2] → evens={2}, odds={} → 1≠0
- i=0, j=1: [2,5] → evens={2}, odds={5} → 1=1 ✓ length=2
- i=0, j=2: [2,5,4] → evens={2,4}, odds={5} → 2≠1
- i=0, j=3: [2,5,4,3] → evens={2,4}, odds={5,3} → 2=2 ✓ length=4
- Continue for other starting positions...
- Maximum found: 4

**Optimization Note:**
- This O(n²) solution works well for moderate input sizes
- For very large arrays, more complex approaches using hashmaps might be needed
- The set-based approach keeps the code clean and understandable

# Complexity
- Time complexity: $$O(n^2)$$ - nested loops check all subarrays
- Space complexity: $$O(n)$$ - sets can contain at most n distinct values in worst case

# Code
```typescript
const longestBalanced = (nums: number[]): number => {
    let maxLength = 0;
    
    for (let i = 0; i < nums.length; i++) {
        const evens = new Set<number>();
        const odds = new Set<number>();
        
        for (let j = i; j < nums.length; j++) {
            if (nums[j] % 2 === 0) {
                evens.add(nums[j]);
            } else {
                odds.add(nums[j]);
            }
            
            if (evens.size === odds.size) {
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }
    
    return maxLength;
}
```