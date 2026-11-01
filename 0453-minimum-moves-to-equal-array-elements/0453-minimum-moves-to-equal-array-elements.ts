function minMoves(nums: number[]): number {
    const lo = Math.min(...nums);
    let moves = 0;
    for (let i = 0; i < nums.length; i++) moves += nums[i] - lo;
    return moves;
}