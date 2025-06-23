const minSwaps = (nums: number[]): number => {
    const n = nums.length;
    const isOdd = (x: number) => x % 2 !== 0;

    const oddPos: number[] = [],
        evenPos: number[] = [];
    for (let i = 0; i < n; i++) {
        if (isOdd(nums[i])) oddPos.push(i);
        else evenPos.push(i);
    }

    if (Math.abs(oddPos.length - evenPos.length) > 1) return -1;

    const expectedPos: number[] = [];
    for (let i = 0; i < n; i++) {
        if (!isOdd(i)) expectedPos.push(i);
    }

    const calcCost = (positions: number[]): number =>
        positions.reduce(
            (sum, pos, i) => sum + Math.abs(pos - expectedPos[i]),
            0
        );

    let res = Number.MAX_SAFE_INTEGER;
    if (oddPos.length >= evenPos.length) {
        res = Math.min(res, calcCost(oddPos));
    }
    if (evenPos.length >= oddPos.length) {
        res = Math.min(res, calcCost(evenPos)); // start with even
    }

    return res;
};
