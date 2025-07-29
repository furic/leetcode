const maxValue = (events: number[][], k: number): number => {
    const n = events.length;
    events.sort((a, b) => a[0] - b[0]);

    const findNextEventIndex = (targetEnd: number): number => {
        let left = 0, right = n;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (events[mid][0] <= targetEnd) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    };

    const dp: number[][] = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));

    for (let index = n - 1; index >= 0; index--) {
        const [start, end, value] = events[index];
        const nextIndex = findNextEventIndex(end);
        for (let remaining = 1; remaining <= k; remaining++) {
            dp[remaining][index] = Math.max(
                dp[remaining][index + 1],
                value + dp[remaining - 1][nextIndex]
            );
        }
    }

    return dp[k][0];
};