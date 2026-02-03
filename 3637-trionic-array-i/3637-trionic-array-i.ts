function isTrionic(nums: number[]): boolean {
    let i = 0, n = nums.length;

    // increasing sequence
    while (i + 1 < n && nums[i] < nums[i + 1]) { i++; }
    if (i === 0 || i === n - 1) return false;

    // decreasing sequence
    while (i + 1 < n && nums[i] > nums[i + 1]) { i++; }
    if (i === n - 1) return false;

    // increasing sequence again
    while (i + 1 < n && nums[i] < nums[i + 1]) { i++; }
    return i === n - 1;
}