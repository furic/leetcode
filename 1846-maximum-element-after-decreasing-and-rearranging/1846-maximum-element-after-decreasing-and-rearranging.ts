const maximumElementAfterDecrementingAndRearranging = (arr: number[]): number => {
    arr.sort((a, b) => a - b);
    let maxVal = 1;
    for (const x of arr) {
        if (x >= maxVal) maxVal++;
    }
    return maxVal - 1;
};