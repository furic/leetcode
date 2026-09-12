function maximumWeight(intervals: number[][]): number[] {
    const n = intervals.length;
    const K = 4;

    const a: number[][] = intervals.map((x, i) => [x[0], x[1], x[2], i]);

    a.sort((x, y) => x[1] - y[1]);

    const ends: number[] = a.map(x => x[1]);

    type State = {
        score: number;
        ids: number[];
    };

    const dp: Array<Array<State | null>> = Array.from(
        { length: K + 1 },
        () => Array<State | null>(n + 1).fill(null)
    );

    for (let i = 0; i <= n; i++) {
        dp[0][i] = { score: 0, ids: [] };
    }

    const better = (a: State | null, b: State | null): boolean => {
        if (a === null) return false;
        if (b === null) return true;

        if (a.score !== b.score) return a.score > b.score;

        const len = Math.min(a.ids.length, b.ids.length);

        for (let i = 0; i < len; i++) {
            if (a.ids[i] !== b.ids[i]) {
                return a.ids[i] < b.ids[i];
            }
        }

        return a.ids.length < b.ids.length;
    };

    const lowerBound = (length: number, target: number): number => {
        let lo = 0;
        let hi = length;

        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);

            if (ends[mid] >= target) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }

        return lo;
    };

    for (let i = 1; i <= n; i++) {
        const left = a[i - 1][0];
        const weight = a[i - 1][2];
        const index = a[i - 1][3];

        const p = lowerBound(i - 1, left);

        for (let k = 1; k <= K; k++) {
            dp[k][i] = dp[k][i - 1];

            const prev = dp[k - 1][p];

            if (prev !== null) {
                const ids = [...prev.ids, index];

                ids.sort((x, y) => x - y);

                const take: State = {
                    score: prev.score + weight,
                    ids
                };

                if (better(take, dp[k][i])) {
                    dp[k][i] = take;
                }
            }
        }
    }

    let answer: State | null = null;

    for (let k = 1; k <= K; k++) {
        if (better(dp[k][n], answer)) {
            answer = dp[k][n];
        }
    }

    return answer!.ids;
}