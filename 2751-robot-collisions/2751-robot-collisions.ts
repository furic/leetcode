const survivedRobotsHealths = (
    positions: number[],
    healths: number[],
    directions: string
): number[] => {
    const n = positions.length;

    // Process robots in positional order to simulate collisions correctly
    const sortedIndices = Array.from({ length: n }, (_, i) => i)
        .sort((a, b) => positions[a] - positions[b]);

    const survived = new Array(n).fill(true);
    const rightStack: number[] = []; // Indices of live right-moving robots awaiting collision

    for (const idx of sortedIndices) {
        if (directions[idx] === 'R') {
            rightStack.push(idx);
        } else {
            // Left-moving robot: fight rightmost right-mover until one dies or stack empties
            while (rightStack.length) {
                const opponent = rightStack[rightStack.length - 1];

                if (healths[opponent] < healths[idx]) {
                    survived[opponent] = false;
                    rightStack.pop();
                    healths[idx]--;
                } else if (healths[opponent] > healths[idx]) {
                    survived[idx] = false;
                    healths[opponent]--;
                    break;
                } else {
                    survived[opponent] = false;
                    survived[idx] = false;
                    rightStack.pop();
                    break;
                }
            }
        }
    }

    const result: number[] = [];
    for (let i = 0; i < n; i++)
        if (survived[i]) result.push(healths[i]);

    return result;
};