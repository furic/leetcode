function minimumAbsDifference(arr: number[]) {
    arr.sort((a, b) => a - b);
    let i = 1, diff = Infinity;
    while (i < arr.length) diff = Math.min(diff, arr[i] - arr[i++ - 1]);

    const res: [number, number][] = [];
    for (i = 1; i < arr.length; i++) {
        if (arr[i] - arr[i - 1] === diff) res.push([arr[i - 1], arr[i]]);
    }
    return res;
}