function pyramidTransition(bottom: string, allowed: string[]): boolean {
    const map = new Map<string, string[]>();
    for (const t of allowed) {
        const key = t.slice(0, 2);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(t[2]);
    }

    const memo = new Map<string, boolean>();

    const dfs = (row: string): boolean => {
        if (memo.has(row)) return memo.get(row)!;
        if (row.length === 1) {
            memo.set(row, true);
            return true;
        }

        const n = row.length;
        for (let i = 0; i < n - 1; i++) {
            if (!map.has(row.slice(i, i + 2))) {
                memo.set(row, false);
                return false;
            }
        }

        const helper = (i: number, curr: string): boolean => {
            if (i === n - 1) return dfs(curr);
            const pair = row.slice(i, i + 2);
            for (const c of map.get(pair)!) {
                if (helper(i + 1, curr + c)) return true;
            }
            return false;
        };

        const res = helper(0, "");
        memo.set(row, res);
        return res;
    };

    return dfs(bottom);
};