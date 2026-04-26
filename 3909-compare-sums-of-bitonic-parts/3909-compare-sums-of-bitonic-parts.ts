const compareBitonicSums = (nums: number[]): number => {
    const peakIndex = nums.indexOf(Math.max(...nums));

    const ascendingSum  = nums.slice(0, peakIndex + 1).reduce((s, v) => s + v, 0);
    const descendingSum = nums.slice(peakIndex).reduce((s, v) => s + v, 0);

    if (ascendingSum > descendingSum) return 0;
    if (descendingSum > ascendingSum) return 1;
    return -1;
};