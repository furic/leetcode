function maxSumDivThree(nums: number[]): number {
    let sum = 0;

    let m1a = Infinity, m1b = Infinity;
    let m2a = Infinity, m2b = Infinity;

    for (let x of nums) {
        sum += x;
        const r = x % 3;

        if (r === 1) {
            if (x < m1a) { m1b = m1a; m1a = x; }
            else if (x < m1b) m1b = x;
        } else if (r === 2) {
            if (x < m2a) { m2b = m2a; m2a = x; }
            else if (x < m2b) m2b = x;
        }
    }

    const rem = sum % 3;
    if (rem === 0) return sum;

    let remove = Infinity;

    if (rem === 1) {
        remove = Math.min(
            m1a,
            m2b < Infinity ? m2a + m2b : Infinity
        );
    } else {
        remove = Math.min(
            m2a,
            m1b < Infinity ? m1a + m1b : Infinity
        );
    }

    return remove === Infinity ? 0 : sum - remove;
}