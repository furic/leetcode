function stoneGameV(stoneValue: number[]): number {
    const n: number = stoneValue.length;

    const prefix: number[] = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + stoneValue[i - 1];
    }

    const search = (leftBound: number, rightBound: number): number => {
        const total: number = prefix[rightBound + 1] - prefix[leftBound];

        const start: number = leftBound;

        let left: number = leftBound;
        let right: number = rightBound;

        while (left < right) {
            const mid: number = left + Math.floor((right - left) / 2);

            const leftSum: number = prefix[mid + 1] - prefix[start];

            if (leftSum * 2 >= total) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left;
    };

    const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    const left: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    const right: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        left[i][i] = stoneValue[i];
        right[i][i] = stoneValue[i];
    }

    for (let length = 1; length < n; length++) {
        for (let i = 0; i < n - length; i++) {
            const j: number = i + length;

            const k: number = search(i, j);

            const total: number = prefix[j + 1] - prefix[i];

            const leftHalf: number = prefix[k + 1] - prefix[i];

            if (leftHalf * 2 === total) {
                dp[i][j] = Math.max(left[i][k], right[k + 1][j]);
            } else {
                const leftBest: number = k === i ? 0 : left[i][k - 1];

                const rightBest: number = k === j ? 0 : right[k + 1][j];

                dp[i][j] = Math.max(leftBest, rightBest);
            }

            left[i][j] = Math.max(left[i][j - 1], total + dp[i][j]);

            right[i][j] = Math.max(right[i + 1][j], total + dp[i][j]);
        }
    }

    return dp[0][n - 1];
};