function maxSumTrionic(nums: number[]): number {
    const n = nums.length;

    const inc = Array(n).fill(-Infinity);
    const incDec = Array(n).fill(-Infinity);
    const incDecInc = Array(n).fill(-Infinity);

    let ans = -Infinity;

    for (let i = 1; i < n; i++) {
        // 1. Strictly increasing (l...p)
        if (nums[i] > nums[i - 1]) {
            // Start a new sequence or continue an existing increasing one
            inc[i] = Math.max(nums[i - 1] + nums[i], inc[i - 1] + nums[i]);
        }

        // 2. Strictly decreasing (p...q)
        if (nums[i] < nums[i - 1]) {
            // Must transition from Phase 1 OR continue Phase 2
            const fromInc = inc[i - 1] !== -Infinity ? inc[i - 1] + nums[i] : -Infinity;
            const cont = incDec[i - 1] !== -Infinity ? incDec[i - 1] + nums[i] : -Infinity;
            incDec[i] = Math.max(fromInc, cont);
        }

        // 3. Strictly increasing (q...r)
        if (nums[i] > nums[i - 1]) {
            // Must transition from Phase 2 OR continue Phase 3
            const fromDec = incDec[i - 1] !== -Infinity ? incDec[i - 1] + nums[i] : -Infinity;
            const cont = incDecInc[i - 1] !== -Infinity ? incDecInc[i - 1] + nums[i] : -Infinity;
            incDecInc[i] = Math.max(fromDec, cont);
        }

        ans = Math.max(ans, incDecInc[i]);
    }

    return ans;
}