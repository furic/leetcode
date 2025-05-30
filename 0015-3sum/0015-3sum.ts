const threeSum = (nums: number[]): number[][] => {
    nums = nums.sort((a, b) => a - b);
    const result: number[][] = [];
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        const target = -nums[i];
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[left] + nums[right];
            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};