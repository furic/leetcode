# Intuition

We are given a sorted array `nums = [1, 2, ..., n]` and a list of conflicting pairs. If any conflicting pair `[a, b]` appears in a subarray, that subarray is invalid. We're allowed to remove **one conflicting pair**, and we want to **maximize** the total number of valid subarrays.

The brute-force approach would try removing each pair and checking all subarrays, which is too slow. Instead, we track the **range of safe subarrays** dynamically and find which pair's removal gives us the **largest bonus**.

# Approach

1. **Conflict Compression:**  
   For each conflicting pair `[a, b]`, store the smaller index as a key and track the two smallest larger values that it conflicts with (`minConflict1`, `minConflict2`).

2. **Right-to-Left Scan:**  
   Traverse from `n` to `1`:
   - Track the best conflicting range using `bestMinIndex` and `secondMin`.
   - Calculate how many subarrays end at `rightLimit` (excluding conflict).
   - Calculate a potential bonus from removing one conflicting pair using `removalBonus`.

3. **Final Answer:**  
   Return total subarrays + max bonus from any removable conflict.

# Complexity

- Time complexity:  
  $$O(n + m)$$  
  where `n` is the size of the array and `m` is the number of conflicting pairs.

- Space complexity:  
  $$O(n)$$  
  for storing conflict tracking arrays.

# Code

```typescript
const maxSubarrays = (n: number, conflictingPairs: number[][]): number => {
    const minConflict1 = Array(n + 1).fill(Infinity);
    const minConflict2 = Array(n + 1).fill(Infinity);

    conflictingPairs.forEach(([a, b]) => {
        const lower = Math.min(a, b);
        const upper = Math.max(a, b);
        if (minConflict1[lower] > upper) {
            minConflict2[lower] = minConflict1[lower];
            minConflict1[lower] = upper;
        } else if (minConflict2[lower] > upper) {
            minConflict2[lower] = upper;
        }
    });

    let totalSubarrays = 0;
    let bestMinIndex = n;
    let secondMin = Infinity;
    const removalBonus = Array(n + 1).fill(0);

    for (let i = n; i >= 1; i--) {
        const currentMin1 = minConflict1[i];

        if (minConflict1[bestMinIndex] > currentMin1) {
            secondMin = Math.min(secondMin, minConflict1[bestMinIndex]);
            bestMinIndex = i;
        } else {
            secondMin = Math.min(secondMin, currentMin1);
        }

        const rightLimit = Math.min(minConflict1[bestMinIndex], n + 1);
        totalSubarrays += rightLimit - i;

        const earliestConflictFree = Math.min(secondMin, minConflict2[bestMinIndex], n + 1);
        removalBonus[bestMinIndex] += earliestConflictFree - rightLimit;
    }

    return totalSubarrays + Math.max(...removalBonus);
};
```
