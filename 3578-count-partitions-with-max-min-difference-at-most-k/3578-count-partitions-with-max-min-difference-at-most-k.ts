function countPartitions(nums: number[], k: number): number {
    const n = nums.length;
    const mod = 1e9 + 7;
    const dp = new Array<number>(n + 1).fill(0);
    const prefix = new Array<number>(n + 1).fill(0);
    const minQ: number[] = [];
    const maxQ: number[] = [];

    dp[0] = 1;
    prefix[0] = 1;

    for (let i = 0, j = 0; i < n; i++) {
        // maintain the maximum value queue
        while (maxQ.length > 0 && nums[maxQ.at(-1)!] <= nums[i]) {
            maxQ.pop();
        }
        maxQ.push(i);

        // maintain the minimum value queue
        while (minQ.length > 0 && nums[minQ.at(-1)!] >= nums[i]) {
            minQ.pop();
        }
        minQ.push(i);

        // adjust window
        while (
            maxQ.length > 0 &&
            minQ.length > 0 &&
            nums[maxQ[0]] - nums[minQ[0]] > k
        ) {
            if (maxQ[0] === j) {
                maxQ.shift();
            }
            if (minQ[0] === j) {
                minQ.shift();
            }
            j++;
        }

        dp[i + 1] = (prefix[i] - (j > 0 ? prefix[j - 1] : 0) + mod) % mod;
        prefix[i + 1] = (prefix[i] + dp[i + 1]) % mod;
    }

    return dp[n];
}