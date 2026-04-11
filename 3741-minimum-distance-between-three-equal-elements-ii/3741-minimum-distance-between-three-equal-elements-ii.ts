const minimumDistance = (nums: number[]): number => {
    const n = nums.length;
    const latestIdx  = new Array(n + 1).fill(-1); // Most recent index seen for each value
    const secondIdx  = new Array(n + 1).fill(-1); // Second most recent index seen for each value
    let minDist = Infinity;

    for (let i = 0; i < n; i++) {
        const val = nums[i];
        if (secondIdx[val] !== -1)
            minDist = Math.min(minDist, i - secondIdx[val]);
        secondIdx[val] = latestIdx[val];
        latestIdx[val] = i;
    }

    return minDist === Infinity ? -1 : 2 * minDist;
};