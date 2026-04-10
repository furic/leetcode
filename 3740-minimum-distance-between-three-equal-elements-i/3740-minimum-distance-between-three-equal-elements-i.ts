const minimumDistance = (nums: number[]): number => {
    let minDist = nums.length + 1;

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            if (nums[i] !== nums[j]) continue;
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[k] === nums[j]) {
                    minDist = Math.min(minDist, k - i);
                    break;
                }
            }
        }
    }

    return minDist === nums.length + 1 ? -1 : minDist * 2;
};