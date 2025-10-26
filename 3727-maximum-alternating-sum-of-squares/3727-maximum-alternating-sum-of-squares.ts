function maxAlternatingSum(nums: number[]): number {
    let ans = 0n;
    nums = nums.map(Math.abs);
    nums.sort((a, b) => a - b);

    for (let i = 0; i < Math.floor(nums.length / 2); i++) {
        const high = BigInt(nums[nums.length - i - 1]);
        const low = BigInt(nums[i]);
        ans += high * high - low * low;
    }

    if (nums.length % 2 === 1) {
        const mid = BigInt(nums[Math.floor(nums.length / 2)]);
        ans += mid * mid;
    }

    return Number(ans);
}