const search = (nums: number[], target: number): number => {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] === target) return mid;

        if (nums[lo] <= nums[mid]) {
            // Left half is sorted
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else                                          lo = mid + 1;
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else                                          hi = mid - 1;
        }
    }

    return -1;
};