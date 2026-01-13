function separateSquares(squares: number[][]): number {
    let lo = 1e18, hi = -1e18;
    let total = 0;
    for (const [, y, l] of squares) {
        if (y < lo) lo = y;
        if (y + l > hi) hi = y + l;
        total += l * l;
    }
    const target = total / 2;
    for (let it = 0; it < 80; it++) {
        const mid = (lo + hi) * 0.5;
        let below = 0;
        for (const [, y, l] of squares) {
            if (mid > y) {
                let h = mid - y;
                if (h > l) h = l;
                below += h * l;
            }
        }
        if (below < target) lo = mid;
        else hi = mid;
    }
    return lo;
}