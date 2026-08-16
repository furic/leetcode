const stoneGameIX = (stones: number[]): boolean => {
    const mod = [0, 0, 0];
    for (const stone of stones) mod[stone % 3]++;

    return mod[0] % 2 === 0
        ? mod[1] > 0 && mod[2] > 0
        : Math.abs(mod[1] - mod[2]) >= 3;
};