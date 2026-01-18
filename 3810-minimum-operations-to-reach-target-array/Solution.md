# Distinct Mismatched Values | 10 Lines | O(n) | 23ms

# Intuition

Each operation updates all maximal segments of a chosen value x. The key insight: we need one operation per distinct value that appears at positions requiring updates. Count how many distinct values from nums appear at mismatched positions.

# Approach

**Key Observation:**
- When we choose value x, ALL maximal segments with value x get updated
- This means a single operation can fix all positions where nums[i]=x and nums[i]≠target[i]
- Minimum operations = number of distinct values that need updating

**Algorithm:**
1. Find all positions where nums[i] ≠ target[i]
2. Collect distinct nums[i] values at these positions
3. Return count of distinct values

**Why This Works:**
- Each distinct value needs exactly one operation
- One operation fixes all occurrences of that value simultaneously
- No benefit to multiple operations on same value

**Example: nums=[1,2,3], target=[2,1,3]**

Mismatches:
- i=0: nums[0]=1 ≠ target[0]=2
- i=1: nums[1]=2 ≠ target[1]=1

Distinct values needing update: {1, 2}
Result: 2 ✓

**Example: nums=[4,1,4], target=[5,1,4]**

Mismatches:
- i=0: nums[0]=4 ≠ target[0]=5

Distinct values: {4}
Result: 1 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Single pass to find mismatches
  - Set operations: O(1) average per insert
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Set stores at most n distinct values
  - Worst case: O(n)

# Code
```typescript []
const minOperations = (nums: number[], target: number[]): number => {
    const needsUpdate = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== target[i]) {
            needsUpdate.add(nums[i]);
        }
    }

    return needsUpdate.size;
};
```