const minMoves = (nums: number[]): number => {
    // Incrementing n-1 elements is the same as decrementing one element,
    // so every element has to come down to the minimum
    const minVal = Math.min(...nums);

    let moves = 0;
    for (const num of nums) moves += num - minVal;

    return moves;
};