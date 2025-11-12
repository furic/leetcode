# GCD Shortest Subarray | 50 Lines | O(n² log M) | 2ms

# Intuition
To make all elements 1, we need at least one 1 in the array (or be able to create one). If we already have 1's, we can spread them to adjacent elements. If not, we need to find a subarray whose GCD is 1, reduce it to a single 1, then spread. If the entire array's GCD > 1, it's impossible.

# Approach
**GCD Analysis with Optimal Subarray Finding:**
- Check if 1's already exist (easy case)
- Check if GCD of entire array > 1 (impossible case)
- Find shortest subarray with GCD = 1 (to minimize operations)
- Calculate total operations needed

**Step-by-Step Process:**

1. **Count Existing 1's and Calculate Array GCD:**
   - Iterate through array
   - Count how many elements are already 1
   - Calculate GCD of entire array using Euclidean algorithm

2. **Case 1: Already Have 1's**
   - If `countOfOnes > 0`:
   - Each 1 can spread to one adjacent element per operation
   - Need to convert remaining `arrayLength - countOfOnes` elements
   - Return `arrayLength - countOfOnes`

3. **Case 2: GCD > 1 (Impossible)**
   - If `overallGCD > 1`:
   - All elements share a common factor > 1
   - GCD operation preserves this factor
   - Can never reach 1
   - Return -1

4. **Case 3: Need to Create a 1**
   - Find shortest subarray with GCD = 1
   - For each starting position:
     - Extend subarray, calculating running GCD
     - When GCD becomes 1, record length and break
     - Track minimum length found

5. **Calculate Total Operations:**
   - Let L = shortest subarray length with GCD = 1
   - **Phase 1:** Reduce subarray to single 1
     - Takes L-1 operations (reduce L elements to 1 element)
   - **Phase 2:** Spread 1 to remaining elements
     - Takes n-1 operations (propagate to all n elements)
   - **Total:** (L-1) + (n-1) = L + n - 2

**Why This Works:**

**GCD Properties:**
- gcd(a, gcd(b, c)) = gcd(gcd(a, b), c) (associative)
- If gcd(array) > 1, no operations can produce 1
- If any subarray has GCD = 1, we can create a 1

**Operation Mechanics:**
- Operation: replace element with gcd(element, neighbor)
- Once we have a 1: gcd(1, x) = 1 for any x
- So 1 can "propagate" to convert adjacent elements

**Shortest Subarray Optimality:**
- Smaller subarray → fewer operations to reduce it
- Example: subarray of length 2 with GCD=1 takes 1 operation
- Then n-1 more to spread

**Example Walkthrough (nums = [2,6,3,4]):**

**Step 1: Check existing 1's**
- countOfOnes = 0

**Step 2: Check overall GCD**
- overallGCD = gcd(2,6,3,4) = gcd(gcd(gcd(2,6),3),4) = gcd(gcd(2,3),4) = gcd(1,4) = 1
- GCD is 1, so possible

**Step 3: Find shortest subarray**
- [2,6]: gcd = 2
- [2,6,3]: gcd = 1 ✓ length = 3
- [6,3]: gcd = 3
- [6,3,4]: gcd = 1 ✓ length = 3
- [3,4]: gcd = 1 ✓ length = 2 (shortest!)
- [2]: gcd = 2
- [6]: gcd = 6
- [3]: gcd = 3
- [4]: gcd = 4

Shortest = 2 (subarray [3,4])

**Step 4: Calculate operations**
- L = 2, n = 4
- Total = L + n - 2 = 2 + 4 - 2 = 4

**Verification:**
```
[2,6,3,4]
→ [2,6,3,1]  (gcd(3,4)=1, 1 op)
→ [2,6,1,1]  (gcd(3,1)=1, 1 op)
→ [2,1,1,1]  (gcd(6,1)=1, 1 op)
→ [1,1,1,1]  (gcd(2,1)=1, 1 op)
Total: 4 operations ✓
```

**Example 2 (nums = [2,10,6,14]):**

- All elements are even (divisible by 2)
- overallGCD = gcd(2,10,6,14) = 2
- Since GCD > 1, impossible
- Return -1 ✓

**Key Insights:**

**Why Shortest Subarray:**
- Longer subarray → more operations to reduce
- We want to minimize reduction phase
- Spreading phase is fixed at n-1

**Euclidean Algorithm:**
- Efficient GCD calculation: O(log(min(a,b)))
- Iterative version avoids recursion overhead

**GCD of Sequence:**
- gcd(a,b,c,...) computed incrementally
- Start with 0 (identity: gcd(0,x) = x)
- Accumulate: gcd(gcd(a,b),c)

**Edge Cases:**

**Single element:**
- nums = [1]: already all 1's, return 0
- nums = [2]: GCD > 1, return -1

**All 1's:**
- countOfOnes = n
- Return n - n = 0 ✓

**Mix of 1's and others:**
- Already have some 1's
- Return n - countOfOnes

**Array of primes:**
- Any two different primes: GCD = 1
- Shortest subarray = 2
- Can always solve

**Powers of same prime:**
- nums = [4,8,16] = [2²,2³,2⁴]
- GCD = 4 (or 2, depending)
- If GCD > 1, impossible

**Alternative Approaches:**

**BFS/DFS exploration:**
- Explore all possible operation sequences
- Exponential time
- Our GCD analysis much faster

**Greedy by value:**
- Try operations on smallest values first?
- Not obviously optimal
- Our approach finds theoretical minimum

**Mathematical lower bound:**
- Must be at least n-1 (spread phase)
- Our formula captures exact minimum

# Complexity
- Time complexity: $$O(n^2 \log M)$$ where M = max(nums) - nested loops for subarray check, each GCD is O(log M)
- Space complexity: $$O(1)$$ - only using variables for tracking

# Code
```typescript
const minOperations = (nums: number[]): number => {
    const arrayLength = nums.length;
    let countOfOnes = 0;
    let overallGCD = 0;

    const calculateGCD = (a: number, b: number): number => {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    for (const value of nums) {
        if (value === 1) {
            countOfOnes++;
        }
        overallGCD = calculateGCD(overallGCD, value);
    }

    if (countOfOnes > 0) {
        return arrayLength - countOfOnes;
    }

    if (overallGCD > 1) {
        return -1;
    }

    let shortestSubarrayLength = arrayLength;
    
    for (let startIndex = 0; startIndex < arrayLength; startIndex++) {
        let subarrayGCD = 0;
        
        for (let endIndex = startIndex; endIndex < arrayLength; endIndex++) {
            subarrayGCD = calculateGCD(subarrayGCD, nums[endIndex]);
            
            if (subarrayGCD === 1) {
                const subarrayLength = endIndex - startIndex + 1;
                shortestSubarrayLength = Math.min(shortestSubarrayLength, subarrayLength);
                break;
            }
        }
    }

    return shortestSubarrayLength + arrayLength - 2;
};
```