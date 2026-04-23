const distance = (nums: number[]): number[] => {
    const n = nums.length;
    const groups = new Map<number, number[]>();

    for (let i = 0; i < n; i++) {
        if (!groups.has(nums[i])) groups.set(nums[i], []);
        groups.get(nums[i])!.push(i);
    }

    const result = new Array(n).fill(0);

    for (const group of groups.values()) {
        const groupSize = group.length;
        let totalIdx = group.reduce((sum, idx) => sum + idx, 0);
        let prefixSum = 0;

        for (let i = 0; i < groupSize; i++) {
            const idx = group[i];
            // Left elements contribute (idx*i - prefixSum), right contribute (totalIdx - prefixSum - idx*(groupSize-i))
            result[idx] = totalIdx - prefixSum * 2 + idx * (2 * i - groupSize);
            prefixSum += idx;
        }
    }

    return result;
};