const maximumProduct = (nums, m) => {
    if (m === 1) {
        let ans = nums[0] * nums[0];
        for (let i = 1; i < nums.length; i++) {
            let sq = nums[i] * nums[i];
            if (sq > ans) ans = sq;
        }
        return ans;
    }
    const n = nums.length;
    let maxFrom = new Array(n);
    let minFrom = new Array(n);
    maxFrom[n - 1] = nums[n - 1];
    minFrom[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxFrom[i] = Math.max(nums[i], maxFrom[i + 1]);
        minFrom[i] = Math.min(nums[i], minFrom[i + 1]);
    }
    let ans = -Infinity;
    for (let i = 0; i <= n - m; i++) {
        let j = i + m - 1;
        let candidate1 = nums[i] * maxFrom[j];
        let candidate2 = nums[i] * minFrom[j];
        let candidate = Math.max(candidate1, candidate2);
        if (candidate > ans) {
            ans = candidate;
        }
    }
    return ans;
};