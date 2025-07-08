const maxValue = (events: number[][], k: number): number => {
    events.sort((a, b) => a[1] - b[1]);
    const n = events.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

    const findLastNonConflict = (currentStart: number): number => {
        let left = 0, right = n - 1, result = -1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (events[mid][1] < currentStart) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    };

    for (let i = 1; i <= n; i++) {
        const [startDay, endDay, value] = events[i - 1];
        const lastIndex = findLastNonConflict(startDay);
        for (let count = 1; count <= k; count++) {
            dp[i][count] = Math.max(
                dp[i - 1][count],
                dp[lastIndex + 1][count - 1] + value
            );
        }
    }

    return dp[n][k];
};