const numSubseq = (nums: number[], target: number): number => {
    const MOD = 1e9 + 7;
    const n = nums.length;

    // Precompute powers of 2 up to n for subsequence counting
    const pow2: number[] = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        pow2[i] = (pow2[i - 1] * 2) % MOD;
    }

    nums.sort((a, b) => a - b);

    let left = 0;
    let right = n - 1;
    let totalSubsequences = 0;

    while (left <= right) {
        const minVal = nums[left];
        const maxVal = nums[right];

        if (minVal + maxVal <= target) {
            // All subsequences formed by elements between left and right
            // with min as nums[left] are valid
            totalSubsequences = (totalSubsequences + pow2[right - left]) % MOD;
            left++;
        } else {
            right--;
        }
    }

    return totalSubsequences;
};