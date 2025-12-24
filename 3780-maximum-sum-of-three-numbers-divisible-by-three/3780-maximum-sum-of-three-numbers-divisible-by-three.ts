const maximumSum = (nums: number[]): number => {
    const g = [[], [], []];
    nums.forEach((n) => g[n % 3].push(n));
    g.forEach((arr) => arr.sort((a, b) => b - a));

    let max = 0;

    const trySum = (r0, r1, r2) => {
        const cnt = [0, 0, 0];
        [r0, r1, r2].forEach((r) => cnt[r]++);

        if (
            g[0].length >= cnt[0] &&
            g[1].length >= cnt[1] &&
            g[2].length >= cnt[2]
        ) {
            const idx = [0, 0, 0];
            max = Math.max(
                max,
                [r0, r1, r2].reduce((s, r) => s + g[r][idx[r]++], 0)
            );
        }
    };

    trySum(0, 0, 0);
    trySum(1, 1, 1);
    trySum(2, 2, 2);
    trySum(0, 1, 2);

    return max;
};
