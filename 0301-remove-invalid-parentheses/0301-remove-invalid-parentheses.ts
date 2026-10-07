const removeInvalidParentheses = (s: string): string[] => {
    const results: string[] = [];

    // Removes one excess 'open' char, scanning from index i, trying removals from index j onward.
    // Handles one direction (left-to-right for '(', then reversed for ')').
    const remove = (str: string, startScan: number, startRemove: number, open: string, close: string): void => {
        let balance = 0;

        for (let k = startScan; k < str.length; k++) {
            if (str[k] === open) balance++;
            if (str[k] === close) balance--;

            if (balance < 0) {
                // Try removing each distinct run of `close` chars in [startRemove, k]
                for (let x = startRemove; x <= k; x++) {
                    if (str[x] === close && (x === startRemove || str[x - 1] !== close)) {
                        remove(str.slice(0, x) + str.slice(x + 1), k, x, open, close);
                    }
                }
                return;
            }
        }

        const reversed = [...str].reverse().join('');

        if (open === '(') {
            // First pass done (removed excess ')'); now reverse and remove excess '(' (which look like ')' reversed)
            remove(reversed, 0, 0, ')', '(');
        } else {
            results.push(reversed);
        }
    };

    remove(s, 0, 0, '(', ')');
    return results;
};