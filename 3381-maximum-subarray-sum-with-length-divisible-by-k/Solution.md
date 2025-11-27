# Prefix Sum Modular Indexing | 15 Lines | O(n) | 5ms

# Intuition
For a subarray sum from index i to j, we use prefix sums: `sum[i..j] = prefix[j] - prefix[i-1]`. For the length (j-i+1) to be divisible by k, we need indices i-1 and j to have the same remainder mod k. By tracking minimum prefix sums for each remainder class, we can maximize subarray sums efficiently.

# Approach
- **Prefix Sum Foundation**:
  - Subarray sum from index i to j: `sum = prefix[j] - prefix[i-1]`
  - To maximize sum: maximize prefix[j] and minimize prefix[i-1]
  - Constraint: subarray length (j-i+1) must be divisible by k

- **Length Divisibility Condition**:
  - Length = j - i + 1 must satisfy (j - i + 1) % k === 0
  - Rearranging: j % k === (i - 1) % k
  - This means: indices j and (i-1) must have the same remainder mod k
  - For prefix sum calculation, we need prefix[j] and prefix[i-1] at indices with matching remainders

- **Key Insight - Remainder Classes**:
  - Group all indices by their remainder when divided by k
  - Indices in same remainder class can form valid subarray boundaries
  - For each position j, find minimum prefix sum among all earlier positions with same remainder
  - Maximum sum = current prefix sum - minimum earlier prefix sum (same remainder class)

- **Tracking Minimum Prefix by Remainder**:
  - Maintain array of size k: `minPrefixByRemainder[r]`
  - `minPrefixByRemainder[r]` = smallest prefix sum seen at any index where index % k === r
  - Initialize all to Infinity (no valid prefix seen yet)

- **Base Case Initialization**:
  - Conceptually, "prefix sum before index 0" equals 0 at virtual index -1
  - For subarray [0..i] with length i+1 to be divisible by k: (i+1) % k === 0
  - This means i % k === k-1
  - So we set `minPrefixByRemainder[k-1] = 0` (represents prefix sum at "index -1")

- **Single Pass Algorithm**:
  - For each index i:
    - Add nums[i] to running prefix sum
    - Calculate current remainder: i % k
    - Try to form max subarray ending at i: currentPrefix - minPrefixByRemainder[currentRemainder]
    - Update minimum prefix for this remainder class

- **Example Walkthrough** ([-5,1,2,-3,4], k=2):
  - Initialize: minPrefix = [Inf, 0] (remainder 1 has virtual prefix 0)
  - i=0: prefix=-5, rem=0, maxSum=-5-Inf=invalid, minPrefix=[−5,0]
  - i=1: prefix=-4, rem=1, maxSum=-4-0=-4, minPrefix=[-5,-4]
  - i=2: prefix=-2, rem=0, maxSum=-2-(-5)=3, minPrefix=[-5,-4]
  - i=3: prefix=-5, rem=1, maxSum=-5-(-4)=-1, minPrefix=[-5,-5]
  - i=4: prefix=-1, rem=0, maxSum=-1-(-5)=4, minPrefix=[-5,-5]
  - Result: 4 (subarray [1,2,-3,4] with length 4)

- **Why This Works**:
  - Every subarray of length divisible by k corresponds to two prefix indices with same remainder
  - By tracking minimum prefix for each remainder, we find optimal starting point
  - Single pass ensures we only consider earlier indices (valid subarrays)

# Complexity
- Time complexity: $$O(n)$$
  - Single pass through array of length n
  - Each operation (prefix sum, remainder, min/max) is O(1)
  - Total: O(n)

- Space complexity: $$O(k)$$
  - Array of size k for tracking minimum prefix by remainder
  - Constant additional variables
  - Total: O(k)

# Code
```typescript
const maxSubarraySum = (nums: number[], k: number): number => {
    let currentPrefixSum = 0;
    let maxSum = -Infinity;
    const minPrefixByRemainder: number[] = Array(k).fill(Infinity);
    minPrefixByRemainder[k - 1] = 0;

    for (let i = 0; i < nums.length; i++) {
        currentPrefixSum += nums[i];
        const currentRemainder = i % k;
        maxSum = Math.max(maxSum, currentPrefixSum - minPrefixByRemainder[currentRemainder]);
        minPrefixByRemainder[currentRemainder] = Math.min(
            minPrefixByRemainder[currentRemainder],
            currentPrefixSum
        );
    }

    return maxSum;
};
```