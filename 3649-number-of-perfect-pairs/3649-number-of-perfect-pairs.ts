function perfectPairs(nums: number[]): number {
    const n = nums.length;
    const arr: bigint[] = [];
    for (const it of nums) arr.push(BigInt(Math.abs(it)));
    arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

    let cnt = 0n;
    let r = 0;
    for (let i = 0; i < n; i++) {
        if (r < i) r = i;
        while (r + 1 < n && arr[r + 1] <= arr[i] * 2n) r++;
        cnt += BigInt(r - i);
    }
    return Number(cnt);
}