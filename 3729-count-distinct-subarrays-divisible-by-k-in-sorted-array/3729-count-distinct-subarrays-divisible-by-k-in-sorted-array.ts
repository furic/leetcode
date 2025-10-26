function numGoodSubarrays(v: number[], k: number): number {
    const mp = new Map<number, number>();
    const n = v.length;
    mp.set(0, 1);
    let sum = 0;
    let cnt = 0;

    for (let i = 0; i < n;) {
        let j = i;
        let sum2 = sum;

        while (j < n && v[j] === v[i]) {
            sum2 = (sum2 + v[j]) % k;
            cnt += mp.get(sum2 % k) || 0;
            j++;
        }

        j = i;
        while (i < n && v[j] === v[i]) {
            sum = (sum + v[j]) % k;
            mp.set(sum, (mp.get(sum) || 0) + 1);
            i++;
        }
    }

    return cnt;
}