function judgeCircle(moves: string): boolean {
    let x = 0, y = 0;

    for (const m of moves) {
        if (m === 'R') x++;
        else if (m === 'L') x--;
        else if (m === 'U') y++;
        else if (m === 'D') y--;
    }

    return x === 0 && y === 0;
}