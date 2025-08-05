const numOfUnplacedFruits = (fruits: number[], baskets: number[]): number => {
    let unplacedCount = 0;

    for (const fruitQuantity of fruits) {
        let isPlaced = false;

        for (let i = 0; i < baskets.length; i++) {
            if (baskets[i] >= fruitQuantity) {
                baskets[i] = 0; // Mark the basket as used
                isPlaced = true;
                break;
            }
        }

        if (!isPlaced) unplacedCount++;
    }

    return unplacedCount;
};