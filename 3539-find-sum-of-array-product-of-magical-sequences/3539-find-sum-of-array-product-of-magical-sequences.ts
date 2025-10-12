function magicalSum(m: number, k: number, nums: number[]): number {
    const n = nums.length;
    const mod = 1000000007n;

    const fac: bigint[] = new Array(m + 1).fill(1n);
    for (let i = 1; i <= m; i++) {
        fac[i] = (fac[i - 1] * BigInt(i)) % mod;
    }

    const ifac: bigint[] = new Array(m + 1).fill(1n);
    for (let i = 2; i <= m; i++) {
        ifac[i] = quickmul(BigInt(i), mod - 2n, mod);
    }
    for (let i = 2; i <= m; i++) {
        ifac[i] = (ifac[i - 1] * ifac[i]) % mod;
    }

    const numsPower: bigint[][] = new Array(n);
    for (let i = 0; i < n; i++) {
        numsPower[i] = new Array(m + 1).fill(1n);
        for (let j = 1; j <= m; j++) {
            numsPower[i][j] = (numsPower[i][j - 1] * BigInt(nums[i])) % mod;
        }
    }

    const f: bigint[][][][] = new Array(n);
    for (let i = 0; i < n; i++) {
        f[i] = new Array(m + 1);
        for (let j = 0; j <= m; j++) {
            f[i][j] = new Array(m * 2 + 1);
            for (let p = 0; p <= m * 2; p++) {
                f[i][j][p] = new Array(k + 1).fill(0n);
            }
        }
    }

    for (let j = 0; j <= m; j++) {
        f[0][j][j][0] = (numsPower[0][j] * ifac[j]) % mod;
    }

    for (let i = 0; i + 1 < n; i++) {
        for (let j = 0; j <= m; j++) {
            for (let p = 0; p <= m * 2; p++) {
                for (let q = 0; q <= k; q++) {
                    if (f[i][j][p][q] === 0n) {
                        continue;
                    }
                    const q2 = (p % 2) + q;
                    if (q2 > k) {
                        break;
                    }
                    for (let r = 0; r + j <= m; r++) {
                        const p2 = Math.floor(p / 2) + r;
                        if (p2 > m * 2) {
                            break;
                        }
                        f[i + 1][j + r][p2][q2] =
                            (f[i + 1][j + r][p2][q2] +
                                ((((f[i][j][p][q] * numsPower[i + 1][r]) %
                                    mod) *
                                    ifac[r]) %
                                    mod)) %
                            mod;
                    }
                }
            }
        }
    }

    let res = 0n;
    for (let p = 0; p <= m * 2; p++) {
        for (let q = 0; q <= k; q++) {
            if (bitCount(p) + q === k) {
                res = (res + ((f[n - 1][m][p][q] * fac[m]) % mod)) % mod;
            }
        }
    }
    return Number(res);
}

function quickmul(x: bigint, y: bigint, mod: bigint): bigint {
    let res = 1n;
    let cur = x % mod;
    while (y > 0n) {
        if (y & 1n) {
            res = (res * cur) % mod;
        }
        y >>= 1n;
        cur = (cur * cur) % mod;
    }
    return res;
}

function bitCount(n: number): number {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}