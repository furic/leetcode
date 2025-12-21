function minDeletionSize(strs: string[]): number {
    let col = strs[0].length; 
    let row = strs.length;     
    let res = 0; 
    let sortedPairs: boolean[] = Array(row - 1).fill(false); 
    for (let c = 0; c < col; ++c) {
        let check = true; 

        for (let r = 0; r < row - 1; ++r) {
            if (!sortedPairs[r] && strs[r][c] > strs[r + 1][c]) {
                check = false;
                break;
            }
        }

        if (!check) {
            res++;
            continue;
        }
        for (let r = 0; r < row - 1; ++r) {
            if (!sortedPairs[r] && strs[r][c] < strs[r + 1][c]) {
                sortedPairs[r] = true;  
            }
        }
    }

    return res;
};