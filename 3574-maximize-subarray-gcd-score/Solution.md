# Subarray GCD with Doubling | 38 Lines | O(n²log V) | 736ms

# Intuition
The score is length × GCD, and we can double up to k elements. Doubling an element multiplies it by 2, which can potentially increase the GCD. The key insight is that the GCD can only increase if we can double all the "bottleneck" elements - those whose power of 2 divisor is smallest. We can track this efficiently by finding the lowest bit set in each number, which represents the highest power of 2 dividing it.

# Approach
I'll use a two-pointer subarray enumeration with GCD and power-of-2 tracking:

1. **Enumerate All Subarrays**: For each starting position i, extend to all ending positions j, maintaining the subarray GCD incrementally.

2. **Track Power of 2 Divisors**: For each element, find its lowest set bit using `num & -num`. This represents the highest power of 2 that divides the number. Track the minimum such power across the subarray.

3. **Determine Doubling Benefit**: The GCD can double only if we can double all elements with the minimum power of 2. If there are ≤ k such elements, doubling is beneficial and GCD doubles.

4. **Score Calculation**: For each subarray:
   - Calculate base score: length × GCD
   - If we can double the bottleneck elements (count ≤ k), multiply by 2
   - Track the maximum score

5. **Optimization**: By processing subarrays incrementally and maintaining GCD/power tracking, we avoid redundant calculations.

# Complexity
- Time complexity: $$O(n^2 \log V)$$
  - Enumerate O(n²) subarrays
  - For each subarray, GCD calculation takes O(log V) where V is the maximum value
  - Lowest bit extraction is O(1)
  - Total: O(n² log V)

- Space complexity: $$O(1)$$
  - Only using constant extra variables for tracking GCD, min power, counts
  - No additional data structures that scale with input size
  - All computations done with primitive operations

# Code
```typescript []
const maxGCDScore = (nums: number[], k: number): number => {
    const n = nums.length;
    let maxScore = 0;
    
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };
    
    for (let i = 0; i < n; i++) {
        let subarrayGCD = nums[i];
        let minPowerOfTwo = Number.MAX_SAFE_INTEGER;
        let elementsWithMinPower = 0;
        
        for (let j = i; j < n; j++) {
            subarrayGCD = gcd(subarrayGCD, nums[j]);
            
            const lowestBit = nums[j] & -nums[j];
            
            if (lowestBit < minPowerOfTwo) {
                minPowerOfTwo = lowestBit;
                elementsWithMinPower = 1;
            } else if (lowestBit === minPowerOfTwo) {
                elementsWithMinPower++;
            }
            
            const canDoubleGCD = elementsWithMinPower <= k;
            const subarrayLength = j - i + 1;
            const score = subarrayGCD * (canDoubleGCD ? 2 : 1) * subarrayLength;
            
            maxScore = Math.max(maxScore, score);
        }
    }
    
    return maxScore;
};
```