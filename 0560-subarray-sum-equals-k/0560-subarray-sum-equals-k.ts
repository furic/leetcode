const subarraySum = (nums: number[], k: number): number => {
    const prefixCounts = new Map<number, number>([[0, 1]]);
    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;
        count += prefixCounts.get(prefixSum - k) ?? 0;
        prefixCounts.set(prefixSum, (prefixCounts.get(prefixSum) ?? 0) + 1);
    }

    return count;
};