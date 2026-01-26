function minimumAbsDifference(arr: number[]): number[][] {
    arr.sort((a, b) => a - b);
    let result: number[][] = []
    let minimumAbs = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < arr.length; i++) {
        const abs = Math.abs(arr[i - 1] - arr[i])
        if (minimumAbs > abs) {
            result = []
            minimumAbs = abs;
        } 
        if (minimumAbs === abs) {
            result.push([arr[i - 1], arr[i]])
        }
    }
    return result;
};