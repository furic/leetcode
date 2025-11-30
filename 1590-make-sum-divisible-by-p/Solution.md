# Prefix Sum Modular Lookup | 18 Lines | O(n) | 26ms

# Intuition
To make the remaining sum divisible by p, we need to remove a subarray whose sum has the same remainder as the total sum when divided by p. Using prefix sums with modular arithmetic, we can efficiently find the shortest such subarray by tracking remainders in a hash map.

# Approach
- **Problem Transformation**:
  - Total sum % p = remainderToRemove
  - If remainderToRemove = 0, already divisible, return 0
  - Otherwise, find shortest subarray with sum ≡ remainderToRemove (mod p)
  - Removing this subarray leaves sum divisible by p

- **Prefix Sum with Modular Arithmetic**:
  - Subarray sum [j+1..i] = prefix[i] - prefix[j]
  - We need: (prefix[i] - prefix[j]) % p === remainderToRemove
  - Rearranging: prefix[j] % p === (prefix[i] - remainderToRemove + p) % p
  - The "+p" handles negative modulo in JavaScript

- **Hash Map Strategy**:
  - Map each prefix remainder to its most recent index
  - Initialize with {0: -1} representing empty prefix before index 0
  - For each position i, calculate target remainder we're looking for
  - If target exists in map, we found a valid subarray to remove

- **Why Most Recent Index**:
  - We want minimum subarray length = i - j
  - For fixed i, maximize j to minimize length
  - Storing most recent index for each remainder gives smallest subarray

- **Algorithm Steps**:
  1. Calculate total sum and remainderToRemove
  2. If remainder is 0, return 0 immediately
  3. Iterate through array, maintaining running prefix remainder
  4. For each position, compute target prefix remainder needed
  5. If target exists in map, update minimum length
  6. Update map with current prefix remainder and index

- **Example Walkthrough** ([3,1,4,2], p=6):
  - Total = 10, remainderToRemove = 10 % 6 = 4
  - Map initialized: {0: -1}
  - i=0: prefix=3, target=(3-4+6)%6=5, not found. Map: {0:-1, 3:0}
  - i=1: prefix=4, target=(4-4+6)%6=0, found at -1! len=1-(-1)=2. Map: {0:-1, 3:0, 4:1}
  - i=2: prefix=8%6=2, target=(2-4+6)%6=4, found at 1! len=2-1=1. Map: {..., 2:2}
  - i=3: prefix=10%6=4, target=(4-4+6)%6=0, found at -1! len=3-(-1)=4
  - Minimum = 1 (remove [4] at index 2)

- **Edge Cases Handled**:
  - Already divisible: return 0
  - Must remove entire array: return -1 (not allowed)
  - Empty prefix: {0: -1} allows removing prefix subarray [0..i]

# Complexity
- Time complexity: $$O(n)$$
  - Initial sum calculation: O(n)
  - Single pass through array: O(n)
  - Map operations: O(1) average
  - Total: O(n)

- Space complexity: $$O(min(n, p))$$
  - Map stores at most min(n, p) unique remainders
  - Remainders range from 0 to p-1
  - Total: O(min(n, p))

# Code
```typescript
const minSubarray = (nums: number[], p: number): number => {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);
    const remainderToRemove = totalSum % p;

    if (remainderToRemove === 0) return 0;

    const prefixRemainderToIndex = new Map<number, number>();
    prefixRemainderToIndex.set(0, -1);

    let currentPrefixRemainder = 0;
    let minSubarrayLength = nums.length;

    for (let i = 0; i < nums.length; i++) {
        currentPrefixRemainder = (currentPrefixRemainder + nums[i]) % p;
        const targetPrefixRemainder = (currentPrefixRemainder - remainderToRemove + p) % p;

        if (prefixRemainderToIndex.has(targetPrefixRemainder)) {
            const subarrayLength = i - prefixRemainderToIndex.get(targetPrefixRemainder)!;
            minSubarrayLength = Math.min(minSubarrayLength, subarrayLength);
        }

        prefixRemainderToIndex.set(currentPrefixRemainder, i);
    }

    return minSubarrayLength === nums.length ? -1 : minSubarrayLength;
};
```