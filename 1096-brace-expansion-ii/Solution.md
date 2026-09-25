# String | Stack | Backtracking | Enumeration | 3ms

# Intuition
The expression mixes two operations — union (`,`) and concatenation (adjacent terms) — with grouping (`{}`). This is exactly the structure of an arithmetic expression with two precedences: concatenation (`*`) binds tighter than union (`+`). The shunting-yard algorithm handles this cleanly with an operator stack and an operand stack.

# Approach
- **Two stacks:** `ops` holds operators (`'*'` for concat, `'+'` for union, `'{'` as a grouping marker); `sets` holds `Set<string>` operands.
- **`apply()`:** Pops the top operator and two sets. For `'+'`, takes the union in-place. For `'*'`, takes the Cartesian product (all concatenations).
- **Implicit concat:** Before pushing any letter or `'{'`, check if the previous character was a letter or `'}'` — if so, push `'*'` first.
- **On `','`:** Flush all pending `'*'` operators (higher precedence) before pushing `'+'`.
- **On `'}'`:** Apply all operators until the matching `'{'` is popped.
- **Final step:** Drain remaining operators, then sort and return the single remaining set.

# Complexity
- Time complexity: $$O(W \cdot L \log W)$$ where $$W$$ is the number of distinct words in the result and $$L$$ is their average length — dominated by the final sort. Intermediate set operations cost up to $$O(W^2 \cdot L)$$ in the worst case for Cartesian products.

- Space complexity: $$O(W \cdot L)$$ — storing all intermediate and final sets.

# Code
```typescript []
const braceExpansionII = (expression: string): string[] => {
    const ops: string[] = [];
    const sets: Set<string>[] = [];

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
            while (ops.at(-1) === '*') apply();
            ops.push('+');
        } else if (ch === '{') {
            if (needsConcat(i)) ops.push('*');
            ops.push('{');
        } else if (ch === '}') {
            while (ops.at(-1) !== '{') apply();
            ops.pop();
        } else {
            if (needsConcat(i)) ops.push('*');
            sets.push(new Set([ch]));
        }
    }

    while (ops.length) apply();

    return [...sets[0]].sort();
};
```