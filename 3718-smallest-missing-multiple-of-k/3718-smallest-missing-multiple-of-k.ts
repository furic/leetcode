function missingMultiple(nums: number[], k: number): number {
    const hashSet: Set<number> = new Set(nums);

    let i: number = 1;

    while (true) {
        if (!hashSet.has(i * k)) {
            return i * k;
        }

        i++;
    }
};