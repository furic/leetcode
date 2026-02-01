# Binary Search on K | 24 Lines | O(n log(max_k)) | 59ms

# Intuition

For a given k, we can calculate the number of operations needed. The problem becomes: find minimum k where ops(k) ≤ k². Use binary search on k to find this threshold efficiently.

# Approach

**Operations Calculation:**
- For each num, operations needed = ⌈num/k⌉
- Total ops = Σ⌈nums[i]/k⌉

**Binary Search:**
- Search space: [1, upper_bound]
- Upper bound: Consider that ops ≈ n when k is large, so k² ≥ n → k ≥ √n
  - Also bounded by max element
  - Safe bound: max(maxElement, √(n × maxElement))
- Check condition: ops(mid) ≤ mid²
- If satisfied: try smaller k (right = mid-1)
- If not: need larger k (left = mid+1)

**Why Binary Search Works:**
- As k increases, ops(k) decreases (monotonic)
- As k increases, k² increases
- There's a threshold k where ops(k) first becomes ≤ k²

**Example: nums=[3,7,5]**

Try k=3:
- ops = ⌈3/3⌉ + ⌈7/3⌉ + ⌈5/3⌉ = 1+3+2 = 6
- k² = 9
- 6 ≤ 9 ✓

Try k=2:
- ops = ⌈3/2⌉ + ⌈7/2⌉ + ⌈5/2⌉ = 2+4+3 = 9
- k² = 4
- 9 > 4 ✗

Result: 3 ✓

# Complexity

- Time complexity: $$O(n \log(\max_k))$$
  - Binary search: O(log(max_k)) iterations
  - Per iteration: count ops O(n)
  - max_k ≈ √(n × max_element)
  - Overall: O(n log(max_k))

- Space complexity: $$O(1)$$
  - Only scalar variables
  - No additional data structures

# Code
```typescript []
const minimumK = (nums: number[]): number => {
    const countOps = (k: number): number => {
        let ops = 0;
        for (const num of nums) {
            ops += Math.ceil(num / k);
        }
        return ops;
    };
    
    let left = 1;
    const maxElement = Math.max(...nums);
    let right = Math.max(maxElement, Math.ceil(Math.sqrt(nums.length * maxElement)));
    let result = right;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const ops = countOps(mid);
        
        if (ops <= mid * mid) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
};
```