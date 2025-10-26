const missingMultiple = (nums: number[], k: number): number => {
    nums.sort((a, b) => a - b);
    let ans = k;
    for (const num of nums) {
        if (num === ans) {
            ans += k;
        }
        if (num > ans) {
            return ans;
        }
    }
    return ans;
};
