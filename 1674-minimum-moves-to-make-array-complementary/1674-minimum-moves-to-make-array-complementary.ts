const minMoves = (nums: number[], limit: number): number => {
    const n = nums.length;
    const delta = new Int32Array((limit << 1) + 2);

    for (let i = 0; i < n >> 1; i++) {
        const min = Math.min(nums[i], nums.at(-1 - i));
        const max = Math.max(nums[i], nums.at(-1 - i));

        delta[2] += 2;
        delta[min + 1]--;
        delta[min + max]--;
        delta[min + max + 1]++;
        delta[max + limit + 1]++;
    }

    let res = n, moves = 0;

    for (let targ = 2; targ <= limit * 2; targ++) {
        moves += delta[targ];
        res = Math.min(res, moves);
    }

    return res;
};