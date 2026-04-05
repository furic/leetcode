const findGoodIntegers = (n: number): number[] => {
    const pairCount = new Map<number, number>();

    for (let a = 1; a ** 3 * 2 <= n; a++) {       // a³ + b³ ≥ 2a³, so 2a³ ≤ n
        for (let b = a; a ** 3 + b ** 3 <= n; b++) {
            const sum = a ** 3 + b ** 3;
            pairCount.set(sum, (pairCount.get(sum) ?? 0) + 1);
        }
    }

    return [...pairCount.entries()]
        .filter(([, count]) => count >= 2)
        .map(([sum]) => sum)
        .sort((x, y) => x - y);
};