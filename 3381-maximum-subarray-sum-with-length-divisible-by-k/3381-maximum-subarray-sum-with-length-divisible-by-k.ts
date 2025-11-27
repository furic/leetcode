function maxSubarraySum(nums: number[], k: number): number {
    const INF = 1e30;
    const minPrefix = new Array(k).fill(INF);
    minPrefix[0] = 0;

    let prefix = 0;
    let answer = -INF;

    for (let i = 0; i < nums.length; i++) {
        prefix += nums[i];
        const mod = (i + 1) % k;

        if (minPrefix[mod] !== INF) {
            answer = Math.max(answer, prefix - minPrefix[mod]);
        }

        if (prefix < minPrefix[mod]) {
            minPrefix[mod] = prefix;
        }
    }

    return answer;
}