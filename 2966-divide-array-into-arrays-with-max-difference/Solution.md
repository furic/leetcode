# [TypeScript] Frequency Counting Groups | 18 Lines | O(n + m) | 56ms

# Intuition
We need to group the numbers into triplets such that the difference between the minimum and maximum in each triplet is at most k. Sorting the array or using frequency counting will help us efficiently form such groups.

# Approach 1: Frequency Counting Groups
- Count the frequency of each number using an array since the range of values is bounded by the max element.
- We attempt to form groups of three by picking numbers in ascending order.
- For each group, try to pick three numbers with positive frequency, incrementing through possible values.
- If at any point, we cannot complete a group of size 3 or the difference between the smallest and largest element exceeds k, return an empty array.
- Otherwise, accumulate the formed groups and return the result.

# Complexity
- Time complexity: $$O(n + m)$$, where n is the length of nums and m is the range of numbers (max(nums)) due to frequency counting and scanning.
- Space complexity: $$O(m)$$ for the frequency array and result storage.

# Code
```typescript []
const divideArray = (nums: number[], k: number): number[][] => {
  const count = Array(Math.max(...nums) + 1).fill(0);
  nums.forEach(num => count[num]++);

  const res: number[][] = [];
  let c = 0;

  for (let i = 0; i < nums.length; i += 3) {
    const group: number[] = [];
    while (c < count.length && group.length < 3) {
      if (count[c]-- > 0) group.push(c);
      else c++;
    }
    if (group.length < 3 || group[2] - group[0] > k) return [];
    res.push(group);
  }

  return res;
};
```

# Approach 2: Sort & Group Triplets
Sort the array in ascending order. Traverse it in chunks of 3. For each triplet, check if the max and min values differ by more than `k`. If any triplet fails the check, return an empty array. Otherwise, collect and return all valid triplets.

# Complexity
- Time complexity: $$O(n \log n)$$
- Space complexity: $$O(n)$$

# Code
```typescript []
const divideArray = (nums: number[], k: number): number[][] => {
    nums.sort((a, b) => a - b);
    const ans = [];
    for (let i = 0; i < nums.length; i += 3) {
        if (nums[i + 2] - nums[i] > k) {
            return [];
        }
        ans.push([nums[i], nums[i + 1], nums[i + 2]]);
    }
    return ans;
};
```