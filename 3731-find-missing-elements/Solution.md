# Range Generation with Set Filtering | 10 Lines | O(n) | 5ms

# Intuition
We need to find all integers missing from a range defined by the minimum and maximum values in the array. By generating the complete range and checking which numbers don't exist in the original array using a Set, we can efficiently identify the missing elements.

# Approach
**Set-Based Range Comparison:**
- Find the min and max values to define the expected range
- Convert array to Set for O(1) membership testing
- Generate complete range and filter out existing numbers
- Return the filtered list of missing numbers

**Step-by-Step Process:**

1. **Determine Range Boundaries:**
   - `rangeStart = Math.min(...nums)` - smallest value in array
   - `rangeEnd = Math.max(...nums)` - largest value in array
   - These define the complete range [rangeStart, rangeEnd]

2. **Build Lookup Structure:**
   - `existingNumbers = new Set(nums)`
   - Enables O(1) membership checks
   - Trade O(n) space for efficient lookups

3. **Generate Complete Range:**
   - Create array from rangeStart to rangeEnd (inclusive)
   - Length: `rangeEnd - rangeStart + 1`
   - Values: `rangeStart + index` for each index

4. **Filter Missing Numbers:**
   - For each number in complete range:
     - Check if `!existingNumbers.has(number)`
     - Keep numbers not in original array
   - Return filtered array (automatically sorted)

5. **Return Result:**
   - If all numbers present: returns empty array
   - Otherwise: returns sorted list of missing numbers

**Why This Works:**

**Set Efficiency:**
- Without Set: O(n) linear search per number → O(n × range) total
- With Set: O(1) lookup per number → O(n + range) total
- Critical for large ranges

**Range Generation:**
- `Array.from()` with length and mapping function
- Creates consecutive integers efficiently
- Naturally sorted (ascending order)

**Example Walkthrough (nums = [1,4,2,5]):**

**Step 1: Find boundaries**
- rangeStart = min(1,4,2,5) = 1
- rangeEnd = max(1,4,2,5) = 5

**Step 2: Build Set**
- existingNumbers = {1, 4, 2, 5}

**Step 3: Generate complete range**
- length = 5 - 1 + 1 = 5
- range = [1, 2, 3, 4, 5]

**Step 4: Filter**
- 1: in Set? Yes → skip
- 2: in Set? Yes → skip
- 3: in Set? No → keep ✓
- 4: in Set? Yes → skip
- 5: in Set? Yes → skip

**Result:** [3] ✓

**Example 2 (nums = [7,8,6,9]):**

- Range: [6, 7, 8, 9]
- existingNumbers = {7, 8, 6, 9}
- All numbers in range are present
- Result: [] ✓

**Example 3 (nums = [5,1]):**

- Range: [1, 2, 3, 4, 5]
- existingNumbers = {5, 1}
- Missing: 2, 3, 4
- Result: [2, 3, 4] ✓

**Key Insights:**

**Natural Sorting:**
- Generated range is inherently sorted
- No need for additional sorting step
- Maintains ascending order throughout

**Edge Cases:**

**Consecutive numbers (no gaps):**
- nums = [1,2,3,4]
- Result: []

**Single element:**
- nums = [5]
- Range: [5]
- Result: []

**Two elements (far apart):**
- nums = [1,10]
- Range: [1,2,3,4,5,6,7,8,9,10]
- Result: [2,3,4,5,6,7,8,9]

**Negative numbers:**
- nums = [-3,0,-1]
- Range: [-3,-2,-1,0]
- Result: [-2]

**Large gaps:**
- Algorithm handles any range size
- Time proportional to range, not gap size

**Alternative Approaches:**

**Sort and scan:**
```typescript
nums.sort((a,b) => a-b);
const missing = [];
for (let i = nums[0]; i <= nums[nums.length-1]; i++) {
    if (!nums.includes(i)) missing.push(i);
}
```
- O(n log n) for sort
- O(n²) for includes checks
- Less efficient

**Counting approach:**
```typescript
const count = new Map();
// Count occurrences, then check range
```
- Similar to Set approach
- No significant advantage

**Arithmetic formula:**
- If range has pattern, could use sum formulas
- Not applicable here (arbitrary range)

**Optimization Considerations:**

**Memory:**
- Generating full range: O(range) space
- For large ranges, could iterate instead:
```typescript
const missing = [];
for (let i = rangeStart; i <= rangeEnd; i++) {
    if (!existingNumbers.has(i)) missing.push(i);
}
```
- Same complexity, more explicit

**Early termination:**
- Can't optimize much
- Must check entire range
- Set lookup is already optimal

# Complexity
- Time complexity: $$O(n)$$ where n is array length - O(n) to find min/max, O(n) to build Set, O(range) to generate and filter, but range ≤ n in worst case
- Space complexity: $$O(n)$$ for the Set and result array

# Code
```typescript
const findMissingElements = (nums: number[]): number[] => {
    const rangeStart = Math.min(...nums);
    const rangeEnd = Math.max(...nums);
    const existingNumbers = new Set(nums);
    
    return Array.from(
        { length: rangeEnd - rangeStart + 1 }, 
        (_, index) => rangeStart + index
    ).filter(number => !existingNumbers.has(number));
};
```