# Multiset DP with Factorials | 109 Lines | O(n × m³ × k) | 410ms

# Intuition
We need to count sequences where indices form a specific bit pattern and sum their products. The key insight is that sequences can have repeated indices, so we're dealing with multisets. We can use dynamic programming to track how many times each element is used while maintaining the bit constraint.

# Approach
**Multiset DP with Factorial Counting:**
- Instead of tracking permutations explicitly, count how many times each element appears
- Use DP to build multisets position by position
- Track the binary sum constraint using the power sum (sum of 2^index for selected indices)
- Apply combinatorial corrections using factorials to account for permutations

**Step-by-Step Process:**

1. **Precompute Helper Arrays:**
   - `factorial[i]`: Store i! for combinatorial calculations
   - `invFactorial[i]`: Store modular inverse of i! for division in modular arithmetic
   - `numsPowers[i][j]`: Store nums[i]^j to avoid repeated exponentiations

2. **DP State Definition:**
   - `dp[pos][used][powerSum][setBits]` represents contribution sum where:
     - `pos`: Current position in nums array being considered
     - `used`: Total number of elements selected so far
     - `powerSum`: Running sum tracking 2^(selected indices) for bit counting
     - `setBits`: Count of set bits processed so far in the binary sum

3. **Base Case:**
   - At position 0, we can use element nums[0] between 0 and m times
   - Contribution = (nums[0]^count) / count! (dividing by factorial to avoid overcounting permutations initially)

4. **DP Transition:**
   - For each state, try adding 0 to (m - used) copies of nums[pos+1]
   - Update powerSum: shift right by 1 (dividing by 2) and add new uses
   - Update setBits: add 1 if current powerSum bit is set
   - Multiply contribution by (nums[pos+1]^additionalUses) / additionalUses!

5. **PowerSum Mechanics:**
   - powerSum tracks 2^i for each selected index i
   - When moving to next position, all previous indices effectively shift: 2^i becomes 2^(i-1)
   - This is implemented as `powerSum / 2`
   - Adding k uses at position pos+1 adds k to the powerSum (representing k indices at current bit position)

6. **Binary Constraint Check:**
   - At each transition, check if (powerSum % 2) + setBits ≤ k
   - This ensures we don't exceed k set bits before completion

7. **Final Collection:**
   - At position n-1 with exactly m elements used:
   - Count total set bits in final powerSum plus accumulated setBits
   - If equals k, multiply by m! (restore full permutation count) and add to result

**Why Factorial Division/Multiplication:**
- We divide by factorials during DP to work with multiset coefficients
- This prevents combinatorial explosion in intermediate states
- At the end, multiply by m! to get the count of all valid permutations
- This technique efficiently handles repeated elements in sequences

**Modular Arithmetic:**
- Use BigInt for precise modular calculations
- Compute modular inverses using Fermat's Little Theorem: a^(-1) ≡ a^(p-2) (mod p)
- All operations maintain values modulo 10^9 + 7

# Complexity
- Time complexity: $$O(n \times m^3 \times k)$$ where n = nums.length
- Space complexity: $$O(n \times m^2 \times k)$$ for DP table

# Code
```typescript
const magicalSum = (m: number, k: number, nums: number[]): number => {
    const numsLength = nums.length;
    const MOD = 1000000007n;

    const factorial: bigint[] = new Array(m + 1).fill(1n);
    for (let i = 1; i <= m; i++) {
        factorial[i] = (factorial[i - 1] * BigInt(i)) % MOD;
    }

    const invFactorial: bigint[] = new Array(m + 1).fill(1n);
    for (let i = 2; i <= m; i++) {
        invFactorial[i] = modularExponentiation(BigInt(i), MOD - 2n, MOD);
    }
    for (let i = 2; i <= m; i++) {
        invFactorial[i] = (invFactorial[i - 1] * invFactorial[i]) % MOD;
    }

    const numsPowers: bigint[][] = new Array(numsLength);
    for (let numIndex = 0; numIndex < numsLength; numIndex++) {
        numsPowers[numIndex] = new Array(m + 1).fill(1n);
        for (let power = 1; power <= m; power++) {
            numsPowers[numIndex][power] = 
                (numsPowers[numIndex][power - 1] * BigInt(nums[numIndex])) % MOD;
        }
    }

    const dp: bigint[][][][] = new Array(numsLength);
    for (let i = 0; i < numsLength; i++) {
        dp[i] = new Array(m + 1);
        for (let j = 0; j <= m; j++) {
            dp[i][j] = new Array(m * 2 + 1);
            for (let powerSum = 0; powerSum <= m * 2; powerSum++) {
                dp[i][j][powerSum] = new Array(k + 1).fill(0n);
            }
        }
    }

    for (let usedCount = 0; usedCount <= m; usedCount++) {
        dp[0][usedCount][usedCount][0] = 
            (numsPowers[0][usedCount] * invFactorial[usedCount]) % MOD;
    }

    for (let position = 0; position + 1 < numsLength; position++) {
        for (let usedCount = 0; usedCount <= m; usedCount++) {
            for (let powerSum = 0; powerSum <= m * 2; powerSum++) {
                for (let setBits = 0; setBits <= k; setBits++) {
                    if (dp[position][usedCount][powerSum][setBits] === 0n) {
                        continue;
                    }

                    const newSetBits = (powerSum % 2) + setBits;
                    if (newSetBits > k) {
                        break;
                    }

                    for (let additionalUses = 0; additionalUses + usedCount <= m; additionalUses++) {
                        const newPowerSum = Math.floor(powerSum / 2) + additionalUses;
                        if (newPowerSum > m * 2) {
                            break;
                        }

                        const contribution = 
                            (((dp[position][usedCount][powerSum][setBits] * 
                                numsPowers[position + 1][additionalUses]) % MOD) * 
                                invFactorial[additionalUses]) % MOD;

                        dp[position + 1][usedCount + additionalUses][newPowerSum][newSetBits] = 
                            (dp[position + 1][usedCount + additionalUses][newPowerSum][newSetBits] + 
                                contribution) % MOD;
                    }
                }
            }
        }
    }

    let totalSum = 0n;
    for (let powerSum = 0; powerSum <= m * 2; powerSum++) {
        for (let setBits = 0; setBits <= k; setBits++) {
            if (countSetBits(powerSum) + setBits === k) {
                totalSum = (totalSum + 
                    ((dp[numsLength - 1][m][powerSum][setBits] * factorial[m]) % MOD)) % MOD;
            }
        }
    }

    return Number(totalSum);
};

const modularExponentiation = (base: bigint, exponent: bigint, modulo: bigint): bigint => {
    let result = 1n;
    let currentPower = base % modulo;
    
    while (exponent > 0n) {
        if (exponent & 1n) {
            result = (result * currentPower) % modulo;
        }
        exponent >>= 1n;
        currentPower = (currentPower * currentPower) % modulo;
    }
    
    return result;
};

const countSetBits = (num: number): number => {
    let count = 0;
    while (num > 0) {
        count += num & 1;
        num >>= 1;
    }
    return count;
};
```