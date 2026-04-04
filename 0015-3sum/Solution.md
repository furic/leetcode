# Sort + Two-Pointer Deduplication | 18 Lines | O(n²) | 38ms

# Intuition
Sorting lets us use a two-pointer approach for the inner pair search, and makes duplicate skipping trivial — identical values are adjacent, so we just skip forward when we see a repeat.

# Approach
- Sort `nums` ascending.
- For each index `i`, fix `nums[i]` as the first element and find pairs summing to `-nums[i]` using two pointers `left = i+1` and `right = n-1`:
  - If `nums[left] + nums[right] === target`: record the triplet, then skip duplicate `left` and `right` values before advancing both pointers inward.
  - If sum is too small: advance `left`.
  - If sum is too large: retreat `right`.
- Skip duplicate values of `nums[i]` at the outer loop (`i > 0 && nums[i] === nums[i-1]`) to avoid generating the same triplet multiple times.
- Sorting guarantees all duplicates are adjacent, so a single forward/backward skip suffices.

# Complexity
- Time complexity: $$O(n^2)$$ — outer loop is $$O(n)$$, inner two-pointer scan is $$O(n)$$ per iteration; sorting is $$O(n \log n)$$ which is dominated.

- Space complexity: $$O(\log n)$$ — in-place sort stack; output not counted.

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