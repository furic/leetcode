const concatenatedDivisibility = (nums: number[], k: number): number[] => {
    const n = nums.length;
    const pow10mod = nums.map(num => {
        let len = num.toString().length;
        let p = 1;
        for (let i = 0; i < len; i++) {
            p = (p * 10) % k;
        }
        return p;
    });

    const memo = new Map<string, number[]>();

    /**
     * 
     * @param usedMask - Bitmask of which numbers are already used
     * @param mod - Current modulo value
     * @returns lex smallest path that finishes valid
     */
    const dfs = (usedMask: number, mod: number): number[] | null => {
        if (usedMask === (1 << n) - 1) {
            return mod === 0 ? [] : null;
        }

        const key = `${usedMask},${mod}`;
        if (memo.has(key)) {
            return memo.get(key)!;
        }

        let best: number[] | null = null;

        for (let i = 0; i < n; i++) {
            if ((usedMask & (1 << i)) === 0) {
                const nextMod = (mod * pow10mod[i] + nums[i]) % k;
                const next = dfs(usedMask | (1 << i), nextMod);
                if (next !== null) {
                    const candidate = [nums[i], ...next];
                    if (best === null || isLexSmaller(candidate, best)) {
                        best = candidate;
                    }
                }
            }
        }

        memo.set(key, best ?? null);
        return best;
    };

    const isLexSmaller = (a: number[], b: number[]): boolean => {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] !== b[i]) return a[i] < b[i];
        }
        return a.length < b.length;
    };

    const answer = dfs(0, 0);
    return answer ?? [];
};