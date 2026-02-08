# Stack with Backward Merging | 16 Lines | O(n) | 23ms

# Intuition

Use a stack to process elements left-to-right. When adding an element, check if it equals the stack top. If so, merge by doubling the top and removing the new element. Repeat until no more merges possible.

# Approach

**Stack-Based Merging:**
1. Process each element left-to-right
2. Push element onto stack
3. While top two elements are equal:
   - Merge: double the second-to-top (sum of two equal values)
   - Pop the top
4. Return remaining stack

**Why Stack Works:**
- Maintains processed elements in order
- Allows efficient backward checking for merges
- Each element processed once, merged at most log(max_value) times

**Example: nums=[3,1,1,2]**

Process:
- Push 3: stack=[3]
- Push 1: stack=[3,1]
- Push 1: stack=[3,1,1] → merge → stack=[3,2]
- Push 2: stack=[3,2,2] → merge → stack=[3,4]

Result: [3,4] ✓

**Example: nums=[2,2,4]**

Process:
- Push 2: stack=[2]
- Push 2: stack=[2,2] → merge → stack=[4]
- Push 4: stack=[4,4] → merge → stack=[8]

Result: [8] ✓

# Complexity

- Time complexity: $$O(n \log V)$$
  - n = array length, V = max value
  - Each element pushed once: O(n)
  - Each element merged at most log(V) times
  - Overall: O(n log V)

- Space complexity: $$O(n)$$
  - Stack: O(n) worst case
  - No merges occur

# Code
```typescript []
const mergeAdjacent = (nums: number[]): number[] => {
    const arrayLength = nums.length;
    const stack = new Array<number>(arrayLength);
    let stackSize = 0;
    
    for (let i = 0; i < arrayLength; i++) {
        const currentValue = nums[i];
        stack[stackSize++] = currentValue;
        
        for (; stackSize >= 2 && stack[stackSize - 1] === stack[stackSize - 2];) {
            stack[stackSize - 2] *= 2;
            stackSize--;
        }
    }
    
    return stack.slice(0, stackSize);
};
```