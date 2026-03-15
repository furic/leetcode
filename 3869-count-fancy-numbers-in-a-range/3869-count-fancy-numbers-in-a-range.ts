const countFancy = (l: number, r: number): number => {
    const isGood = (n: number): boolean => {
        if (n < 10) return true;
        const d: number[] = [];
        while (n > 0) {
            d.push(n % 10);
            n = Math.floor(n / 10);
        }
        d.reverse();
        let inc = true,
            dec = true;
        for (let i = 1; i < d.length; i++) {
            if (d[i] <= d[i - 1]) inc = false;
            if (d[i] >= d[i - 1]) dec = false;
        }
        return inc || dec;
    };

    const goodSums = new Set<number>();
    for (let s = 0; s <= 135; s++) if (isGood(s)) goodSums.add(s); // max digitSum = 9*15

    const countUpTo = (num: number): number => {
        if (num <= 0) return 0;
        const digits = String(num).split("").map(Number);
        const len = digits.length;
        const memo = new Map<number, number>();

        // Encode state as single integer for fast lookup
        const encode = (
            pos: number,
            tight: number,
            started: number,
            last: number,
            canInc: number,
            canDec: number,
            digitSum: number
        ): number =>
            (((((pos * 2 + tight) * 2 + started) * 10 + last) * 2 + canInc) *
                2 +
                canDec) *
                136 +
            digitSum;

        const dp = (
            pos: number,
            tight: boolean,
            started: boolean,
            lastDigit: number,
            canInc: boolean,
            canDec: boolean,
            digitSum: number
        ): number => {
            if (pos === len) {
                if (!started) return 0;
                return canInc || canDec || goodSums.has(digitSum) ? 1 : 0;
            }

            const key = encode(
                pos,
                +tight,
                +started,
                lastDigit,
                +canInc,
                +canDec,
                digitSum
            );
            if (memo.has(key)) return memo.get(key)!;

            const limit = tight ? digits[pos] : 9;
            let count = 0;

            for (let d = 0; d <= limit; d++) {
                const nextTight = tight && d === limit;
                if (!started && d === 0) {
                    count += dp(pos + 1, nextTight, false, 0, true, true, 0);
                } else {
                    const nextInc = canInc && (!started || d > lastDigit);
                    const nextDec = canDec && (!started || d < lastDigit);
                    count += dp(
                        pos + 1,
                        nextTight,
                        true,
                        d,
                        nextInc,
                        nextDec,
                        digitSum + d
                    );
                }
            }

            memo.set(key, count);
            return count;
        };

        return dp(0, true, false, 0, true, true, 0);
    };

    return countUpTo(r) - countUpTo(l - 1);
};
