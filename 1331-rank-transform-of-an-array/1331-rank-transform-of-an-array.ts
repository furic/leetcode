function arrayRankTransform(arr: number[]): number[] {
    const rankMap = new Map<number, number>();
    const sortedArray = [...arr].sort((a, b) => a - b);

    let rank = 1;

    for (const x of sortedArray) {
        if (!rankMap.has(x)) {
            rankMap.set(x, rank);
            rank++;
        }
    }

    return arr.map(x => rankMap.get(x)!);
}