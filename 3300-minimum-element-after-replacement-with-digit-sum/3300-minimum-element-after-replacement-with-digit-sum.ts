function minElement(nums: number[]): number {
    let minVal = Infinity;

    for (let num of nums) {
        let currentSum = 0;

        while (num > 0) {
            currentSum += num % 10;
            num = Math.floor(num / 10);
        }

        minVal = Math.min(minVal, currentSum);
    }

    return minVal;
}