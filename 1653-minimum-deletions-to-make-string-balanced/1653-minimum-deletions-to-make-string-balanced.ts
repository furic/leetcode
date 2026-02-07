function minimumDeletions(s: string): number {
    let res: number = 0;
    let count: number = 0;

    for (let c of s) {
        if (c === 'b') {
            count++;
        } else {
            if (count > 0) {
                res++;
                count--;
            }
        }
    }
    return res;
};