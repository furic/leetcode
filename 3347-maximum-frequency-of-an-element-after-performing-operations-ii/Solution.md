# Sorted Binary Search Optimization | 106 Lines | O(n log n) | 585ms

# Intuition
Instead of checking every possible target value in a large range, we can optimize by only checking "interesting" target values - those that already exist in nums or boundary values of reachable ranges. By sorting the array and using binary search, we can efficiently count how many numbers can reach each target.

# Approach
**Candidate Target Selection with Binary Search:**
- Sort the array to enable binary search for range queries
- Identify strategic candidate targets (existing values and range boundaries)
- For each candidate, use binary search to count numbers within adjustment range
- Calculate maximum achievable frequency considering existing counts and operations

**Step-by-Step Process:**

1. **Sort the Array:**
   - Enables binary search for O(log n) range queries
   - Groups identical values together for easy frequency counting

2. **Identify Candidate Targets:**
   - For each unique value v in nums, add three candidates:
     - The value itself: v (natural target)
     - Left boundary: v - k (edge of what can reach v from left)
     - Right boundary: v + k (edge of what can reach v from right)
   - Why boundaries matter: They represent "transition points" where the count of reachable numbers changes

3. **Count Original Frequencies:**
   - While iterating through sorted array, group consecutive identical values
   - Store frequency of each unique value in a map
   - Track maximum existing frequency as baseline

4. **Binary Search Functions:**
   
   **findLeftBoundary(target):**
   - Returns leftmost index where nums[index] >= target
   - Finds start of range [target-k, target+k] in sorted array
   
   **findRightBoundary(target):**
   - Returns rightmost index where nums[index] <= target
   - Finds end of range [target-k, target+k] in sorted array

5. **Evaluate Each Candidate Target:**
   
   **Count Reachable Numbers:**
   - Use binary search to find indices where nums[i] ∈ [target-k, target+k]
   - leftIndex = first position with value ≥ target-k
   - rightIndex = last position with value ≤ target+k
   - numbersInRange = rightIndex - leftIndex + 1

   **Calculate Achievable Frequency:**
   
   **Case 1: Target already exists in nums**
   - Start with existing count (these don't need operations)
   - Can use remaining operations on other numbers in range
   - achievableFrequency = min(numbersInRange, existingCount + numOperations)
   - Limited by: total reachable numbers OR existing + operations available
   
   **Case 2: Target doesn't exist**
   - Must create all instances using operations
   - achievableFrequency = min(numbersInRange, numOperations)
   - Limited by: total reachable numbers OR operations available

6. **Track Global Maximum:**
   - Update maxFrequency across all candidates and original frequencies

**Why This Optimization Works:**

- **Sorted array benefits:**
  - Binary search replaces O(n) counting with O(log n)
  - Identical values are consecutive (easy to count)
  
- **Candidate reduction:**
  - Instead of checking all values in [0, maxValue+k], only check O(n) candidates
  - Boundaries capture critical transition points
  - Any target between boundaries would have same or worse count

- **Correctness:**
  - Every optimal target is either an existing value or a boundary
  - Boundaries represent "edges" where the count of reachable numbers changes
  - No need to check interior points within ranges

**Example Walkthrough (nums = [1,4,5], k = 1, numOperations = 2):**
- After sorting: [1,4,5]
- Candidates: {1, 0, 2, 4, 3, 5, 5, 4, 6} → unique: {0,1,2,3,4,5,6}
- Target = 4:
  - Range [3,5]: leftIndex=1 (nums[1]=4), rightIndex=2 (nums[2]=5)
  - numbersInRange = 2
  - existingCount = 1
  - achievableFrequency = min(2, 1+2) = 2 ✓

**Edge Cases:**
- All elements identical: maxFrequency = length (no operations needed)
- Large k: all elements reachable from any target
- numOperations = 0: return max existing frequency

# Complexity
- Time complexity: $$O(n \log n)$$ for sorting + O(n) candidates × O(log n) binary search
- Space complexity: $$O(n)$$ for frequency map and candidate set

# Code
```typescript
const maxFrequency = (nums: number[], k: number, numOperations: number): number => {
    nums.sort((a, b) => a - b);

    let maxFrequency = 0;
    const originalFrequency = new Map<number, number>();
    const candidateTargets = new Set<number>();

    const addCandidateTargets = (value: number): void => {
        candidateTargets.add(value);
        
        if (value - k >= nums[0]) {
            candidateTargets.add(value - k);
        }

        if (value + k <= nums[nums.length - 1]) {
            candidateTargets.add(value + k);
        }
    };

    let groupStartIndex = 0;
    for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
        const isNewGroup = nums[currentIndex] !== nums[groupStartIndex];
        
        if (isNewGroup) {
            const groupValue = nums[groupStartIndex];
            const groupSize = currentIndex - groupStartIndex;
            
            originalFrequency.set(groupValue, groupSize);
            maxFrequency = Math.max(maxFrequency, groupSize);
            addCandidateTargets(groupValue);

            groupStartIndex = currentIndex;
        }
    }

    const lastGroupValue = nums[groupStartIndex];
    const lastGroupSize = nums.length - groupStartIndex;
    originalFrequency.set(lastGroupValue, lastGroupSize);
    maxFrequency = Math.max(maxFrequency, lastGroupSize);
    addCandidateTargets(lastGroupValue);

    const findLeftBoundary = (targetValue: number): number => {
        let left = 0;
        let right = nums.length - 1;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] < targetValue) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    };

    const findRightBoundary = (targetValue: number): number => {
        let left = 0;
        let right = nums.length - 1;
        
        while (left < right) {
            const mid = Math.floor((left + right + 1) / 2);
            if (nums[mid] > targetValue) {
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        
        return left;
    };

    for (const targetValue of candidateTargets) {
        const leftIndex = findLeftBoundary(targetValue - k);
        const rightIndex = findRightBoundary(targetValue + k);
        const numbersInRange = rightIndex - leftIndex + 1;

        let achievableFrequency: number;

        if (originalFrequency.has(targetValue)) {
            const existingCount = originalFrequency.get(targetValue)!;
            achievableFrequency = Math.min(numbersInRange, existingCount + numOperations);
        } else {
            achievableFrequency = Math.min(numbersInRange, numOperations);
        }

        maxFrequency = Math.max(maxFrequency, achievableFrequency);
    }

    return maxFrequency;
};
```