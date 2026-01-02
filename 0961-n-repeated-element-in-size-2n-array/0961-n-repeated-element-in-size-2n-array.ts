function repeatedNTimes(nums: number[]): number {
    const set = new Set<number>();
    for (const x of nums) {
        if (set.has(x)) return x;
        set.add(x);
    }
    return -1;
}