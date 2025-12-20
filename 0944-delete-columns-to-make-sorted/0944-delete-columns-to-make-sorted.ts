function minDeletionSize(strs: string[]): number {
    let cnt = 0;
    let col = strs[0].length; 
    let row = strs.length;     

    for (let i = 0; i < col; i++) {
        for (let j = 1; j < row; j++) {
            if (strs[j][i] < strs[j - 1][i]) {
                cnt++;
                break;
            }
        }
    }
    return cnt;
};