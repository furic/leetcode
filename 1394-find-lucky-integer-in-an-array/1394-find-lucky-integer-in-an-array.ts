const findLucky = (arr: number[]): number =>
    Math.max(...[...arr.reduce((m, n) => m.set(n, (m.get(n) || 0) + 1), new Map<number, number>())]
        .filter(([k, v]) => k === v)
        .map(([k]) => k), -1);