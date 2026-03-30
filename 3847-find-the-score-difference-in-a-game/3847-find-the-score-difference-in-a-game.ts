const scoreDifference = (nums: number[]): number => {
    const scores = [0, 0];
    let activeIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 1) activeIndex = 1 - activeIndex;
        if (i % 6 === 5) activeIndex = 1 - activeIndex;
        scores[activeIndex] += nums[i];
    }
    return scores[0] - scores[1];
};
