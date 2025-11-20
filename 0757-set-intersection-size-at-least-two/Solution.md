# Greedy Interval Covering | 40 Lines | O(n²) | 10ms

# Intuition
This is a greedy interval covering problem. To minimize the set size, we should place numbers strategically to cover multiple intervals. Sorting by endpoint and greedily selecting rightmost numbers in each interval maximizes potential overlap with future intervals.

# Approach
- **Core Strategy - Greedy by Endpoint**:
  - Sort intervals by end point (ascending order)
  - Process intervals left to right
  - For each interval, add minimum numbers needed while choosing rightmost positions
  - Rightmost numbers have highest probability of covering future intervals

- **Why Sort by Endpoint**:
  - Intervals ending earlier should be processed first
  - If we satisfy early-ending intervals with rightmost numbers, we maximize future coverage
  - Similar to the classic "interval scheduling" problem

- **Coverage Checking**:
  - For each interval, count how many selected numbers already fall within its range
  - Check from end of selectedNumbers array (most recent additions)
  - Early termination once we find 2 numbers (interval requirement satisfied)
  - Stop checking if number is less than interval start (no more matches possible)

- **Three Cases Based on Coverage**:
  - **Coverage = 2**: Interval already satisfied, skip to next
  - **Coverage = 1**: Need one more number
    - If last selected is at the interval's end, pick end-1
    - Otherwise, pick the end (rightmost position for max future coverage)
    - Re-sort selectedNumbers to maintain order for efficient checking
  - **Coverage = 0**: Need two numbers
    - Greedily pick end-1 and end (two rightmost positions)
    - These maximize chances of covering future intervals

- **Greedy Choice Justification**:
  - Choosing rightmost numbers doesn't harm current interval (still covers it)
  - Rightmost numbers more likely to be within future intervals' ranges
  - No advantage to choosing leftmost numbers for minimum set size

- **Example Walkthrough** ([[1,3],[3,7],[8,9]]):
  - After sort: [[1,3],[3,7],[8,9]] (already sorted)
  - Process [1,3]: coverage=0 → add [2,3]
  - Process [3,7]: coverage=1 (has 3) → add 7 → selected=[2,3,7]
  - Process [8,9]: coverage=0 → add [8,9] → selected=[2,3,7,8,9]
  - Result: 5 numbers

# Complexity
- Time complexity: $$O(n^2)$$
  - Sorting intervals: O(n log n)
  - For each interval (n iterations):
    - Count coverage: O(s) where s = size of selected set
    - In worst case, s can grow to O(n) (when each interval needs new numbers)
    - Sorting selectedNumbers in coverage=1 case: O(s log s)
  - Worst case per interval: O(n log n)
  - Total: O(n × n log n) but typically much better in practice
  - Average case closer to O(n log n) when many intervals share numbers

- Space complexity: $$O(n)$$
  - selectedNumbers array: O(k) where k is the result size
  - In worst case, k can be O(n) if intervals don't overlap much
  - Sorting uses O(log n) stack space
  - Total: O(n)

# Code
```typescript
const intersectionSizeTwo = (intervals: number[][]): number => {
    intervals.sort((a, b) => a[1] - b[1]);
    
    const selectedNumbers: number[] = [];
    
    const countCoverage = (interval: number[]): number => {
        const [start, end] = interval;
        let coverageCount = 0;
        
        for (let index = selectedNumbers.length - 1; index >= 0; index--) {
            const selectedNum = selectedNumbers[index];
            
            if (selectedNum >= start && selectedNum <= end) {
                coverageCount++;
            }
            
            if (coverageCount >= 2) {
                return 2;
            }
            
            if (selectedNum < start) {
                return coverageCount;
            }
        }
        
        return coverageCount;
    };
    
    for (const currentInterval of intervals) {
        const [start, end] = currentInterval;
        const coverage = countCoverage(currentInterval);
        
        if (coverage === 2) {
            continue;
        } else if (coverage === 0) {
            selectedNumbers.push(end - 1);
            selectedNumbers.push(end);
        } else if (coverage === 1) {
            const lastSelected = selectedNumbers[selectedNumbers.length - 1];
            
            if (lastSelected === end) {
                selectedNumbers.push(end - 1);
            } else {
                selectedNumbers.push(end);
            }
            
            selectedNumbers.sort((a, b) => a - b);
        }
    }
    
    return selectedNumbers.length;
};
```