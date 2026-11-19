function minimizeSum(nums: number[]): number {
    const small = [Infinity, Infinity, Infinity], neg = [Infinity, Infinity, Infinity];  // the 3 smallest values, and the 3 smallest negated ones: minus the 3 largest
    for (const x of nums) {
        keep(small, x);
        keep(neg, -x);
    }
    return Math.min(-neg[0] - small[2], -neg[1] - small[1], -neg[2] - small[0]);
}

function keep(three: number[], x: number): void {  // three: the 3 smallest values so far, ascending
    if (x >= three[2]) return;
    let i = 2;
    for (; i > 0 && three[i - 1] > x; i--) three[i] = three[i - 1];
    three[i] = x;
}