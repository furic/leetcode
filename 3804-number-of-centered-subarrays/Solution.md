# Brute Force with Set | 16 Lines | O(n²) | 57ms

# Intuition

A subarray is centered if its sum equals one of its elements. For each subarray, track both the running sum and all elements seen, then check if sum exists in the element set.

# Approach

**Brute Force Strategy:**
- Try all possible subarrays using two nested loops
- For each subarray starting at i, extend to j
- Maintain running sum and set of elements
- Check if sum exists in element set

**Optimization:**
- Use Set for O(1) element lookup
- Compute sum incrementally (add new element each iteration)
- Add element to set as we extend subarray

**Example: nums=[-1,1,0]**

Starting at i=0:
- j=0: elements={-1}, sum=-1, -1 in set ✓ (count=1)
- j=1: elements={-1,1}, sum=0, 0 not in set
- j=2: elements={-1,1,0}, sum=0, 0 in set ✓ (count=2)

Starting at i=1:
- j=1: elements={1}, sum=1, 1 in set ✓ (count=3)
- j=2: elements={1,0}, sum=1, 1 in set ✓ (count=4)

Starting at i=2:
- j=2: elements={0}, sum=0, 0 in set ✓ (count=5)

Result: 5 ✓

# Complexity

- Time complexity: $$O(n^2)$$
  - Two nested loops: O(n²)
  - Set operations (add, has): O(1) average
  - Overall: O(n²)

- Space complexity: $$O(n)$$
  - Set stores at most n elements per subarray
  - Worst case: O(n)

# Code
```typescript []
const centeredSubarrays = (nums: number[]): number => {
    const n = nums.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        const elements = new Set<number>();
        let sum = 0;

        for (let j = i; j < n; j++) {
            sum += nums[j];
            elements.add(nums[j]);

            if (elements.has(sum)) {
                count++;
            }
        }
    }
    return count;
};
```