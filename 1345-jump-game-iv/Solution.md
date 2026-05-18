# Sort + Two-Pointer Dedup Triplets | 16 Lines | O(n²) | 42ms

# Intuition
Sorting lets us use two pointers to find pairs that sum to a target, and also makes duplicate skipping straightforward — consecutive equal values at any pointer position can be skipped after finding a valid triplet.

# Approach
- Sort `nums` ascending.
- Fix the first element `nums[i]`. Skip duplicates (`nums[i] === nums[i-1]`).
- Set `target = -nums[i]` and run two pointers `left = i+1`, `right = n-1`:
  - If `nums[left] + nums[right] === target`: record the triplet, then skip duplicate `left` and `right` values before advancing both pointers.
  - If sum < target: advance `left`.
  - If sum > target: retreat `right`.
- Collect and return all unique triplets.

# Complexity
- Time complexity: $$O(n^2)$$ — outer loop $$O(n)$$, inner two-pointer scan $$O(n)$$.

- Space complexity: $$O(\log n)$$ for the sort; $$O(k)$$ for the output where $$k$$ is the number of valid triplets.

# Code
```typescript []
const threeSum = (nums: number[]): number[][] => {
    nums = nums.sort((a, b) => a - b);
    const result: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        const target = -nums[i];
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[left] + nums[right];
            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};
```