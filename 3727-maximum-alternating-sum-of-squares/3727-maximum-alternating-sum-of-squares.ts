const maxAlternatingSum = (nums: number[]): number => {
    nums = nums.sort((a, b) => Math.abs(b) - Math.abs(a));
    let ans = 0, i = 0, left = 0, right = nums.length - 1;
    while (left <= right) {
        if (i % 2 === 0) {
            ans += nums[left] * nums[left];
            left++;
        } else {
            ans -= nums[right] * nums[right];
            right--;
        }
        i++;
    }
    return ans;
};