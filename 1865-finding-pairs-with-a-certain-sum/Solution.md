# Hash Map Frequency Tracking | 53 Lines | O(m+n) | 75ms

# Intuition
This problem requires efficient counting of pairs across two arrays where one array (nums2) can be modified. Since nums1 is read-only, we can preprocess it by sorting to enable optimizations. For nums2, since it changes frequently, we need to track value frequencies efficiently. The key insight is to use a frequency map for nums2 values and iterate through nums1 to find complementary values.

# Approach
I'll use a combination of sorting and hash map frequency tracking:

1. **Preprocessing**: Sort nums1 to enable early termination during count queries. Keep nums2 unsorted but build a frequency map to track value counts.

2. **Frequency Map**: Maintain a hash map that tracks how many times each value appears in nums2. This allows O(1) lookup during count operations.

3. **Add Operation**: When updating nums2[index], decrement the count of the old value and increment the count of the new value in the frequency map. Update the actual array value.

4. **Count Operation**: Iterate through sorted nums1. For each value, calculate the required complement (target - nums1[i]) and look up its frequency in nums2's frequency map. Use early termination: if nums1[i] > target, all remaining values will also exceed the target.

5. **Optimization**: The sorted nums1 allows us to break early when values become too large, reducing unnecessary iterations.

# Complexity
- Time complexity: $$O(m + n)$$ for operations after initialization
  - Initialization: O(m log m) for sorting nums1, O(n) for building frequency map
  - Add operation: O(1) for hash map updates
  - Count operation: O(m) in worst case, often better with early termination
  
- Space complexity: $$O(m + n)$$
  - O(m) for sorted copy of nums1
  - O(n) for frequency map of nums2 values (at most n distinct values)
  - O(1) additional space for operations

# Code
```typescript []
class FindSumPairs {
    private readonly sortedArray1: number[];
    private readonly mutableArray2: number[];
    private readonly valueCountMap: Map<number, number>;

    constructor(nums1: number[], nums2: number[]) {
        this.sortedArray1 = [...nums1].sort((a, b) => a - b);
        
        this.mutableArray2 = nums2;
        
        this.valueCountMap = new Map();
        this.mutableArray2.forEach(value => {
            this.valueCountMap.set(value, (this.valueCountMap.get(value) || 0) + 1);
        });
    }

    add = (index: number, valueToAdd: number): void => {
        const oldValue = this.mutableArray2[index];
        const newValue = oldValue + valueToAdd;
        
        this.mutableArray2[index] = newValue;
        
        this.decrementValueCount(oldValue);
        
        this.incrementValueCount(newValue);
    };

    count = (targetSum: number): number => {
        let pairCount = 0;
        
        for (const value1 of this.sortedArray1) {
            if (value1 > targetSum) break;
            
            const requiredValue2 = targetSum - value1;
            pairCount += this.valueCountMap.get(requiredValue2) || 0;
        }
        
        return pairCount;
    };

    private incrementValueCount = (value: number): void => {
        this.valueCountMap.set(value, (this.valueCountMap.get(value) || 0) + 1);
    };

    private decrementValueCount = (value: number): void => {
        const currentCount = this.valueCountMap.get(value);
        
        if (!currentCount) return;
        
        if (currentCount === 1) {
            this.valueCountMap.delete(value);
        } else {
            this.valueCountMap.set(value, currentCount - 1);
        }
    };
}
```