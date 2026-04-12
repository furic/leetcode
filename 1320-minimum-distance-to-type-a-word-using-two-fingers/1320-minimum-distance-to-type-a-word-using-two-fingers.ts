function minimumDistance(word: string): number {
    const dist = (a: number, b: number): number => {
        if (a === 26 || b === 26) 
            return 0;
        return Math.abs(Math.floor(a / 6) - Math.floor(b / 6)) + Math.abs(a % 6 - b % 6);
    };

    let dp: number[] = Array(27).fill(Infinity);
    dp[26] = 0;
    let prev: number = word.charCodeAt(0) - 65;

    for (let i = 1; i < word.length; i++) {
        let cur: number = word.charCodeAt(i) - 65;
        let next_dp: number[] = Array(27).fill(Infinity);
        for (let free = 0; free < 27; free++) {
            if (dp[free] === Infinity) 
                continue;
            next_dp[free] = Math.min(next_dp[free], dp[free] + dist(prev, cur));
            next_dp[prev] = Math.min(next_dp[prev], dp[free] + dist(free, cur));
        }
        dp = next_dp;
        prev = cur;
    }

    return Math.min(...dp);
};