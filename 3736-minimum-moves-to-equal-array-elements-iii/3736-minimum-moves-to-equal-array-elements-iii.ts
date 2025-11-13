const minMoves = (nums: number[]): number => {
    const n = nums.length;
    const max = Math.max(...nums);
    const sum = nums.reduce((a, b) => a + b, 0);
    return n * max - sum;
};