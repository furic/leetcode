function furthestDistanceFromOrigin(moves: string): number {
    let L = 0, R = 0, B = 0;

    for (let c of moves) {
        if (c === 'L') {
            L++;
        } else if (c === 'R') {
            R++;
        } else {
            B++;
        }
    }

    return Math.abs(L - R) + B;
}