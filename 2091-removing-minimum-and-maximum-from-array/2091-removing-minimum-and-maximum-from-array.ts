function minimumDeletions(nums: number[]): number {
    const n: number = nums.length;

    let minIndex: number = 0;
    let maxIndex: number = 0;

    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIndex]) {
            minIndex = i;
        }

        if (nums[i] > nums[maxIndex]) {
            maxIndex = i;
        }
    }

    const left: number = Math.min(minIndex, maxIndex);
    const right: number = Math.max(minIndex, maxIndex);

    return Math.min(
        right + 1,
        n - left,
        left + 1 + n - right
    );
};