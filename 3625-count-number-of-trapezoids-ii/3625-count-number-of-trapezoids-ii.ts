function countTrapezoids(points: number[][]): number {
    const n: number = points.length;
    const inf: number = 1e9 + 7;
    const slopeToIntercept: Map<number, number[]> = new Map();
    const midToSlope: Map<number, number[]> = new Map();
    let ans: number = 0;

    for (let i = 0; i < n; i++) {
        const [x1, y1] = points[i];
        for (let j = i + 1; j < n; j++) {
            const [x2, y2] = points[j];
            const dx = x1 - x2;
            const dy = y1 - y2;

            let k: number, b: number;
            if (x2 === x1) {
                k = inf;
                b = x1;
            } else {
                k = (y2 - y1) / (x2 - x1);
                b = (y1 * dx - x1 * dy) / dx;
            }

            const mid: number = (x1 + x2) * 10000 + (y1 + y2);
            if (!slopeToIntercept.has(k)) {
                slopeToIntercept.set(k, []);
            }
            if (!midToSlope.has(mid)) {
                midToSlope.set(mid, []);
            }
            slopeToIntercept.get(k)!.push(b);
            midToSlope.get(mid)!.push(k);
        }
    }

    for (const sti of slopeToIntercept.values()) {
        if (sti.length === 1) {
            continue;
        }
        const cnt: Map<number, number> = new Map();
        for (const bVal of sti) {
            cnt.set(bVal, (cnt.get(bVal) || 0) + 1);
        }

        let totalSum: number = 0;
        for (const count of cnt.values()) {
            ans += totalSum * count;
            totalSum += count;
        }
    }

    for (const mts of midToSlope.values()) {
        if (mts.length === 1) {
            continue;
        }
        const cnt: Map<number, number> = new Map();
        for (const kVal of mts) {
            cnt.set(kVal, (cnt.get(kVal) || 0) + 1);
        }

        let totalSum: number = 0;
        for (const count of cnt.values()) {
            ans -= totalSum * count;
            totalSum += count;
        }
    }

    return ans;
}