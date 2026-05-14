const isGood = (nums: number[]): boolean => {
    const n = nums.length; // base[n-1] has length n, so target n = nums.length - 1
    const freq = new Array(n).fill(0);

    for (const val of nums) {
        if (val >= n) return false;           // out of range for base[n-1]
        if (++freq[val] > (val === n - 1 ? 2 : 1)) return false; // n-1 appears twice, others once
    }

    return true;
};