const furthestDistanceFromOrigin = (moves: string): number => {
    let position = 0;
    let wildcards = 0;

    for (const move of moves) {
        if      (move === 'L') position--;
        else if (move === 'R') position++;
        else                   wildcards++;
    }

    // Wildcards all go in the direction of net movement to maximise distance
    return Math.abs(position) + wildcards;
};