function maxRunTime(n: number, batteries: number[]): number {
    let total = batteries.reduce((a, b) => a + b, 0);
    let left = 0, right = Math.floor(total / n);

    while (left < right) {
        let mid = Math.floor((left + right + 1) / 2);
        let need = mid * n;
        let have = 0;

        for (let b of batteries) {
            have += Math.min(b, mid);
        }

        if (have >= need) left = mid;
        else right = mid - 1;
    }

    return left;
}