function rob(nums: number[]): number {
    let prev1 = 0, prev2 = 0;
    for (const num of nums) {
        const curr = Math.max(prev1, num + prev2);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}