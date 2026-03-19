function numberOfSubmatrices(grid: string[][]): number {
    let n = grid.length;
    let m = grid[0].length;
    let cnt : number[][] = Array.from({length: n}, () => Array(m).fill(0));
    let prefix : number[][] = Array.from({length: n}, () => Array(m).fill(0));
    let ans = 0;

    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(grid[i][j] == "X"){
                prefix[i][j] = 1;
                cnt[i][j] = 1;
            }
            else if(grid[i][j] == "Y"){
                prefix[i][j] = -1;
            }
            else{
                prefix[i][j] = 0;
            }

            if(i > 0){
                prefix[i][j] += prefix[i - 1][j];
                cnt[i][j] += cnt[i - 1][j];
            }
            if(j > 0){
                prefix[i][j] += prefix[i][j - 1];
                cnt[i][j] += cnt[i][j - 1];
            }
            if(i > 0 && j > 0){
                prefix[i][j] -= prefix[i - 1][j - 1];
                cnt[i][j] -= cnt[i - 1][j - 1];
            }

            if(cnt[i][j] > 0 && prefix[i][j] == 0){
                ans += 1;
            }
        }
    }
    return ans;
};