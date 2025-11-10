# Stack-Based Operation Tracking | 25 Lines | O(n) | 14ms

# Intuition
Each operation clears the minimum value in a selected range. The key insight is that we process elements left-to-right, and when we encounter a new value that requires clearing, it must be part of a new operation. We use a stack to track which values are currently "active" (being cleared by ongoing operations), and pop values when we encounter smaller ones (they would have been cleared already).

# Approach
**Monotonic Stack with Operation Counting:**
- Maintain a stack of values from previous operations
- When encountering a value smaller than stack top, pop (those operations already cleared this position)
- When encountering a new value not yet handled, start a new operation
- Skip zeros (already cleared)

**Step-by-Step Process:**

1. **Initialize:**
   - `activeStack = []` - tracks values being cleared by active operations
   - `operationCount = 0` - counts minimum operations needed

2. **Process Each Element:**
   - For each `currentValue` in the array:

   **Clean up stack (pop larger values):**
   - While stack not empty AND top > currentValue:
     - Pop from stack
   - Why: These larger values would have been cleared by operations on smaller values
   - Example: If we cleared 2, any 3's in that range are also cleared

3. **Handle Current Value:**
   
   **Case 1: currentValue = 0**
   - Already zero, skip (no operation needed)
   
   **Case 2: Stack empty OR top < currentValue**
   - This value isn't covered by any active operation
   - Need a new operation: `operationCount++`
   - Push to stack: `activeStack.push(currentValue)`
   
   **Case 3: top = currentValue**
   - Already being cleared by active operation
   - No new operation needed
   - Don't push again (already in stack)

4. **Return Count:**
   - Total operations represents minimum needed

**Why This Works:**

**Greedy Observation:**
- Process left-to-right (natural order)
- When we see a value, either:
  1. It's covered by previous operation (on same or larger value)
  2. It needs a new operation

**Stack Invariant:**
- Stack maintains non-decreasing values
- Represents "active" values being cleared
- Larger values get popped when smaller ones appear

**Correctness:**
- Each operation clears minimum in a range
- If we cleared value v, all larger values in that range also cleared
- Stack tracks which values have active clearing operations

**Example Walkthrough (nums = [3,1,2,1]):**

**i=0, value=3:**
- Stack: []
- Stack empty → new operation needed
- count = 1, stack = [3]

**i=1, value=1:**
- Stack: [3]
- Top (3) > 1, pop: stack = []
- Stack empty → new operation needed
- count = 2, stack = [1]

**i=2, value=2:**
- Stack: [1]
- Top (1) < 2 → new operation needed
- count = 3, stack = [1, 2]

**i=3, value=1:**
- Stack: [1, 2]
- Top (2) > 1, pop: stack = [1]
- Top (1) = 1 → already covered
- count = 3, stack = [1]

**Result:** 3 ✓

**Verification:**
- Op 1: Clear 1 in [1,3] → [3,0,2,0]
- Op 2: Clear 2 in [2,2] → [3,0,0,0]
- Op 3: Clear 3 in [0,0] → [0,0,0,0]

**Example 2 (nums = [1,2,1,2,1,2]):**

**Process:**
- i=0, val=1: new op, count=1, stack=[1]
- i=1, val=2: 2>1, new op, count=2, stack=[1,2]
- i=2, val=1: pop 2, top=1, covered, count=2, stack=[1]
- i=3, val=2: 2>1, new op, count=3, stack=[1,2]
- i=4, val=1: pop 2, top=1, covered, count=3, stack=[1]
- i=5, val=2: 2>1, new op, count=4, stack=[1,2]

**Result:** 4 ✓

**Key Insights:**

**Why Pop Larger Values:**
- If we see value 1 after value 3:
- To clear 1, we'd select a range containing it
- In that range, 1 is minimum
- Any 3 in that range gets cleared too
- So the "3 operation" is superseded

**Monotonic Stack:**
- Maintains non-decreasing order
- Bottom = smallest value seen (still active)
- Top = most recent value needing clearing

**Greedy Optimality:**
- Process left-to-right (must process in order)
- Each new uncovered value needs exactly one operation
- Can't do better (each distinct value phase needs ≥1 operation)

**Edge Cases:**

**All zeros:**
- nums = [0,0,0]
- All skipped
- Result: 0 ✓

**All same value:**
- nums = [2,2,2]
- First 2: new operation
- Rest: covered
- Result: 1 ✓

**Strictly increasing:**
- nums = [1,2,3,4]
- Each needs new operation
- Result: 4 ✓

**Strictly decreasing:**
- nums = [4,3,2,1]
- Each pops previous, needs new operation
- Result: 4 ✓

**Alternating:**
- nums = [1,2,1,2]
- Depends on pattern
- Our algorithm handles correctly

**Mountain:**
- nums = [1,2,3,2,1]
- Increases then decreases
- Operations for increasing part, covered on decrease

**Alternative Approaches:**

**Simulation:**
```typescript
// Actually perform operations, track count
while (nums.some(x => x > 0)) {
    const min = Math.min(...nums.filter(x => x > 0));
    // Clear min, count++
}
```
- Complex to implement correctly
- Potentially O(n²) or worse

**Dynamic Programming:**
- Not obviously applicable
- Our greedy approach is optimal

**Sorting-based:**
- Loses position information
- Position matters for range operations

# Complexity
- Time complexity: $$O(n)$$ - single pass, each element pushed/popped at most once
- Space complexity: $$O(n)$$ - stack can store up to n elements in worst case (strictly increasing)

# Code
```typescript
const minOperations = (nums: number[]): number => {
    const activeStack: number[] = [];
    let operationCount = 0;

    for (const currentValue of nums) {
        while (activeStack.length > 0 && activeStack[activeStack.length - 1] > currentValue) {
            activeStack.pop();
        }

        if (currentValue === 0) {
            continue;
        }

        if (activeStack.length === 0 || activeStack[activeStack.length - 1] < currentValue) {
            operationCount++;
            activeStack.push(currentValue);
        }
    }

    return operationCount;
};
```