const canReach = (s: string, minJump: number, maxJump: number): boolean => {
    const n = s.length;
    if (s[n - 1] === '1') return false;

    const dp = new Uint8Array(n);
    dp[0] = 1;
    let reachableCount = 0; // Number of reachable positions in the current jump window

    for (let i = 1; i < n; i++) {
        // Expand window: include the position that just entered range [i-maxJump, i-minJump]
        if (i >= minJump)   reachableCount += dp[i - minJump];

        // Shrink window: exclude the position that just fell out of range
        if (i > maxJump)    reachableCount -= dp[i - maxJump - 1];

        if (s[i] === '0' && reachableCount > 0) dp[i] = 1;
    }

    return dp[n - 1] === 1;
};