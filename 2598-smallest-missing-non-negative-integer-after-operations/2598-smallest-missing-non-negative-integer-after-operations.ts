function findSmallestInteger(nums: number[], value: number): number {
    const mp: number[] = new Array(value).fill(0);

    for (const x of nums) {
        const v = ((x % value) + value) % value;
        mp[v]++;
    }

    let mex = 0;
    while (mp[mex % value] > 0) {
        mp[mex % value]--;
        mex++;
    }

    return mex;
}