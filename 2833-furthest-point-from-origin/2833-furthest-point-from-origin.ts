function furthestDistanceFromOrigin(moves: string): number {
    let a = 0, B = 0;

    for (let c of moves) {
        if (c === 'L') {
            a--;
        } else if (c === 'R') {
            a++;
        } else {
            B++;
        }
    }

    return Math.abs(a) + B;
}