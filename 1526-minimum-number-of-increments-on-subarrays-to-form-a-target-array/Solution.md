# Greedy Increment Tracking | 16 Lines | O(n) | 2ms

# Intuition
We need to increment subarrays to reach target values. The key insight is that we can "reuse" operations when values decrease or stay the same, because a subarray operation that raises an earlier position also affects later positions. We only need additional operations when a value increases beyond its predecessor.

# Approach
**Differential Cost Analysis:**
- Track the "height" as we traverse the array
- When height increases, we need new operations for the additional levels
- When height decreases, we can stop some ongoing operations (no extra cost)
- Count only the net increases across all positions

**Step-by-Step Process:**

1. **Initialize with First Element:**
   - Start with `totalOperations = target[0]`
   - We need at least this many operations to reach the first height
   - These operations can extend rightward if beneficial

2. **Process Each Subsequent Element:**
   - Compare current height with previous: `diff = target[i] - target[i-1]`
   
   **If diff > 0 (height increase):**
   - Need `diff` additional operations to reach this new height
   - These new operations start at position i and extend right
   - Add `diff` to total operations
   
   **If diff ≤ 0 (height decrease or same):**
   - Can "drop" some of the ongoing operations
   - No additional cost required
   - Don't add anything to total

3. **Return Total:**
   - Sum of all height increases gives minimum operations

**Why This Works:**

**Greedy Observation:**
- Operations can cover contiguous subarrays
- When building left-to-right, extending existing operations is free
- Only need new operations when height increases

**Visual Intuition (target = [1,2,3,2,1]):**
```
Height visualization:
     3
   2 2
 1 1 1 1
[1,2,3,2,1]

Operations needed:
- Level 1: covers positions [0,1,2,3,4] → 1 operation
- Level 2: covers positions [1,2,3] → 1 operation  
- Level 3: covers position [2] → 1 operation
Total: 3 operations
```

**Differential View:**
- target[0] = 1, add 1 (start at height 1)
- target[1] - target[0] = 2-1 = 1, add 1 (increase to height 2)
- target[2] - target[1] = 3-2 = 1, add 1 (increase to height 3)
- target[3] - target[2] = 2-3 = -1, add 0 (decrease, reuse existing)
- target[4] - target[3] = 1-2 = -1, add 0 (decrease, reuse existing)
- Total: 1 + 1 + 1 = 3 ✓

**Example Walkthrough (target = [3,1,5,4,2]):**

- Start: totalOperations = 3 (reach height 3)
- i=1: 1-3 = -2 (decrease), add 0 → total = 3
- i=2: 5-1 = 4 (increase), add 4 → total = 7
- i=3: 4-5 = -1 (decrease), add 0 → total = 7
- i=4: 2-4 = -2 (decrease), add 0 → total = 7

**Result:** 7 ✓

**Mathematical Proof:**

**Claim:** Minimum operations = target[0] + Σ max(0, target[i] - target[i-1])

**Proof:**
- Each operation covers a contiguous subarray
- Building optimally left-to-right means extending operations maximally
- When height increases, must start new operations for extra levels
- When height decreases, can terminate some operations (free)
- This greedy strategy is optimal because it maximizes operation reuse

**Alternative View - Operation Layers:**
- Think of operations as horizontal layers in a bar chart
- Each layer is a contiguous subarray of 1's
- Height increases require new layers
- Height decreases allow layers to end naturally

**Example 2 (target = [3,1,1,2]):**
```
Visualization:
3
2     2
1 1 1 1

Operations:
- Layer 1: [0,1,2,3] → 1 op
- Layer 2: [0,3] (discontinuous, need 2 ops) → 2 ops
- Layer 3: [0] → 1 op
```

Wait, this seems wrong. Let me recalculate:
- target[0] = 3, add 3 → total = 3
- target[1] - target[0] = 1-3 = -2, add 0 → total = 3
- target[2] - target[1] = 1-1 = 0, add 0 → total = 3
- target[3] - target[2] = 2-1 = 1, add 1 → total = 4

**Result:** 4 ✓

**Edge Cases:**

**Monotonic increasing:**
- target = [1,2,3,4]
- Result = 1 + 1 + 1 + 1 = 4
- Each step requires one more operation

**Monotonic decreasing:**
- target = [4,3,2,1]
- Result = 4 (only initial height matters)
- All subsequent decreases are free

**All same values:**
- target = [3,3,3,3]
- Result = 3 (one set of operations covers all)

**Single element:**
- target = [5]
- Result = 5

# Complexity
- Time complexity: $$O(n)$$ - single pass through array
- Space complexity: $$O(1)$$ - only using a counter variable

# Code
```typescript
const minNumberOperations = (target: number[]): number => {
    let totalOperations = target[0];

    for (let index = 1; index < target.length; index++) {
        const heightIncrease = target[index] - target[index - 1];
        
        if (heightIncrease > 0) {
            totalOperations += heightIncrease;
        }
    }

    return totalOperations;
};
```