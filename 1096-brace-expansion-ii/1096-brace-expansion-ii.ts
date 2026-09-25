function braceExpansionII(expression: string): string[] {
    let i = 0;
    const parse = (): Set<string> => {
        const res = new Set<string>();
        let cur = new Set<string>([""]);
        while (i < expression.length && expression[i] !== '}') {
            if (expression[i] === '{') {
                i++;
                const next = parse();
                i++;
                cur = product(cur, next);
            } else if (expression[i] === ',') {
                for (const s of cur) res.add(s);
                cur = new Set<string>([""]);
                i++;
            } else {
                const next = new Set<string>([expression[i]]);
                i++;
                cur = product(cur, next);
            }
        }
        for (const s of cur) res.add(s);
        return res;
    };
    const product = (a: Set<string>, b: Set<string>): Set<string> => {
        const res = new Set<string>();
        for (const x of a)
            for (const y of b)
                res.add(x + y);
        return res;
    };
    const result = parse();
    return Array.from(result).sort();
}