# Prefix GCD Build + Two-Pointer Pair Sum | 16 Lines | O(n log n) | 172ms

# Intuition
The problem is two independent steps: construct `prefixGcd` per the definition, then pair sorted elements from the outside in. Each step is straightforward once separated clearly.

# Approach
- **Build `prefixGcd`:** Scan `nums` left to right, maintaining a running `prefixMax`. For each index `i`, `prefixGcd[i] = gcd(nums[i], prefixMax)`. The running max is updated before the gcd call, so `prefixMax` always equals `max(nums[0..i])` at the time of computation.
- **Sort `prefixGcd`** in ascending order — this sets up the two-pointer pairing.
- **Two-pointer pair summation:** Place `left = 0` and `right = n - 1`. While `left < right`, compute `gcd(prefixGcd[left], prefixGcd[right])`, add to `pairGcdSum`, then advance both pointers inward. If `n` is odd, the middle element is naturally skipped when `left === right` (the `while` condition fails).
- **GCD implementation:** Standard recursive Euclidean algorithm — `gcd(a, b) = b === 0 ? a : gcd(b, a % b)`.

# Complexity
- Time complexity: $$O(n \log n)$$ — sorting dominates; building `prefixGcd` is $$O(n \log M)$$ where $$M$$ is the max value, and the two-pointer pass is $$O(n \log M)$$.

- Space complexity: $$O(n)$$ — for the `prefixGcd` array.

# Code
```typescript []
const gcdSum = (nums: number[]): number => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    let prefixMax = 0;
    const prefixGcd = nums.map((v) => {
        prefixMax = Math.max(prefixMax, v);
        return gcd(v, prefixMax);
    });

    prefixGcd.sort((a, b) => a - b);

    let pairGcdSum = 0;
    let left = 0;
    let right = prefixGcd.length - 1;

    while (left < right) {
        pairGcdSum += gcd(prefixGcd[left], prefixGcd[right]);
        left++;
        right--;
    }

    return pairGcdSum;
};
```