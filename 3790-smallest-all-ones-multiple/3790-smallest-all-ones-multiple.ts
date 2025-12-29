const minAllOneMultiple = (k: number): number => {
    if (k % 2 === 0 || k % 5 === 0) return -1;

    let remainder = 0;
    for (let digits = 1; digits <= k; digits++) {
        remainder = (remainder * 10 + 1) % k;
        if (remainder === 0) return digits;
    }

    return -1;
};