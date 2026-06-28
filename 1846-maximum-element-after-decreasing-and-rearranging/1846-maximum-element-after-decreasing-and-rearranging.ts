function maximumElementAfterDecrementingAndRearranging(arr: number[]): number {
    arr.sort((a, b) => a - b);
    let res = 1;
    for (const x of arr) {
        if (x >= res) {
            res++;
        }
    }
    return res - 1;
};