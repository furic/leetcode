const smallestIndex = (nums: number[]): number => {
    for (let i = 0; i < nums.length; i++) {
        let digitSum = 0;
        for (let n = nums[i]; n > 0; n = Math.floor(n / 10))
            digitSum += n % 10;
        if (digitSum === i) return i;
    }
    return -1;
};