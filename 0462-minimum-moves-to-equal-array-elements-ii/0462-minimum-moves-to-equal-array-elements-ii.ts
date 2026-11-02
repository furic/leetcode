const minMoves2 = (nums: number[]): number => {
    nums.sort((a, b) => a - b);

    // The median minimizes the sum of absolute differences
    const median = nums[nums.length >> 1];

    let moves = 0;
    for (const num of nums) moves += Math.abs(num - median);

    return moves;
};