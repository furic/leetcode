const totalMoney = (days: number): number => {
    const nWeeks: number = Math.floor(days / 7);
    const rDays: number = days % 7;
    const ts = (n: number): number => (n * (n + 1)) >> 1;
    return ts(days) - 42 * ts(nWeeks - 1) - 6 * nWeeks * rDays;
};