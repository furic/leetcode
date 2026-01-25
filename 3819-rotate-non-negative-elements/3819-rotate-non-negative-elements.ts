const rotateElements = (nums: number[], k: number): number[] => {
    const n = nums.length;

    let positives: number[] = [];
    for (let i = 0; i < n; i++) {
        if (nums[i] >= 0) {
            positives.push(nums[i]);
        }
    }

    if (positives.length === 0) return nums;

    const rotateCount = k % positives.length;
    positives = [
        ...positives.slice(rotateCount),
        ...positives.slice(0, rotateCount),
    ];

    let j = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] >= 0) {
            nums[i] = positives[j++];
        }
    }

    return nums;
};
