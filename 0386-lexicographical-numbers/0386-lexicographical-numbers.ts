const lexicalOrder = (n: number): number[] => {
    const result: number[] = [];

    const dfs = (current: number): void => {
        if (current > n) return;

        result.push(current);

        for (let digit = 0; digit <= 9; digit++) {
            const nextNumber = current * 10 + digit;
            if (nextNumber > n) return;
            dfs(nextNumber);
        }
    };

    for (let i = 1; i <= 9; i++) {
        dfs(i);
    }

    return result;
};