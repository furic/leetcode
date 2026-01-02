# Set-Based Early Detection | 9 Lines | O(n) | 0ms

# Intuition

In an array of length 2n with n+1 unique elements where one element appears n times, the repeated element must appear very frequently. By the pigeonhole principle, we're guaranteed to encounter a duplicate within the first few elements when scanning left-to-right.

# Approach

**Key Insight:**
- Array length: 2n
- Unique elements: n+1 total
- One element appears n times, others appear once each
- This means the repeated element comprises half the array

**Simple Strategy:**
- Use a Set to track seen elements
- Scan array left-to-right
- First duplicate encountered must be the element repeated n times
- No need to count occurrences - first duplicate is always the answer

**Why First Duplicate Works:**
- Only one element repeats (appears > 1 time)
- All other elements appear exactly once
- Therefore, any duplicate we find must be THE repeated element

**Example: [2,1,2,5,3,2]**
- See 2 → add to set
- See 1 → add to set
- See 2 → already in set! Return 2 ✓

**Example: [5,1,5,2,5,3,5,4]**
- See 5 → add to set
- See 1 → add to set
- See 5 → already in set! Return 5 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Worst case: scan entire array
  - Average case: encounter duplicate early (often within first few elements)
  - Set operations (add, has): O(1) average

- Space complexity: $$O(n)$$
  - Set stores at most n+1 unique elements
  - In practice, often stores far fewer before finding duplicate

# Code
```typescript []
const repeatedNTimes = (nums: number[]): number => {
    const seenElements = new Set<number>();
    
    for (const num of nums) {
        if (seenElements.has(num)) {
            return num;
        }
        seenElements.add(num);
    }
    
    return -1;
};
```