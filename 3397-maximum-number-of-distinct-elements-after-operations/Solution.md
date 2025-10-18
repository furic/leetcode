# Greedy Sorted Assignment | 22 Lines | O(n log n) | 128ms

# Intuition
To maximize distinct elements, we should assign each number the smallest available value in its allowed range [num-k, num+k]. Processing numbers in sorted order ensures we can greedily assign values without missing opportunities for distinctness.

# Approach
**Greedy Assignment with Sorted Order:**
- Sort the array to process numbers from smallest to largest
- For each number, assign it the smallest value in its range that hasn't been used yet
- Track the previous assigned value to ensure all assignments are distinct

**Step-by-Step Process:**

1. **Sort the Array:**
   - Process numbers in ascending order
   - This ensures smaller numbers get first choice of smaller values
   - Prevents larger numbers from "blocking" optimal assignments for smaller ones

2. **Initialize Tracking:**
   - `distinctCount`: Count of successfully assigned distinct values
   - `previousValue`: The last value we assigned (initially -∞)

3. **Process Each Number Greedily:**
   - For current number `num`, allowed range is [num-k, num+k]
   - To be distinct, must assign value > previousValue
   - Find optimal value: smallest in range that's greater than previousValue

4. **Calculate Optimal Assignment:**
   - `minPossibleValue = num - k` (lowest in allowed range)
   - `mustBeGreaterThan = previousValue + 1` (smallest distinct value)
   - `maxPossibleValue = num + k` (highest in allowed range)
   - `optimalValue = min(max(minPossibleValue, mustBeGreaterThan), maxPossibleValue)`

5. **Assignment Logic:**
   - The nested min/max finds the smallest value that satisfies both constraints:
     - Must be ≥ num-k (within allowed range)
     - Must be > previousValue (distinctness)
     - Must be ≤ num+k (within allowed range)
   - If `optimalValue > previousValue`, we can make a distinct assignment
   - Update `previousValue = optimalValue` and increment count

**Why Greedy Works:**
- Sorted order ensures we never regret assigning a smaller value to an earlier number
- By always choosing the minimum valid value, we maximize room for future numbers
- If we can't assign a distinct value to current number, skipping it is optimal (no benefit to using a non-distinct value)

**Example Walkthrough (nums = [1,2,2,3,3,4], k = 2):**
- After sorting: [1,2,2,3,3,4]
- num=1: range=[-1,3], assign -1, prev=-1
- num=2: range=[0,4], must be >-1, assign 0, prev=0
- num=2: range=[0,4], must be >0, assign 1, prev=1
- num=3: range=[1,5], must be >1, assign 2, prev=2
- num=3: range=[1,5], must be >2, assign 3, prev=3
- num=4: range=[2,6], must be >3, assign 4, prev=4
- Result: 6 distinct values [-1,0,1,2,3,4]

**Edge Cases:**
- All identical numbers: Can spread them out within their ranges
- k=0: No modifications allowed, count unique values in original array
- Large gaps between numbers: Each gets its minimum value (num-k)

# Complexity
- Time complexity: $$O(n \log n)$$ for sorting
- Space complexity: $$O(1)$$ if sorting in-place, $$O(n)$$ otherwise

# Code
```typescript
const maxDistinctElements = (nums: number[], k: number): number => {
    nums.sort((a, b) => a - b);
    
    let distinctCount = 0;
    let previousValue = -Infinity;

    for (const num of nums) {
        const minPossibleValue = num - k;
        const mustBeGreaterThan = previousValue + 1;
        const maxPossibleValue = num + k;
        
        const optimalValue = Math.min(
            Math.max(minPossibleValue, mustBeGreaterThan),
            maxPossibleValue
        );

        if (optimalValue > previousValue) {
            distinctCount++;
            previousValue = optimalValue;
        }
    }

    return distinctCount;
};
```