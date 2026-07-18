function findGCD(nums: number[]): number {
    let minNum = Math.min(...nums);
    let maxNum = Math.max(...nums);

    while (maxNum !== 0) {
        const temp = maxNum;
        maxNum = minNum % maxNum;
        minNum = temp;
    }

    return minNum;
}