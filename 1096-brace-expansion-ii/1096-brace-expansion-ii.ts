const braceExpansionII = (expression: string): string[] => {
    const ops: string[] = [];   // operator stack: '*' (concat), '+' (union), '{'
    const sets: Set<string>[] = []; // operand stack

    const apply = (): void => {
        const right = sets.pop()!;
        const left  = sets[sets.length - 1];
        if (ops.pop() === '+') {
            for (const s of right) left.add(s);
        } else {
            const product = new Set<string>();
            for (const l of left) for (const r of right) product.add(l + r);
            sets[sets.length - 1] = product;
        }
    };

    const needsConcat = (i: number) =>
        i > 0 && (expression[i - 1] === '}' || /[a-z]/.test(expression[i - 1]));

    for (let i = 0; i < expression.length; i++) {
        const ch = expression[i];

        if (ch === ',') {
            while (ops.at(-1) === '*') apply(); // flush pending concats before union
            ops.push('+');
        } else if (ch === '{') {
            if (needsConcat(i)) ops.push('*');
            ops.push('{');
        } else if (ch === '}') {
            while (ops.at(-1) !== '{') apply();
            ops.pop(); // discard '{'
        } else {
            if (needsConcat(i)) ops.push('*');
            sets.push(new Set([ch]));
        }
    }

    while (ops.length) apply();

    return [...sets[0]].sort();
};