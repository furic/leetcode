function shuffle(nums: number[], n: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
        result[i * 2] = nums[i];
        result[i * 2 + 1] = nums[i + n];
    }
    return result;
}