function countSubmatrices(grid: number[][], k: number): number {
    let n = grid.length;
    let m = grid[0].length;
    let cnt = 0;
    if(grid[0][0] <= k){
        cnt += 1;
    }else{
        return 0;
    }

    for(let i = 1; i < n; i++){
        grid[i][0] += grid[i - 1][0]
        if(grid[i][0] <= k){
            cnt += 1;
        }
    }
    for(let j = 1; j < m; j++){
        grid[0][j] += grid[0][j - 1]
        if(grid[0][j] <= k){
            cnt += 1
        }
    }
    for(let i = 1; i < n; i++){
        for(let j = 1; j < m; j++){
            grid[i][j] += grid[i - 1][j] + grid[i][j - 1] - grid[i - 1][j - 1]
            if(grid[i][j] <= k){
                cnt += 1
            }
        }
    }
    return cnt;
};