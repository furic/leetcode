const maxArea = (coords: number[][]): number => {
    const n = coords.length;
    if (n < 3) return -1;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let horizontal = new Map<number, { minX: number, maxX: number }>();
    let vertical = new Map<number, { minY: number, maxY: number }>();

    for (let [x, y] of coords) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);

        if (horizontal.has(y)) {
            let obj = horizontal.get(y)!;
            obj.minX = Math.min(obj.minX, x);
            obj.maxX = Math.max(obj.maxX, x);
        } else {
            horizontal.set(y, { minX: x, maxX: x });
        }

        if (vertical.has(x)) {
            let obj = vertical.get(x)!;
            obj.minY = Math.min(obj.minY, y);
            obj.maxY = Math.max(obj.maxY, y);
        } else {
            vertical.set(x, { minY: y, maxY: y });
        }
    }

    let best = 0;

    for (let [y, obj] of horizontal) {
        const base = obj.maxX - obj.minX;
        if (base <= 0) continue;
        const h1 = maxY - y;
        const h2 = y - minY;
        const height = Math.max(h1, h2);
        if (height <= 0) continue;
        const candidate = base * height;
        if (candidate > best) best = candidate;
    }

    for (let [x, obj] of vertical) {
        const base = obj.maxY - obj.minY;
        if (base <= 0) continue;
        const h1 = maxX - x;
        const h2 = x - minX;
        const height = Math.max(h1, h2);
        if (height <= 0) continue;
        const candidate = base * height;
        if (candidate > best) best = candidate;
    }

    return best === 0 ? -1 : best;
};