const minSum = (nums1: number[], nums2: number[]): number => {
    const proc = (nums: number[]) => {
        const zeros = nums.filter((x) => x === 0).length;
        return [
            zeros,
            nums.reduce((a, b) => a + b, 0) + zeros,
        ]
    }
    const [zeros1, sum1] = proc(nums1);
    const [zeros2, sum2] = proc(nums2);
    if ((zeros1 === 0 && sum1 < sum2) || (zeros2 === 0 && sum2 < sum1)) {
        return -1;
    }
    return Math.max(sum1, sum2);
};