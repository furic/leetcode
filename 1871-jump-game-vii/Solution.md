# Sliding Window DP Reachability | 12 Lines | O(n) | 6ms

# Intuition
Position `i` is reachable if any position in `[i - maxJump, i - minJump]` is reachable and `s[i] === '0'`. Instead of checking that entire range for every `i` (which would be O(n × maxJump)), we maintain a sliding window count of reachable positions in that range.

# Approach
- `dp[i] = 1` if position `i` is reachable, `0` otherwise. Initialise `dp[0] = 1`.
- Maintain `reachableCount` = number of reachable positions currently in the valid jump window `[i - maxJump, i - minJump]`:
  - When `i >= minJump`: the position `i - minJump` just entered the window — add `dp[i - minJump]`.
  - When `i > maxJump`: the position `i - maxJump - 1` just left the window — subtract `dp[i - maxJump - 1]`.
- If `s[i] === '0'` and `reachableCount > 0`, mark `dp[i] = 1`.
- Return `dp[n - 1] === 1`. Early exit: if `s[n-1] === '1'`, return `false` immediately.

# Complexity
- Time complexity: $$O(n)$$ — each position processed in O(1) with the sliding count.

- Space complexity: $$O(n)$$ — the `dp` array.

# Code
```typescript []
const canReach = (s: string, minJump: number, maxJump: number): boolean => {
    const n = s.length;
    if (s[n - 1] === '1') return false;

    const dp = new Uint8Array(n);
    dp[0] = 1;
    let reachableCount = 0;

    for (let i = 1; i < n; i++) {
        if (i >= minJump)   reachableCount += dp[i - minJump];
        if (i > maxJump)    reachableCount -= dp[i - maxJump - 1];
        if (s[i] === '0' && reachableCount > 0) dp[i] = 1;
    }

    return dp[n - 1] === 1;
};
```