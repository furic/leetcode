const generateParenthesis = (n: number): string[] => {
    const results: string[] = [];

    const dfs = (openCount: number, closeCount: number, current: string): void => {
        if (current.length === n * 2) {
            results.push(current);
            return;
        }

        if (openCount < n)            dfs(openCount + 1, closeCount, current + '(');
        if (openCount > closeCount)   dfs(openCount, closeCount + 1, current + ')');
    };

    dfs(0, 0, '');
    return results;
};