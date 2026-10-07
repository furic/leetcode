/** How much does this character add to the balance? */
const balanceOf = (ch: string): number =>
    ch === '(' ? 1 : ch === ')' ? -1 : 0;

const removeInvalidParentheses = (s: string): string[] => {
    const n = s.length;

    // remainingClose[i] = count of ')' in s[i..n-1]
    const remainingClose = new Int8Array(n + 1);
    for (let i = n - 1; i >= 0; i--)
        remainingClose[i] = Number(s[i] === ')') + remainingClose[i + 1];

    const seen = new Set<string>();
    let minRemovals = n;
    let answers: string[] = [];

    const backtrack = (i: number, balance: number, removals: number, prefix: string): void => {
        // Prune: balance can never recover if it exceeds remaining ')' count, or too many removed already
        if (balance < 0 || balance > remainingClose[i] || removals > minRemovals) return;

        const key = `${i}-${balance}-${removals}-${prefix}`;
        if (seen.has(key)) return;
        seen.add(key);

        if (i === n) {
            if (balance !== 0) return;
            if (removals === minRemovals) answers.push(prefix);
            else if (removals < minRemovals) { minRemovals = removals; answers = [prefix]; }
            return;
        }

        // Keep s[i]
        backtrack(i + 1, balance + balanceOf(s[i]), removals, prefix + s[i]);

        // Remove s[i], only valid for parentheses
        if (balanceOf(s[i]) !== 0) backtrack(i + 1, balance, removals + 1, prefix);
    };

    backtrack(0, 0, 0, '');
    return answers;
};