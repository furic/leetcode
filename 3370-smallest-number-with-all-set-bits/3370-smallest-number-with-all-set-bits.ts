function smallestNumber(n: number): number {
    return (1 << n.toString(2).length) - 1
};