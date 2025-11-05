# Frequency-Based Sliding Window | 40 Lines | O(n × k × log k) | 7ms

# Intuition
For each sliding window of size k, we need to find the x most frequent elements (with value as tiebreaker) and sum their contributions (frequency × value). This requires frequency counting, sorting by custom criteria, and selective summation for each window.

# Approach
**Sliding Window with Frequency Analysis:**
- Process each window of size k independently
- Count element frequencies within window
- Sort elements by frequency (desc) then value (desc)
- Sum top x elements' contributions or entire window if fewer than x distinct elements

**Step-by-Step Process:**

1. **Process Each Window:**
   - Iterate windows: start positions from 0 to n-k
   - Each window: `nums[windowStart..windowStart+k-1]`

2. **Count Frequencies:**
   - Use array of size 51 (values range 1-50 per constraints)
   - `frequencyCount[value]++` for each element in window
   - Also track `windowSum` for optimization case

3. **Handle Simple Case:**
   - If distinct elements ≤ x: x-sum = windowSum
   - All elements included, no selection needed
   - Early return with windowSum

4. **Build Frequency-Value Pairs:**
   - Create array of `[frequency, value]` for non-zero frequencies
   - Only include values that appear in window

5. **Sort by Criteria:**
   - Primary: frequency descending (most frequent first)
   - Secondary: value descending (larger value breaks ties)
   - Comparator: `(b[0] - a[0]) || (b[1] - a[1])`

6. **Calculate x-Sum:**
   - Take top x elements from sorted list
   - For each: add `frequency × value` to x-sum
   - This counts each occurrence of the value

7. **Store Result:**
   - Append computed x-sum to result array

8. **Return Results:**
   - Array of x-sums for all windows

**Why This Works:**

**Frequency Counting:**
- Captures how often each value appears
- Enables frequency-based ranking

**Sorting Criteria:**
- Most frequent elements prioritized
- Value tiebreaker ensures deterministic selection
- Matches problem definition exactly

**Contribution Calculation:**
- `frequency × value` correctly sums all occurrences
- Example: value 2 appears 3 times → contributes 2×3=6

**Example Walkthrough (nums = [1,1,2,2,3,4,2,3], k = 6, x = 2):**

**Window 1: [1,1,2,2,3,4]**
- Frequencies: 1→2, 2→2, 3→1, 4→1
- Pairs: [[2,2], [2,1], [1,4], [1,3]]
- Sort: [[2,2], [2,1], [1,4], [1,3]]
  - 2 appears 2 times (highest freq)
  - 1 appears 2 times (tied, but 2>1, so 2 first)
- Top 2: [2,2] and [2,1]
- x-sum: 2×2 + 2×1 = 4 + 2 = 6 ✓

**Window 2: [1,2,2,3,4,2]**
- Frequencies: 1→1, 2→3, 3→1, 4→1
- Pairs: [[3,2], [1,4], [1,3], [1,1]]
- Sort: [[3,2], [1,4], [1,3], [1,1]]
- Top 2: [3,2] and [1,4]
- x-sum: 3×2 + 1×4 = 6 + 4 = 10 ✓

**Window 3: [2,2,3,4,2,3]**
- Frequencies: 2→3, 3→2, 4→1
- Pairs: [[3,2], [2,3], [1,4]]
- Sort: [[3,2], [2,3], [1,4]]
- Top 2: [3,2] and [2,3]
- x-sum: 3×2 + 2×3 = 6 + 6 = 12 ✓

**Result:** [6, 10, 12] ✓

**Key Insights:**

**Why Sort Each Window:**
- Frequencies change between windows
- Can't reuse sorting from previous window
- Each window needs independent ranking

**Tiebreaker Importance:**
- Multiple elements can have same frequency
- Value tiebreaker ensures consistent selection
- Higher value preferred when tied

**Edge Cases:**

**All distinct (freq=1):**
- All tied on frequency
- Sort by value descending
- Take x largest values

**Few distinct elements (< x):**
- Include all elements
- x-sum = entire window sum

**Single element repeated:**
- Only one distinct element
- x-sum = frequency × value

**k = x:**
- Every window: include all elements
- x-sum = window sum always

**Large x:**
- If x ≥ distinct count, include all
- Simplifies to window sum

**Optimization Opportunities (Not Implemented):**

**Frequency array reuse:**
- Could maintain sliding window frequencies
- Update incrementally (add/remove elements)
- Would improve to O(n × log k) overall

**Heap-based selection:**
- Use min-heap of size x
- Avoid full sort, just maintain top x
- Would be O(n × k × log x)

**For this problem:**
- Simple approach sufficient
- Constraints allow O(n × k × log k)
- Optimizations add complexity

# Complexity
- Time complexity: $$O(n \times k \times \log k)$$ where n is array length - O(n-k) windows, each requires O(k) frequency counting + O(k log k) sorting
- Space complexity: $$O(k)$$ for frequency array and pairs list

# Code
```typescript
const findXSum = (nums: number[], k: number, x: number): number[] => {
    const arrayLength = nums.length;
    const result: number[] = [];
    
    for (let windowStart = 0; windowStart + k <= arrayLength; windowStart++) {
        const frequencyCount = new Array(51).fill(0);
        let windowSum = 0;
        
        for (let index = windowStart; index < windowStart + k; index++) {
            frequencyCount[nums[index]]++;
            windowSum += nums[index];
        }
        
        const frequencyValuePairs: [number, number][] = [];
        for (let value = 1; value <= 50; value++) {
            if (frequencyCount[value] > 0) {
                frequencyValuePairs.push([frequencyCount[value], value]);
            }
        }
        
        if (frequencyValuePairs.length <= x) {
            result.push(windowSum);
        } else {
            frequencyValuePairs.sort((a, b) => {
                return b[0] - a[0] || b[1] - a[1];
            });
            
            let xSum = 0;
            for (let rank = 0; rank < x; rank++) {
                const [frequency, value] = frequencyValuePairs[rank];
                xSum += frequency * value;
            }
            
            result.push(xSum);
        }
    }
    
    return result;
};
```