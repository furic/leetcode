const countHillValley = (nums: number[]): number => {
    let hillValleyCount = 0;
    let lastUniqueIndex = 0;

    for (let current = 1; current < nums.length - 1; current++) {
        if (nums[current] === nums[current + 1]) continue;

        const left = nums[lastUniqueIndex];
        const center = nums[current];
        const right = nums[current + 1];

        const isHill = center > left && center > right;
        const isValley = center < left && center < right;

        if (isHill || isValley) hillValleyCount++;

        lastUniqueIndex = current;
    }

    return hillValleyCount;
};