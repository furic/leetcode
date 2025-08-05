function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
    let count = 0;
    const n = baskets.length;
    for (const fruit of fruits) {
        let unset = 1;
        for (let i = 0; i < n; i++) {
            if (fruit <= baskets[i]) {
                baskets[i] = 0;
                unset = 0;
                break;
            }
        }
        count += unset;
    }
    return count;
};