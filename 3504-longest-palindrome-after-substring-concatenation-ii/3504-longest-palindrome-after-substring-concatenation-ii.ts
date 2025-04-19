const longestPalindrome = (s: string, t: string): number => {
    const m = s.length, n = t.length;
    let ans = 0;

    // DP table to check if s[i:j] is a palindrome
    const dpS: boolean[][] = Array.from({ length: m }, () => Array(m).fill(false));
    const leftS: number[] = Array(m).fill(0);

    // Compute longest palindromic substring in s
    for (let i = m - 1; i >= 0; i--) {
        for (let j = i; j < m; j++) {
            if (s[i] === s[j] && (j - i < 2 || dpS[i + 1][j - 1])) {
                dpS[i][j] = true;
                leftS[i] = Math.max(leftS[i], j - i + 1);
                ans = Math.max(ans, leftS[i]);
            }
        }
    }

    // DP table to check if t[i:j] is a palindrome
    const dpT: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
    const rightT: number[] = Array(n).fill(0);

    // Compute longest palindromic substring in t
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            if (t[i] === t[j] && (j - i < 2 || dpT[i + 1][j - 1])) {
                dpT[i][j] = true;
                rightT[j] = Math.max(rightT[j], j - i + 1);
                ans = Math.max(ans, rightT[j]);
            }
        }
    }

    // DP table to check longest palindromic match between s and t
    const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = n - 1; j >= 0; j--) {
            if (s[i] === t[j]) {
                dp[i][j] = 1;
                if (i > 0 && j < n - 1) {
                    dp[i][j] += dp[i - 1][j + 1];
                }
            }
            if (dp[i][j]) {
                let extra = 0;
                if (i + 1 < m) extra = Math.max(extra, leftS[i + 1]);
                if (j - 1 >= 0) extra = Math.max(extra, rightT[j - 1]);
                ans = Math.max(ans, 2 * dp[i][j] + extra);
            }
        }
    }

    return ans;
};
