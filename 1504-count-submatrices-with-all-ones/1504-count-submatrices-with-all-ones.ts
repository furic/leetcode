function numSubmat(mat: number[][]): number {
    const n = mat[0].length;
    const heights: number[] = new Array(n).fill(0);
    let res = 0;
    for (const row of mat) {
        for (let i = 0; i < n; i++) {
            heights[i] = row[i] === 0 ? 0 : heights[i] + 1;
        }
        const stack: [number, number, number][] = [[-1, 0, -1]];
        for (let i = 0; i < n; i++) {
            const h = heights[i];
            while (stack[stack.length - 1][2] >= h) {
                stack.pop();
            }
            const [j, prev] = stack[stack.length - 1];
            const cur = prev + (i - j) * h;
            stack.push([i, cur, h]);
            res += cur;
        }
    }
    return res;
};