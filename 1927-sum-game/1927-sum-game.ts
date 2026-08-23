function sumGame(num: string): boolean {
    const n: number = Math.floor(num.length / 2);

    const nums: number[] = [...num].map(
        ch => ch === '?' ? 9 : 2 * Number(ch)
    );

    const left: number = nums
        .slice(0, n)
        .reduce((sum, x) => sum + x, 0);

    const right: number = nums
        .slice(n)
        .reduce((sum, x) => sum + x, 0);

    return left !== right;
};