const totalFruit = (fruits: number[]): number => {
    let maxFruits = 0;
    let windowStart = 0;

    let lastFruitType = -1;
    let secondFruitType = -1;
    let lastFruitStartIndex = -1;

    for (let i = 0; i < fruits.length; i++) {
        const currentFruit = fruits[i];

        if (currentFruit !== lastFruitType) {
            if (secondFruitType === -1 || currentFruit === secondFruitType) {
                secondFruitType = lastFruitType;
                lastFruitType = currentFruit;
                lastFruitStartIndex = i;
            } else {
                maxFruits = Math.max(maxFruits, i - windowStart);
                windowStart = lastFruitStartIndex;
                secondFruitType = lastFruitType;
                lastFruitType = currentFruit;
                lastFruitStartIndex = i;
            }
        }
    }

    return Math.max(maxFruits, fruits.length - windowStart);
};