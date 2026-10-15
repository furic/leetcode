const sumCounts = (nums: number[]): number => {
    const n = nums.length;
    let total = 0;

    for (let start = 0; start < n; start++) {
        const seen = new Set<number>();
        for (let end = start; end < n; end++) {
            seen.add(nums[end]);
            total += seen.size * seen.size;
        }
    }

    return total;
};