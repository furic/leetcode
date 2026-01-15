# Longest Consecutive Sequence | 35 Lines | O(n log n + m log m) | 1ms

# Intuition

Removing consecutive bars creates a gap. The largest square hole is determined by the minimum of the largest horizontal and vertical gaps. Find the longest consecutive sequence of removable bars in each direction.

# Approach

**Key Insight:**
- Removing k consecutive bars creates a gap of size k+1
- Example: Remove bars [2,3,4] → gap from bar 1 to bar 5 (size 4)

**Algorithm:**
1. Sort removable bars in each direction
2. Find longest consecutive sequence
3. Gap size = consecutive count + 1
4. Square side = min(horizontal gap, vertical gap)
5. Area = side²

**Consecutive Sequence Finding:**
- Iterate through sorted bars
- If current bar = previous + 1: extend sequence
- Else: restart sequence
- Track maximum consecutive count

**Example: n=2, m=1, hBars=[2,3], vBars=[2]**

Horizontal bars:
- Sorted: [2,3]
- Consecutive: 2→3 (count=2)
- Gap size: 2+1 = 3

Vertical bars:
- Sorted: [2]
- No consecutive (count=1)
- Gap size: 1+1 = 2

Square side: min(3,2) = 2
Area: 2² = 4 ✓

# Complexity

- Time complexity: $$O(n \log n + m \log m)$$
  - Sort hBars: O(n log n)
  - Sort vBars: O(m log m)
  - Find consecutive: O(n) + O(m)
  - Overall: O(n log n + m log m)

- Space complexity: $$O(1)$$
  - Sorting in-place
  - Only counter variables
  - No additional data structures

# Code
```typescript []
const maximizeSquareHoleArea = (
    n: number, 
    m: number, 
    hBars: number[], 
    vBars: number[]
): number => {
    const findMaxConsecutiveGap = (removableBars: number[]): number => {
        removableBars.sort((a, b) => a - b);
        
        let maxConsecutiveCount = 1;
        let currentConsecutiveCount = 1;
        
        for (let i = 1; i < removableBars.length; i++) {
            if (removableBars[i] === removableBars[i - 1] + 1) {
                currentConsecutiveCount++;
                maxConsecutiveCount = Math.max(maxConsecutiveCount, currentConsecutiveCount);
            } else {
                currentConsecutiveCount = 1;
            }
        }
        
        return maxConsecutiveCount + 1;
    };

    const maxHorizontalGap = findMaxConsecutiveGap(hBars);
    const maxVerticalGap = findMaxConsecutiveGap(vBars);
    
    const maxSquareSide = Math.min(maxHorizontalGap, maxVerticalGap);
    
    return maxSquareSide * maxSquareSide;
};
```