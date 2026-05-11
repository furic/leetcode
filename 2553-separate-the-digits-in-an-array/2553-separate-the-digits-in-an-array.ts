function separateDigits(nums: number[]): number[] {
    const res: number[] = [];
    for (const num of nums) {
        if (num > 9) {
            const s: string = num.toString();
            for (const ch of s) {
                res.push(Number(ch));
            }
        } 
        else {
            res.push(num);
        }
    }
    return res;
};