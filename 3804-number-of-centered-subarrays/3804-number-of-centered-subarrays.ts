const centeredSubarrays = (nums: number[]): number => {
    const n = nums.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        const elements = new Set<number>();
        let sum = 0;

        for (let j = i; j < n; j++) {
            sum += nums[j];
            elements.add(nums[j]);

            if (elements.has(sum)) {
                count++;
            }
        }
    }
    return count;
};