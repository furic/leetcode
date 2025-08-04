const totalFruit = (fruits: number[]): number => {
    const fruitCount: Map<number, number> = new Map();
    let left = 0;
    let maxFruits = 0;

    for (let right = 0; right < fruits.length; right++) {
        const currentFruit = fruits[right];
        fruitCount.set(currentFruit, (fruitCount.get(currentFruit) || 0) + 1);

        // If more than 2 types of fruits, shrink the window from the left
        while (fruitCount.size > 2) {
            const leftFruit = fruits[left];
            fruitCount.set(leftFruit, fruitCount.get(leftFruit)! - 1);
            if (fruitCount.get(leftFruit) === 0) {
                fruitCount.delete(leftFruit);
            }
            left++;
        }

        const currentWindowSize = right - left + 1;
        maxFruits = Math.max(maxFruits, currentWindowSize);
    }

    return maxFruits;
};