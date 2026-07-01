function maximumSafenessFactor(grid: number[][]): number {
    const n = grid.length;
    if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return 0;
    
    const safeness: number[][] = Array.from({ length: n }, () => Array(n).fill(-1));
    let q: number[][] = [];
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                q.push([i, j]);
                safeness[i][j] = 0;
            }
        }
    }
    
    const dirs = [[0,1], [0,-1], [1,0], [-1,0]];
    let head = 0;
    
    while (head < q.length) {
        const [r, c] = q[head++];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && safeness[nr][nc] === -1) {
                safeness[nr][nc] = safeness[r][c] + 1;
                q.push([nr, nc]);
            }
        }
    }
    
    const isValid = (minSafe: number): boolean => {
        if (safeness[0][0] < minSafe || safeness[n-1][n-1] < minSafe) return false;
        let bfsQ: number[][] = [[0, 0]];
        let bfsHead = 0;
        const visited = Array.from({ length: n }, () => Array(n).fill(false));
        visited[0][0] = true;
        
        while (bfsHead < bfsQ.length) {
            const [r, c] = bfsQ[bfsHead++];
            if (r === n - 1 && c === n - 1) return true;
            
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && safeness[nr][nc] >= minSafe) {
                    visited[nr][nc] = true;
                    bfsQ.push([nr, nc]);
                }
            }
        }
        return false;
    };

    let low = 0, high = n * 2, ans = 0;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (isValid(mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}