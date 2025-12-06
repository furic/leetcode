# DP with Monotonic Queues | 40 Lines | O(n) | 264ms

# Intuition
For each position, we need to find all valid starting positions that can form a valid segment (max - min ≤ k) ending at the current position. Using monotonic queues to track max/min efficiently and DP to count ways, we can solve this in linear time.

# Approach
- **DP State Definition**:
  - `dp[i]` = number of ways to partition nums[0...i-1] into valid segments
  - Base case: `dp[0] = 1` (empty array has one way: no segments)
  - Answer: `dp[n]` (ways to partition entire array)

- **Segment Validity Check**:
  - Segment [l, r] is valid if max(nums[l...r]) - min(nums[l...r]) ≤ k
  - Need efficient way to track max/min as we extend window

- **Monotonic Queue Optimization**:
  - Maintain two deques storing indices (not values):
    - maxQueue: indices in decreasing order of their values (front = max)
    - minQueue: indices in increasing order of their values (front = min)
  - These allow O(1) query for max/min in current window

- **Sliding Window Strategy**:
  - For each position i, maintain window [leftBound, i]
  - While max - min > k: shrink window from left (increment leftBound)
  - All positions in [leftBound, i] can be valid segment starts

- **DP Transition**:
  - `dp[i+1] = sum of dp[leftBound...i]`
  - This sums ways to partition up to each valid starting position
  - Each starting position j means: partition [0...j-1] + segment [j...i]

- **Prefix Sum Optimization**:
  - Computing sum of dp[leftBound...i] naively is O(n²) total
  - Use prefix sums: `prefixSum[i] = dp[0] + dp[1] + ... + dp[i]`
  - Range sum: `dp[l...r] = prefixSum[r] - prefixSum[l-1]`
  - Reduces transition to O(1)

- **Monotonic Queue Maintenance**:
  - When adding element at index i:
    - Remove smaller elements from back of maxQueue
    - Remove larger elements from back of minQueue
    - Add i to both queues
  - When shrinking window (incrementing leftBound):
    - Remove indices at front if they equal leftBound

- **Example Walkthrough** ([9,4,1,3,7], k=4):
  - dp[0] = 1
  - i=0 (9): window [0,0], max=9, min=9, diff=0 ≤ 4 → dp[1] = dp[0] = 1
  - i=1 (4): window [0,1], max=9, min=4, diff=5 > 4 → shrink to [1,1] → dp[2] = dp[1] = 1
  - i=2 (1): window [1,2], max=4, min=1, diff=3 ≤ 4 → dp[3] = dp[1]+dp[2] = 2
  - Continue building up dp values...
  - Final: dp[5] = 6

# Complexity
- Time complexity: $$O(n)$$
  - Each element added to monotonic queues once: O(n)
  - Each element removed from monotonic queues at most once: O(n)
  - DP transitions with prefix sum: O(1) per position
  - Total: O(n)

- Space complexity: $$O(n)$$
  - DP array: O(n)
  - Prefix sum array: O(n)
  - Monotonic queues: O(n) worst case
  - Total: O(n)

# Code
```typescript
const countPartitions = (nums: number[], k: number): number => {
    const numElements = nums.length;
    const MOD = 1e9 + 7;
    const partitionWays = new Array<number>(numElements + 1).fill(0);
    const prefixSum = new Array<number>(numElements + 1).fill(0);
    const maxIndexQueue: number[] = [];
    const minIndexQueue: number[] = [];

    partitionWays[0] = 1;
    prefixSum[0] = 1;

    let leftBound = 0;

    for (let currentIndex = 0; currentIndex < numElements; currentIndex++) {
        while (maxIndexQueue.length > 0 && nums[maxIndexQueue.at(-1)!] <= nums[currentIndex]) {
            maxIndexQueue.pop();
        }
        maxIndexQueue.push(currentIndex);

        while (minIndexQueue.length > 0 && nums[minIndexQueue.at(-1)!] >= nums[currentIndex]) {
            minIndexQueue.pop();
        }
        minIndexQueue.push(currentIndex);

        while (
            maxIndexQueue.length > 0 &&
            minIndexQueue.length > 0 &&
            nums[maxIndexQueue[0]] - nums[minIndexQueue[0]] > k
        ) {
            if (maxIndexQueue[0] === leftBound) {
                maxIndexQueue.shift();
            }
            if (minIndexQueue[0] === leftBound) {
                minIndexQueue.shift();
            }
            leftBound++;
        }

        const rangeSum = prefixSum[currentIndex] - (leftBound > 0 ? prefixSum[leftBound - 1] : 0);
        partitionWays[currentIndex + 1] = (rangeSum + MOD) % MOD;
        prefixSum[currentIndex + 1] = (prefixSum[currentIndex] + partitionWays[currentIndex + 1]) % MOD;
    }

    return partitionWays[numElements];
};
```