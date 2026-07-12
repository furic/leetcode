const arrayRankTransform = (arr: number[]): number[] => {
    const rank = new Map<number, number>();
    [...new Set(arr)].sort((a, b) => a - b).forEach((val, i) => rank.set(val, i + 1));
    return arr.map(n => rank.get(n)!);
};