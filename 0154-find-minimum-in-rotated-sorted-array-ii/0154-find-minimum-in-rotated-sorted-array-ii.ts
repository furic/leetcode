const findMin = (nums: number[]): number => {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if      (nums[mid] > nums[hi]) lo = mid + 1;
        else if (nums[mid] < nums[hi]) hi = mid;
        else                           hi--;  // duplicate at hi: safe to shrink
    }

    return nums[lo];
};