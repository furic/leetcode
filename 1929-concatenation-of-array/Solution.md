# Spread Operator Concatenation | 1 Line | O(n) | 0ms

# Intuition

The problem asks us to create a new array that is simply the original array concatenated with itself - the first half is `nums`, and the second half is another copy of `nums`. Using JavaScript's spread operator provides the most concise and readable way to achieve this concatenation.

# Approach

**Core Strategy:**
- Use the spread operator (`...`) to unpack the array elements
- Create a new array containing all elements of `nums` twice in sequence
- The spread operator handles copying all elements efficiently

**Step-by-Step Process:**

**1. Understand the Pattern:**
- Given: `nums = [a, b, c]`
- Required: `ans = [a, b, c, a, b, c]`
- Pattern: First copy followed by second copy of the same array

**2. Use Spread Operator Syntax:**
- `[...nums, ...nums]` creates a new array
- First `...nums` expands to all elements of nums in order
- Second `...nums` expands to all elements again
- The array literal combines them into a single contiguous array

**3. How Spread Operator Works:**
- `...nums` unpacks the array into individual elements
- Inside array literal `[...]`, these elements are collected into a new array
- Example: `[...[1,2], ...[3,4]]` becomes `[1,2,3,4]`

**4. Why This is Optimal:**
- Concise: Single expression, one line of code
- Readable: Clearly shows the intention of concatenation
- Efficient: Spread operator is optimized in modern JavaScript engines
- No loops needed: The spread operator handles iteration internally

**Alternative Approaches (Not Used):**

**Manual Loop:**
```typescript
const result = new Array(2 * nums.length);
for (let i = 0; i < nums.length; i++) {
    result[i] = nums[i];
    result[i + nums.length] = nums[i];
}
return result;
```
- More verbose, harder to read
- Same time complexity but more code

**Array.concat():**
```typescript
return nums.concat(nums);
```
- Also valid and concise
- Slightly less modern than spread operator
- Functionally equivalent

**Array.from() with mapping:**
```typescript
return Array.from({length: 2 * nums.length}, (_, i) => nums[i % nums.length]);
```
- Overly complex for this simple task
- Uses modulo operation unnecessarily

**5. Example Walkthrough (nums = [1,2,1]):**

**Spread operation:**
- First `...nums` expands: 1, 2, 1
- Second `...nums` expands: 1, 2, 1
- Combined in array literal: [1, 2, 1, 1, 2, 1]

**Result:** `[1,2,1,1,2,1]` ✓

**6. Example Walkthrough (nums = [1,3,2,1]):**

**Spread operation:**
- First `...nums`: 1, 3, 2, 1
- Second `...nums`: 1, 3, 2, 1
- Combined: [1, 3, 2, 1, 1, 3, 2, 1]

**Result:** `[1,3,2,1,1,3,2,1]` ✓

**7. Memory Considerations:**

**Shallow Copy:**
- Spread operator creates a shallow copy
- For primitive values (numbers), this is a true copy
- For objects, would copy references (not applicable here since nums contains integers)

**New Array Creation:**
- Creates a completely new array in memory
- Original `nums` array remains unchanged
- Result has length 2n with independent memory allocation

**8. Edge Cases Handled:**

**Empty array:**
- `nums = []`
- `[...[], ...[]]` = `[]`
- Returns empty array ✓

**Single element:**
- `nums = [5]`
- `[...5], ...[5]]` = `[5, 5]`
- Correctly doubles single element ✓

**Large arrays:**
- Spread operator handles arrays of any size
- No special logic needed
- JavaScript engine optimizes internally

**9. Browser Compatibility:**

**Modern JavaScript:**
- Spread operator introduced in ES6 (ES2015)
- Supported in all modern browsers
- TypeScript transpiles if targeting older environments

**10. Performance Notes:**

**Time Efficiency:**
- Must iterate through all n elements twice to create 2n element array
- Unavoidable - must copy each element twice
- Spread operator is optimized at engine level

**Space Efficiency:**
- Must allocate new array of size 2n
- Cannot be done in-place (need twice the space)
- Optimal for this problem's requirements

# Complexity

- Time complexity: $$O(n)$$
  - n = length of input array nums
  - Spread operator must iterate through all n elements twice
  - Total elements in result: 2n
  - Linear operation: O(n + n) = O(n)
  - Each element copied once per occurrence

- Space complexity: $$O(n)$$
  - Result array has length 2n = O(n)
  - No additional auxiliary space needed
  - Input array not modified (immutable operation)
  - Overall space: O(n) for output array

# Code
```typescript []
const getConcatenation = (nums: number[]): number[] => [...nums, ...nums];
```