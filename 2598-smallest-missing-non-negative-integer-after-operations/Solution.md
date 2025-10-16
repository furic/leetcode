# Remainder Class Greedy | 18 Lines | O(n + value) | 29ms

# Intuition
By adding or subtracting `value`, we can only change a number within its remainder class modulo `value`. For example, with value=5, the number 7 can become ..., -3, 2, 7, 12, 17, ... (all ≡ 2 mod 5). The key insight is that each number can be transformed to represent any target in its remainder class, so we should count how many numbers belong to each remainder class.

# Approach
**Remainder Class Counting with Greedy Assignment:**
- Group numbers by their remainder modulo `value`
- Greedily assign numbers to fill 0, 1, 2, 3, ... in order
- Stop when we can't fill the next required remainder class

**Step-by-Step Process:**

1. **Count Remainder Classes:**
   - Create array `remainderCounts` of size `value` to count numbers in each remainder class
   - For each number in `nums`, calculate its remainder: `((num % value) + value) % value`
   - The double modulo handles negative numbers correctly (e.g., -3 % 5 in JavaScript gives -3, but we want 2)
   - Increment the count for that remainder class

2. **Understand the Transformation:**
   - A number with remainder r can be transformed to any target with remainder r
   - For example, with value=5:
     - Number 7 (remainder 2) can become 2, 7, 12, 17, ... or -3, -8, ...
     - Number 13 (remainder 3) can become 3, 8, 13, 18, ... or -2, -7, ...
   - Each number is locked to its remainder class

3. **Greedy MEX Construction:**
   - Try to build the sequence 0, 1, 2, 3, ... as far as possible
   - For target MEX value k, we need a number with remainder (k % value)
   - Start with maxMEX = 0 and try to increment it greedily
   - At each step, check if we have a number available in the required remainder class

4. **Assignment Logic:**
   - While `remainderCounts[maxMEX % value] > 0`:
     - We have at least one number that can be transformed to `maxMEX`
     - Decrement the count (use this number)
     - Increment `maxMEX` (move to next target)
   - Stop when no number is available for the current remainder class

5. **Why Greedy Works:**
   - To maximize MEX, we want to fill 0, 1, 2, ... without gaps
   - Using numbers out of order never helps (would create a gap)
   - Each number should be used for the smallest unfilled target in its remainder class
   - This greedy strategy is optimal

**Example Walkthrough (nums = [1,-10,7,13,6,8], value = 5):**
- Remainders: 1→1, -10→0, 7→2, 13→3, 6→1, 8→3
- remainderCounts = [1, 2, 1, 2, 0]
- Build MEX:
  - MEX=0: need remainder 0, have 1 available → use it, remainderCounts = [0, 2, 1, 2, 0]
  - MEX=1: need remainder 1, have 2 available → use it, remainderCounts = [0, 1, 1, 2, 0]
  - MEX=2: need remainder 2, have 1 available → use it, remainderCounts = [0, 1, 0, 2, 0]
  - MEX=3: need remainder 3, have 2 available → use it, remainderCounts = [0, 1, 0, 1, 0]
  - MEX=4: need remainder 4, have 0 available → stop
- Return 4

# Complexity
- Time complexity: $$O(n + \text{value})$$ where n is array length - O(n) to count remainders, O(value) worst case for MEX construction
- Space complexity: $$O(\text{value})$$ for remainder count array

# Code
```typescript
const findSmallestInteger = (nums: number[], value: number): number => {
    const remainderCounts: number[] = new Array(value).fill(0);
    for (const num of nums) {
        const remainder = ((num % value) + value) % value;
        remainderCounts[remainder]++;
    }
    
    let maxMEX = 0;
    while (remainderCounts[maxMEX % value] > 0) {
        remainderCounts[maxMEX % value]--;
        maxMEX++;
    }
    
    return maxMEX;
};
```