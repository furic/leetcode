const minimizeMax = (nums: number[], p: number): number => {
    if (p === 0) return 0;

    nums.sort((a, b) => a - b);
    const n = nums.length;

    let low = 0;
    let high = nums[n - 1] - nums[0];

    const canFormPairs = (maxDiff: number): boolean => {
        let count = 0;
        let i = 1;
        while (i < n) {
            if (nums[i] - nums[i - 1] <= maxDiff) {
                count++;
                i += 2; // use both nums[i-1] and nums[i]
            } else {
                i += 1;
            }
        }
        return count >= p;
    };

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (canFormPairs(mid)) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }

    return low;
};