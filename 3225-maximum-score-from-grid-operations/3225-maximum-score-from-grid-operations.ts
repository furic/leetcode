const maximumScore = (grid: number[][]): number => {
    const n = grid.length;
    if (n === 1) return 0;

    let dp0 = new Array(n + 1).fill(0);
    let dp1 = new Array(n + 1).fill(0);

    for (let col = 1; col < n; col++) {
        const newDp0 = new Array(n + 1).fill(0);
        const newDp1 = new Array(n + 1).fill(0);

        for (let i = 0; i <= n; i++) {
            let prevColSum = 0;
            let currColSum = 0;
            for (let x = 0; x < i; x++) currColSum += grid[x][col];

            for (let row = 0; row <= n; row++) {
                if (row > 0 && row <= i) currColSum -= grid[row - 1][col];
                if (row > i)             prevColSum += grid[row - 1][col - 1];

                newDp0[row] = Math.max(newDp0[row], prevColSum + dp0[i], dp1[i]);
                newDp1[row] = Math.max(newDp1[row], currColSum + dp1[i], currColSum + prevColSum + dp0[i]);
            }
        }

        dp0 = newDp0;
        dp1 = newDp1;
    }

    return Math.max(...dp1);
};