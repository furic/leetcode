const findKDistantIndices = (nums: number[], key: number, k: number): number[] => {
    const res: number[] = [];
    let next = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] === key) {
            const start = Math.max(next, j - k);
            const end = Math.min(nums.length - 1, j + k);
            for (let i = start; i <= end; i++) res.push(i);
            next = end + 1;
        }
    }
    return res;
}