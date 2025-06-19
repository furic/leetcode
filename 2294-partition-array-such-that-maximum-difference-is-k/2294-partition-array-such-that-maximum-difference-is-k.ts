const partitionArray = (nums: number[], k: number): number => {
    nums.sort((a, b) => a - b);
    let ans = 1;
    let left = nums[0];
    for (let num of nums) {
        if (num - left > k) {
            ans++;
            left = num;
        }
    }
    return ans;
};