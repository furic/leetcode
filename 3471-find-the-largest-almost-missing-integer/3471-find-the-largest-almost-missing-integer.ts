function largestInteger(nums: number[], k: number): number {
    const n: number = nums.length;

    if (k === n) {
        return Math.max(...nums);
    }

    let arr: number[] = [];

    if (k === 1) {
        arr = nums.filter(
            x => nums.filter(y => y === x).length === 1
        );
    } else {
        arr = [nums[0], nums[n - 1]].filter(
            x => nums.filter(y => y === x).length === 1
        );
    }

    return arr.length ? Math.max(...arr) : -1;
}