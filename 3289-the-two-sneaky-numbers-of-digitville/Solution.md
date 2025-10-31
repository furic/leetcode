# Set-Based Duplicate Detection | 18 Lines | O(n) |

# Intuition
We need to find two numbers that appear twice in an array where all other numbers appear exactly once. A hash set provides O(1) lookup to detect when we encounter a number we've already seen, making it perfect for tracking duplicates.

# Approach
**Single Pass with Set Tracking:**
- Use a Set to track numbers we've encountered
- When we see a number already in the Set, it's a duplicate (sneaky number)
- Collect duplicates in a result array
- Stop when we've found both (or finish the array)

**Step-by-Step Process:**

1. **Initialize Data Structures:**
   - `seenNumbers = new Set()` - tracks numbers encountered so far
   - `duplicates = []` - collects the two sneaky numbers

2. **Process Each Number:**
   - For each `currentNumber` in the array:
   
   **If in Set (seen before):**
   - This is a duplicate occurrence
   - Add to `duplicates` array
   - This is a sneaky number!
   
   **If not in Set (first occurrence):**
   - Add to Set for future lookup
   - Continue processing

3. **Return Result:**
   - After finding both duplicates, return the array
   - Order doesn't matter per problem statement

**Why This Works:**

**Set Properties:**
- O(1) average lookup time
- O(1) insertion time
- Efficiently tracks seen numbers without duplicates

**Single Pass Sufficiency:**
- We're guaranteed exactly 2 duplicates
- First occurrence of each goes into Set
- Second occurrence triggers duplicate detection
- No need to continue after finding both (though we process entire array)

**Example Walkthrough (nums = [0,3,2,1,3,2]):**

**Initial:** seenNumbers = {}, duplicates = []

**i=0, num=0:**
- Not in Set
- Add 0 → seenNumbers = {0}

**i=1, num=3:**
- Not in Set
- Add 3 → seenNumbers = {0,3}

**i=2, num=2:**
- Not in Set
- Add 2 → seenNumbers = {0,3,2}

**i=3, num=1:**
- Not in Set
- Add 1 → seenNumbers = {0,3,2,1}

**i=4, num=3:**
- In Set! (duplicate)
- duplicates = [3]

**i=5, num=2:**
- In Set! (duplicate)
- duplicates = [3,2]

**Result:** [3,2] (or [2,3], order doesn't matter) ✓

**Example 2 (nums = [7,1,5,4,3,4,6,0,9,5,8,2]):**

- Process: 7,1,5,4,3 added to Set
- At index 5, num=4 → duplicate! duplicates=[4]
- Continue: 6,0,9 added to Set
- At index 9, num=5 → duplicate! duplicates=[4,5]

**Result:** [4,5] ✓

**Key Insights:**

**Why Set Over Array:**
- Array.includes(): O(n) lookup → O(n²) total
- Set.has(): O(1) lookup → O(n) total
- Significant performance difference for larger inputs

**Early Termination Possibility:**
```typescript
if (duplicates.length === 2) break;
```
- Could exit early after finding both
- Minor optimization, doesn't change complexity
- Not included for code clarity

**Problem Guarantees:**
- Exactly 2 numbers appear twice
- All others appear once
- Array length = n + 2 (n unique + 2 duplicates)
- Numbers in range [0, n-1]

**Alternative Approaches:**

**Sorting:**
```typescript
nums.sort((a,b) => a-b);
// Find consecutive duplicates
```
- Time: O(n log n)
- Space: O(1) if in-place
- Slower than Set approach

**Frequency Map:**
```typescript
const freq = new Map();
// Count all, then filter freq == 2
```
- Time: O(n)
- Space: O(n)
- Two passes vs one pass

**XOR (Mathematical):**
- Complex for this problem
- Works better when finding single duplicate
- Requires additional constraints

**Edge Cases:**

**Minimum size (n=2):**
- nums = [0,1,1,0]
- Both numbers duplicate
- Result: [0,1] or [1,0]

**Duplicates far apart:**
- nums = [0,1,2,3,1,4,5,3]
- Set tracking handles any spacing

**Duplicates at end:**
- Still found correctly
- Order in result doesn't matter

**Both same duplicates (not per problem):**
- If nums = [1,1,1], Set would catch both occurrences
- Problem guarantees two different sneaky numbers

# Complexity
- Time complexity: $$O(n)$$ - single pass with O(1) operations per element
- Space complexity: $$O(n)$$ - Set can contain up to n unique numbers

# Code
```typescript
const getSneakyNumbers = (nums: number[]): number[] => {
    const seenNumbers = new Set<number>();
    const duplicates: number[] = [];
    
    for (let index = 0; index < nums.length; index++) {
        const currentNumber = nums[index];
        
        if (seenNumbers.has(currentNumber)) {
            duplicates.push(currentNumber);
        } else {
            seenNumbers.add(currentNumber);
        }
    }
    
    return duplicates;
};
```