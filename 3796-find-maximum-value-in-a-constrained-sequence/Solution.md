# Greedy Constraint Propagation | 29 Lines | O(n²) | 9ms

# Intuition

We want to maximize values while respecting: (1) difference constraints between adjacent elements, and (2) hard upper bounds at specific positions. Start by setting values as high as possible, apply restrictions, then propagate constraints both forward and backward to ensure all conditions are met.

# Approach

**Initialization:**
- Set a[0] = 0 (required)
- Set all other positions to infinity (maximize greedily)

**Apply Restrictions:**
- For each restriction [idx, maxVal], set a[idx] = maxVal
- These are hard upper bounds that cannot be exceeded

**Forward Propagation:**
- For each position i from 1 to n-1:
- Limit a[i] by previous value + allowed difference: `a[i] = min(a[i], a[i-1] + diff[i-1])`
- This ensures |a[i] - a[i-1]| ≤ diff[i-1]

**Backward Adjustment:**
- After setting a[i], check if previous values violate constraints
- If a[i-1] - a[i] > diff[i-1], reduce a[i-1] to satisfy constraint
- Continue backward while violations exist
- This handles cases where restrictions create low values that affect earlier positions

**Example: n=10, restrictions=[[3,1],[8,1]], diff=[2,2,3,1,4,5,1,1,2]**

After init & restrictions: [0, ∞, ∞, 1, ∞, ∞, ∞, ∞, 1, ∞]

Forward propagation:
- i=1: a[1]=min(∞, 0+2)=2
- i=2: a[2]=min(∞, 2+2)=4
- i=3: a[3]=min(1, 4+3)=1 (restriction wins)
- i=4: a[4]=min(∞, 1+1)=2
- i=5: a[5]=min(∞, 2+4)=6
- i=6: a[6]=min(∞, 6+5)=11
- i=7: a[7]=min(∞, 11+1)=12
- i=8: a[8]=min(1, 12+1)=1 (restriction)
- i=9: a[9]=min(∞, 1+2)=3

With backward adjustments at each step, final: [0,2,4,1,2,6,2,1,1,3]
Maximum: 6 ✓

# Complexity

- Time complexity: $$O(n^2)$$
  - Forward pass: O(n)
  - Backward adjustment: O(n) per position in worst case
  - Overall: O(n²) when many backward propagations occur

- Space complexity: $$O(n)$$
  - Reusable global array: O(1) amortized per call
  - No additional data structures

# Code
```typescript []
const globalSequence = new Int32Array(1e5);

const findMaxVal = (
    n: number,
    restrictions: number[][],
    diff: number[]
): number => {
    globalSequence.fill(1e9, 1, n);
    globalSequence[0] = 0;
    
    for (const [position, maxAllowedValue] of restrictions) {
        globalSequence[position] = maxAllowedValue;
    }
    
    for (let currentIndex = 1; currentIndex < n; currentIndex++) {
        globalSequence[currentIndex] = Math.min(
            globalSequence[currentIndex - 1] + diff[currentIndex - 1],
            globalSequence[currentIndex]
        );
        
        for (
            let backtrackIndex = currentIndex - 1;
            backtrackIndex >= 0 && 
            globalSequence[backtrackIndex] - globalSequence[backtrackIndex + 1] > diff[backtrackIndex];
            backtrackIndex--
        ) {
            globalSequence[backtrackIndex] = globalSequence[backtrackIndex + 1] + diff[backtrackIndex];
        }
    }
    
    let maxValue = 0;
    for (let i = 0; i < n; i++) {
        maxValue = Math.max(maxValue, globalSequence[i]);
    }
    
    return maxValue;
};
```