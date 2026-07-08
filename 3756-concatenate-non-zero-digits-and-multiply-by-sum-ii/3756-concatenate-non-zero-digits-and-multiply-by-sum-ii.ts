function sumAndMultiply(s: string, queries: number[][]): number[] {
    const MOD = 1000000007n;
    const n = s.length;

    const idx: number[] = Array(n + 1).fill(0);
    const val: bigint[] = Array(n + 1).fill(0n);
    const total: bigint[] = Array(n + 1).fill(0n);
    const pow10: bigint[] = Array(n + 1).fill(1n);

    for (let i = 1; i <= n; i++) {
        pow10[i] = (pow10[i - 1] * 10n) % MOD;
    }

    let count = 0;

    for (let i = 0; i < n; i++) {
        const digit = BigInt(s.charCodeAt(i) - 48);

        if (digit !== 0n) {
            count++;
            val[count] = (val[count - 1] * 10n + digit) % MOD;
            total[count] = total[count - 1] + digit;
        }

        idx[i + 1] = count;
    }

    const ans: number[] = [];

    for (const [left, right] of queries) {
        const a = idx[left];
        const b = idx[right + 1];

        if (a === b) {
            ans.push(0);
            continue;
        }

        const length = b - a;

        let num = (val[b] - val[a] * pow10[length]) % MOD;
        if (num < 0n) {
            num += MOD;
        }

        const digitSum = total[b] - total[a];

        ans.push(Number((num * digitSum) % MOD));
    }

    return ans;
}