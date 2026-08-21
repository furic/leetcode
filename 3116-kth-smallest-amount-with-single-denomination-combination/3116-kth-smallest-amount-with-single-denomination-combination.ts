const findKthSmallest = (coins: number[], k: number): number => {
    // Remove coins that are multiples of smaller coins (they add no new multiples)
    coins.sort((a, b) => a - b);
    const reduced: number[] = [];
    for (const x of coins) {
        if (reduced.every(y => x % y !== 0)) reduced.push(x);
    }
    coins = reduced;

    const n = coins.length;
    const numMasks = 1 << n;

    const gcd = (a: bigint, b: bigint): bigint => {
        while (b !== 0n) { [a, b] = [b, a % b]; }
        return a;
    };

    const lowestSetBit = (x: number): number => {
        let i = 0;
        while ((x & 1) === 0) { i++; x >>= 1; }
        return i;
    };

    const popcount = (x: number): number => {
        let c = 0;
        while (x) { c += x & 1; x >>= 1; }
        return c;
    };

    // Precompute LCM for each bitmask subset (inclusion-exclusion)
    let lo = BigInt(k);
    let hi = BigInt(coins[0]) * BigInt(k) + 1n;

    const maskLCM = new Array<bigint>(numMasks).fill(0n);
    maskLCM[0] = 1n;
    for (let mask = 1; mask < numMasks; mask++) {
        const prevMask = mask & (mask - 1);
        const coinBig = BigInt(coins[lowestSetBit(mask)]);
        const prevLCM = maskLCM[prevMask];
        const candidate = (prevLCM / gcd(prevLCM, coinBig)) * coinBig;
        maskLCM[mask] = candidate <= hi ? candidate : hi + 1n;
    }

    // Count integers in [1, x] reachable by at least one coin (inclusion-exclusion)
    const countReachable = (x: bigint): bigint => {
        let total = 0n;
        for (let mask = 1; mask < numMasks; mask++) {
            if (maskLCM[mask] > x) continue;
            total += popcount(mask) & 1 ? x / maskLCM[mask] : -(x / maskLCM[mask]);
        }
        return total;
    };

    while (lo < hi) {
        const mid = (lo + hi) / 2n;
        if (countReachable(mid) >= k) hi = mid;
        else                          lo = mid + 1n;
    }

    return Number(lo);
};