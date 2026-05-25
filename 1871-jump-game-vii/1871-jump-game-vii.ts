function canReach(s: string, minJump: number, maxJump: number): boolean {
    const n: number = s.length;
    if (s[n - 1] === '1')
        return false;
    const dp: boolean[] = new Array(n).fill(false);
    dp[0] = true;
    let reach: number = 0;
    for (let i = 1; i < n; i++) {
        if (i - minJump >= 0) {
            reach += dp[i - minJump] ? 1 : 0;
        }
        if (i - maxJump - 1 >= 0) {
            reach -= dp[i - maxJump - 1] ? 1 : 0;
        }
        if (reach > 0 && s[i] === '0') {
            dp[i] = true;
        }
    }
    return dp[n - 1];
}