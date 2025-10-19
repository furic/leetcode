# Sorted Sequential Search | 13 Lines | O(n log n) | 0ms

# Intuition
We need to find the smallest positive multiple of k that doesn't appear in nums. By processing the array in sorted order and tracking the next expected multiple, we can efficiently detect the first missing one.

# Approach
**Sorted Tracking with Candidate Updates:**
- Sort the array to process numbers in ascending order
- Maintain a candidate for the answer, starting with k (the smallest positive multiple)
- When we encounter our current candidate in the array, increment it to the next multiple
- Stop when we find a gap or finish processing all numbers

**Step-by-Step Process:**

1. **Sort the Array:**
   - Process numbers from smallest to largest
   - This allows us to detect the first missing multiple sequentially

2. **Initialize Candidate:**
   - Start with `ans = k` (the smallest positive multiple of k)
   - This is our current candidate for the missing multiple

3. **Process Each Number:**
   - For each `num` in sorted array:
   
   **Case 1: num equals current candidate**
   - This multiple is present, not missing
   - Update candidate to next multiple: `ans += k`
   - Continue checking subsequent numbers
   
   **Case 2: num > ans**
   - We've passed where `ans` would be without finding it
   - `ans` is the missing multiple, return it immediately
   
   **Case 3: num < ans**
   - This number is not relevant (smaller than our candidate)
   - Continue to next number

4. **After Processing All Numbers:**
   - If we never returned early, `ans` holds the answer
   - This happens when all multiples up to some point are present
   - The next multiple after the largest present one is missing

**Why This Works:**
- Sorting ensures we check multiples in order from smallest to largest
- By incrementing `ans` only when we find it in the array, we track the "next expected" multiple
- The first time we don't find the expected multiple (or reach end of array), that's our answer

**Example Walkthrough (nums = [8,2,3,4,6], k = 2):**
- After sorting: [2,3,4,6,8]
- ans = 2
- num=2: equals ans, update ans=4
- num=3: less than ans=4, continue
- num=4: equals ans, update ans=6
- num=6: equals ans, update ans=8
- num=8: equals ans, update ans=10
- End of array: return ans=10

**Example 2 (nums = [1,4,7,10,15], k = 5):**
- After sorting: [1,4,7,10,15]
- ans = 5
- num=1: less than ans=5, continue
- num=4: less than ans=5, continue
- num=7: greater than ans=5, return 5 immediately

**Edge Cases:**
- Empty array: returns k (first multiple)
- All numbers < k: returns k
- Array contains all consecutive multiples: returns next multiple after largest

# Complexity
- Time complexity: $$O(n \log n)$$ for sorting, then O(n) for the scan
- Space complexity: $$O(1)$$ if sorting in-place, $$O(n)$$ otherwise

# Code
```typescript
const missingMultiple = (nums: number[], k: number): number => {
    nums.sort((a, b) => a - b);
    let ans = k;
    for (const num of nums) {
        if (num === ans) {
            ans += k;
        }
        if (num > ans) {
            return ans;
        }
    }
    return ans;
};
```