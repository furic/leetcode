const longestOnes = (nums: number[], k: number): number => {
    let zeroCount = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeroCount++;

        if (zeroCount > k) {
            if (nums[left] === 0) zeroCount--;
            left++;
        }
    }

    return nums.length - left;
};