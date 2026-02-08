# Sliding Window with Monotonic Deques | 40 Lines | O(n) | 31ms

# Intuition

Use sliding window to maintain valid subarrays. Track min/max efficiently with monotonic deques. For each right endpoint, find leftmost valid left where cost ≤ k, then count all subarrays [left..right], [left+1..right], ..., [right..right].

# Approach

**Monotonic Deques:**
- minDeque: increasing values (front = minimum)
- maxDeque: decreasing values (front = maximum)
- O(1) access to min/max in current window

**Sliding Window:**
1. Expand right: add element to both deques
2. Shrink left while cost > k
3. Count valid subarrays: right - left + 1

**Cost Formula:**
- cost = (max - min) × length
- As window expands, both (max-min) and length can increase
- Need to maintain cost ≤ k

**Example: nums=[1,3,2], k=4**

Process:
- right=0: [1], cost=0, count+=1
- right=1: [1,3], cost=4, count+=2
- right=2: [1,3,2], cost=6>4, shrink to [3,2], cost=2, count+=2

Total: 5 ✓

# Complexity

- Time complexity: $$O(n)$$
  - Each element added/removed from deques once
  - Left pointer moves at most n times
  - Overall: O(n)

- Space complexity: $$O(n)$$
  - Deques: O(n) worst case
  - Overall: O(n)

# Code
```typescript []
const countSubarrays = (nums: number[], k: number): number => {
    const n = nums.length;
    let count = 0;
    let left = 0;
    
    const minDeque: number[] = [];
    const maxDeque: number[] = [];
    let minStart = 0;
    let maxStart = 0;
    
    for (let right = 0; right < n; right++) {
        while (minDeque.length > minStart && nums[minDeque[minDeque.length - 1]] >= nums[right]) {
            minDeque.pop();
        }
        minDeque.push(right);
        
        while (maxDeque.length > maxStart && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) {
            maxDeque.pop();
        }
        maxDeque.push(right);
        
        while (left <= right) {
            while (minStart < minDeque.length && minDeque[minStart] < left) minStart++;
            while (maxStart < maxDeque.length && maxDeque[maxStart] < left) maxStart++;
            
            const minVal = nums[minDeque[minStart]];
            const maxVal = nums[maxDeque[maxStart]];
            const cost = (maxVal - minVal) * (right - left + 1);
            
            if (cost <= k) break;
            left++;
        }
        
        count += right - left + 1;
    }
    
    return count;
};
```