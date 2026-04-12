const minimumDistance = (word: string): number => {
    // Manhattan distance between two letter indices (0-25), or 0 if either finger is unplaced (26)
    const moveCost = (a: number, b: number): number => {
        if (a === 26 || b === 26) return 0;
        return Math.abs(Math.floor(a / 6) - Math.floor(b / 6))
             + Math.abs(a % 6 - b % 6);
    };

    const UNPLACED = 26;
    // dp[free] = min cost so far when the "free" finger is at position `free`
    // and the other finger just typed the previous character
    let dp: number[] = Array(27).fill(Infinity);
    dp[UNPLACED] = 0;
    let prevChar = word.charCodeAt(0) - 65;

    for (let i = 1; i < word.length; i++) {
        const curChar = word.charCodeAt(i) - 65;
        const nextDp: number[] = Array(27).fill(Infinity);

        for (let free = 0; free < 27; free++) {
            if (dp[free] === Infinity) continue;
            // Option 1: move the finger that typed prevChar to curChar; free finger stays
            nextDp[free]     = Math.min(nextDp[free],     dp[free] + moveCost(prevChar, curChar));
            // Option 2: move the free finger to curChar; prevChar finger becomes the free one
            nextDp[prevChar] = Math.min(nextDp[prevChar], dp[free] + moveCost(free, curChar));
        }

        dp = nextDp;
        prevChar = curChar;
    }

    return Math.min(...dp);
};