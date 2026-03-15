const firstUniqueEven = (nums: number[]): number => {
    const evens = new Set<number>();
    const duplicates = new Set<number>();
    for (let num of nums) {
        if (duplicates.has(num)) continue;
        if (num % 2 === 0) {
            if (evens.has(num)) {
                evens.delete(num);
                duplicates.add(num);
            } else {
                evens.add(num)
            }
        }
    }
    for (let num of nums) {
        if (evens.has(num)) return num;
    }
    return -1;
};