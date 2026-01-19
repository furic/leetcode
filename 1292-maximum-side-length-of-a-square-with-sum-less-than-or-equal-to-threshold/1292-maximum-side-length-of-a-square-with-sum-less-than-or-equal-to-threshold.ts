function maxSideLength(mat: number[][], threshold: number): number {
    const m = mat.length;
    const n = mat[0].length;
    const prefix: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            prefix[i + 1][j + 1] = mat[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j];
        }
    }

    let left = 0, right = Math.min(m, n), ans = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        let found = false;

        for (let i = mid; i <= m && !found; i++) {
            for (let j = mid; j <= n && !found; j++) {
                const total = prefix[i][j] - prefix[i - mid][j] - prefix[i][j - mid] + prefix[i - mid][j - mid];
                if (total <= threshold) found = true;
            }
        }

        if (found) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return ans;
}