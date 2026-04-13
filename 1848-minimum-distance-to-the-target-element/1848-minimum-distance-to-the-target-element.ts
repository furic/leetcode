function getMinDistance(nums: number[], target: number, start: number): number {
    let minDist: number = Infinity;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            minDist = Math.min(minDist, Math.abs(i - start));
        }
    }
    return minDist;
};