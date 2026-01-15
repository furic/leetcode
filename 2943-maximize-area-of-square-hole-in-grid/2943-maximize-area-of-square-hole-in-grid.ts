function maximizeSquareHoleArea(n: number, m: number, hBars: number[], vBars: number[]): number {
    const longest = (a: number[]): number => {
        a.sort((x, y) => x - y);
        let best = 1, cur = 1;
        for (let i = 1; i < a.length; i++) {
            if (a[i] === a[i - 1] + 1) cur++;
            else cur = 1;
            if (cur > best) best = cur;
        }
        return best + 1;
    };

    const side = Math.min(longest(hBars), longest(vBars));
    return side * side;
}