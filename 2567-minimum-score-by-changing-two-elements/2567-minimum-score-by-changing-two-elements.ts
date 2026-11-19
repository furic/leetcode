const keepSmallest3 = (smallest3: number[], value: number): void => {  // smallest3: the 3 smallest values so far, ascending
    if (value >= smallest3[2]) return;

    let pos = 2;
    for (; pos > 0 && smallest3[pos - 1] > value; pos--) smallest3[pos] = smallest3[pos - 1];
    smallest3[pos] = value;
};

const minimizeSum = (nums: number[]): number => {
    const lowest = [Infinity, Infinity, Infinity];          // the 3 smallest values
    const negatedHighest = [Infinity, Infinity, Infinity];  // the 3 smallest of -x, i.e. the 3 largest values negated

    for (const num of nums) {
        keepSmallest3(lowest, num);
        keepSmallest3(negatedHighest, -num);
    }

    const min1 = lowest[0], min2 = lowest[1], min3 = lowest[2];
    const max1 = -negatedHighest[0], max2 = -negatedHighest[1], max3 = -negatedHighest[2];

    // The low score can always become 0 (copy one value onto another), so only the max - min spread matters.
    // Changing two elements removes two extremes: two largest, one of each, or two smallest.
    return Math.min(max3 - min1, max2 - min2, max1 - min3);
};