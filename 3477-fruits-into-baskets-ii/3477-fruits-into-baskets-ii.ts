const numOfUnplacedFruits = (fruits: number[], baskets: number[]): number => {
    let count = 0;
    for (const fruit of fruits) {
        for (let i = 0; i < baskets.length; i++) {
            if (fruit <= baskets[i]) {
                baskets[i] = 0;
                break;
            }
            if (i === baskets.length - 1) {
                count++;
            }
        }

    }
    return count;
};