/**
 * Finds maximum sum of exactly 3 numbers whose sum is divisible by 3
 * Strategy: Track top 3 values for each remainder class (0, 1, 2 mod 3)
 * Valid triplets: (0,0,0), (1,1,1), (2,2,2), or (0,1,2) since remainders must sum to multiple of 3
 */
const maximumSum = (nums: number[]): number => {
    // Track top 3 largest values for each remainder class when divided by 3
    let largestRem0 = 0, secondRem0 = 0, thirdRem0 = 0;
    let largestRem1 = 0, secondRem1 = 0, thirdRem1 = 0;
    let largestRem2 = 0, secondRem2 = 0, thirdRem2 = 0;

    // Group numbers by remainder and maintain top 3 in each group
    for (const num of nums) {
        const remainder = num % 3;

        if (remainder === 0) {
            // Insert into top-3 for remainder 0 (maintaining sorted order)
            if (num > largestRem0) {
                thirdRem0 = secondRem0;
                secondRem0 = largestRem0;
                largestRem0 = num;
            } else if (num > secondRem0) {
                thirdRem0 = secondRem0;
                secondRem0 = num;
            } else if (num > thirdRem0) {
                thirdRem0 = num;
            }
        } else if (remainder === 1) {
            // Insert into top-3 for remainder 1
            if (num > largestRem1) {
                thirdRem1 = secondRem1;
                secondRem1 = largestRem1;
                largestRem1 = num;
            } else if (num > secondRem1) {
                thirdRem1 = secondRem1;
                secondRem1 = num;
            } else if (num > thirdRem1) {
                thirdRem1 = num;
            }
        } else { // remainder === 2
            // Insert into top-3 for remainder 2
            if (num > largestRem2) {
                thirdRem2 = secondRem2;
                secondRem2 = largestRem2;
                largestRem2 = num;
            } else if (num > secondRem2) {
                thirdRem2 = secondRem2;
                secondRem2 = num;
            } else if (num > thirdRem2) {
                thirdRem2 = num;
            }
        }
    }

    // Check all valid triplet combinations (remainders must sum to multiple of 3)
    let maxSum = 0;

    // Combination 1: Three numbers with remainder 0 (0+0+0=0, divisible by 3)
    if (thirdRem0 !== 0) {
        maxSum = Math.max(maxSum, largestRem0 + secondRem0 + thirdRem0);
    }

    // Combination 2: Three numbers with remainder 1 (1+1+1=3, divisible by 3)
    if (thirdRem1 !== 0) {
        maxSum = Math.max(maxSum, largestRem1 + secondRem1 + thirdRem1);
    }

    // Combination 3: Three numbers with remainder 2 (2+2+2=6, divisible by 3)
    if (thirdRem2 !== 0) {
        maxSum = Math.max(maxSum, largestRem2 + secondRem2 + thirdRem2);
    }

    // Combination 4: One from each remainder class (0+1+2=3, divisible by 3)
    if (largestRem0 !== 0 && largestRem1 !== 0 && largestRem2 !== 0) {
        maxSum = Math.max(maxSum, largestRem0 + largestRem1 + largestRem2);
    }

    return maxSum;
};

/**
 * Slower but more readable solution
 */
const maximumSumSlow = (nums: number[]): number => {
    const g = [[], [], []];
    nums.forEach((n) => g[n % 3].push(n));
    g.forEach((arr) => arr.sort((a, b) => b - a));

    let max = 0;

    const trySum = (r0, r1, r2) => {
        const cnt = [0, 0, 0];
        [r0, r1, r2].forEach((r) => cnt[r]++);

        if (
            g[0].length >= cnt[0] &&
            g[1].length >= cnt[1] &&
            g[2].length >= cnt[2]
        ) {
            const idx = [0, 0, 0];
            max = Math.max(
                max,
                [r0, r1, r2].reduce((s, r) => s + g[r][idx[r]++], 0)
            );
        }
    };

    trySum(0, 0, 0);
    trySum(1, 1, 1);
    trySum(2, 2, 2);
    trySum(0, 1, 2);

    return max;
};