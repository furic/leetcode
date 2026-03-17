// TypeScript
function largestSubmatrix(matrix: number[][]): number {
    const m = matrix.length;
    if (m === 0) return 0;
    const n = matrix[0].length;
    const height: number[] = new Array(n).fill(0);
    let best = 0;

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) height[j] = matrix[i][j] === 1 ? height[j] + 1 : 0;
        const sorted = [...height].sort((a, b) => b - a);
        for (let k = 1; k <= n; ++k) best = Math.max(best, sorted[k - 1] * k);
    }
    return best;
}