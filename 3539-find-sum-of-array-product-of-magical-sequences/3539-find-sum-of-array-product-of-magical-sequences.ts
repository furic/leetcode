const magicalSum = (m: number, k: number, nums: number[]): number => {
    const numsLength = nums.length;
    const MOD = 1000000007n;

    // Precompute factorials: factorial[i] = i!
    const factorial: bigint[] = new Array(m + 1).fill(1n);
    for (let i = 1; i <= m; i++) {
        factorial[i] = (factorial[i - 1] * BigInt(i)) % MOD;
    }

    // Precompute inverse factorials: invFactorial[i] = 1/i!
    const invFactorial: bigint[] = new Array(m + 1).fill(1n);
    for (let i = 2; i <= m; i++) {
        invFactorial[i] = modularExponentiation(BigInt(i), MOD - 2n, MOD);
    }
    for (let i = 2; i <= m; i++) {
        invFactorial[i] = (invFactorial[i - 1] * invFactorial[i]) % MOD;
    }

    // Precompute powers: numsPowers[i][j] = nums[i]^j
    const numsPowers: bigint[][] = new Array(numsLength);
    for (let numIndex = 0; numIndex < numsLength; numIndex++) {
        numsPowers[numIndex] = new Array(m + 1).fill(1n);
        for (let power = 1; power <= m; power++) {
            numsPowers[numIndex][power] = 
                (numsPowers[numIndex][power - 1] * BigInt(nums[numIndex])) % MOD;
        }
    }

    // DP table: dp[position][usedCount][powerSum][setBits]
    // - position: current position in nums array
    // - usedCount: how many elements from this position have been used
    // - powerSum: sum of 2^(indices) for tracking set bits
    // - setBits: current count of set bits in the binary sum
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

    // Base case: first element with different usage counts
    for (let usedCount = 0; usedCount <= m; usedCount++) {
        dp[0][usedCount][usedCount][0] = 
            (numsPowers[0][usedCount] * invFactorial[usedCount]) % MOD;
    }

    // Fill DP table
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

                    // Try using 0 to (m - usedCount) copies of next element
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

    // Collect results: sum all valid states at the last position
    let totalSum = 0n;
    for (let powerSum = 0; powerSum <= m * 2; powerSum++) {
        for (let setBits = 0; setBits <= k; setBits++) {
            // Valid if total set bits equals k
            if (countSetBits(powerSum) + setBits === k) {
                totalSum = (totalSum + 
                    ((dp[numsLength - 1][m][powerSum][setBits] * factorial[m]) % MOD)) % MOD;
            }
        }
    }

    return Number(totalSum);
};

// Fast modular exponentiation: compute (base^exponent) % modulo
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

// Count number of set bits (1s) in binary representation
const countSetBits = (num: number): number => {
    let count = 0;
    while (num > 0) {
        count += num & 1;
        num >>= 1;
    }
    return count;
};