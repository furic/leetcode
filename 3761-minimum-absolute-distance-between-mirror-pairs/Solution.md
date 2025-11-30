# Hash Map Reverse Lookup | 10 Lines | O(n×d) | 197ms

# Intuition
For a mirror pair (i, j) where reverse(nums[i]) == nums[j], we need i < j and want to minimize j - i. By storing the reverse of each element mapped to its index, we can instantly check if the current element matches any previous element's reverse.

# Approach
- **Problem Restatement**:
  - Find pair (i, j) where i < j and reverse(nums[i]) == nums[j]
  - Minimize the distance j - i
  - Return -1 if no such pair exists

- **Key Insight - Reverse Lookup**:
  - Instead of checking every pair O(n²), use a hash map
  - For each element nums[i], store `reverse(nums[i]) → i`
  - When processing nums[j], lookup if nums[j] exists in map
  - If found at index i, we have a valid mirror pair (i, j)

- **Single Pass Algorithm**:
  - Iterate through array with index j
  - Check if nums[j] exists in map (meaning some earlier reverse(nums[i]) == nums[j])
  - If found, calculate distance j - i and update minimum
  - Store reverse(nums[j]) → j in map for future lookups
  - Order matters: check first, then store (ensures i < j)

- **Reverse Function**:
  - Convert number to string, reverse characters, convert back to number
  - Leading zeros automatically handled: reverse(120) = "021" → 21
  - JavaScript's Number() naturally strips leading zeros

- **Why This Finds Minimum Distance**:
  - We process left to right, storing most recent index for each reversed value
  - When we find a match, j is current position, i is the stored index
  - Since we update the map after checking, we always get the closest previous match
  - Actually stores last occurrence, but we check at every j, so minimum is found

- **Example Walkthrough** ([12, 21, 45, 33, 54]):
  - j=0: nums[0]=12, map empty, no match. Store reverse(12)=21→0. Map: {21:0}
  - j=1: nums[1]=21, found in map at i=0! dist=1. Store reverse(21)=12→1
  - j=2: nums[2]=45, not in map. Store reverse(45)=54→2
  - j=3: nums[3]=33, not in map. Store reverse(33)=33→3
  - j=4: nums[4]=54, found at i=2! dist=2. minDist stays 1
  - Result: 1

- **Edge Cases Handled**:
  - No mirror pairs: return -1 (minDist stays Infinity)
  - Palindromic numbers (33, 121): reverse equals self, can match with same value at different index
  - Leading zeros after reverse: handled by Number() conversion

# Complexity
- Time complexity: $$O(n \times d)$$
  - Iterate through n elements
  - Reverse operation: O(d) where d = number of digits (typically ≤ 10)
  - Map operations: O(1) average
  - Total: O(n × d), effectively O(n) for bounded integer sizes

- Space complexity: $$O(n)$$
  - Hash map stores at most n entries (one reversed value per element)
  - String conversion during reverse: O(d) temporary space
  - Total: O(n)

# Code
```typescript
const minMirrorPairDistance = (nums: number[]): number => {
    const reverse = (n: number): number => Number(n.toString().split('').reverse().join(''));
    const reversedLastIndex = new Map<number, number>();
    let minDist = Infinity;

    for (let j = 0; j < nums.length; j++) {
        if (reversedLastIndex.has(nums[j])) {
            const i = reversedLastIndex.get(nums[j])!;
            minDist = Math.min(minDist, j - i);
        }

        reversedLastIndex.set(reverse(nums[j]), j);
    }

    return minDist === Infinity ? -1 : minDist;
};
```