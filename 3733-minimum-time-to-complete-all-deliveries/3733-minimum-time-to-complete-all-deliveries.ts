function minimumTime(d: number[], r: number[]): number {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    let low = 0;
    let high = 1e18; // large enough number to replace BigInt
    const temp = (d[0] + d[1]) * Math.max(r[0], r[1]);
    high = Math.min(high, Math.max(100, temp));

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const x1 = mid - Math.floor(mid / r[0]);
        const x2 = mid - Math.floor(mid / r[1]);
        const gcdd = gcd(r[0], r[1]);
        const lcm = (r[0] / gcdd) * r[1];
        const x3 = mid - (Math.floor(mid / r[0]) + Math.floor(mid / r[1]) - Math.floor(mid / lcm));

        if (x1 >= d[0] && x2 >= d[1] && x1 + x2 - x3 >= d[0] + d[1]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return low;
}