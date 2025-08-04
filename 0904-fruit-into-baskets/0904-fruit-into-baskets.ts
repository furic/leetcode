// function totalFruit(fruits: number[]): number {
//     let start = 0
//     let start2 = -1
//     let currType = -1
//     let type2 = -1
//     let max = 0
//     for (let i = 0; i < fruits.length; i++) {
//         if (fruits[i] !== currType) {
//             if (currType === -1) {
//                 start = i
//                 currType = fruits[i]
//             } else if (fruits[i] === type2 || type2 === -1) {
//                 type2 = currType
//                 currType = fruits[i]
//                 start2 = i
//             } else if (fruits[i] !== type2) {
//                 max = Math.max(max, i - start)
//                 start = start2
//                 start2 = i
//                 type2 = currType
//                 currType = fruits[i]
//             } else {
//                 console.log(`[DBG] can there be else?`)
//             }
//         }
//     }
//     max = Math.max(max, fruits.length - start)
//     return max
// }

function totalFruit(fruits: number[]): number {
    let maxFruits = 0;
    let windowStart = 0;

    let lastFruitType = -1;
    let secondFruitType = -1;
    let lastFruitStartIndex = -1;

    for (let i = 0; i < fruits.length; i++) {
        const currentFruit = fruits[i];

        if (currentFruit !== lastFruitType) {
            if (secondFruitType === -1 || currentFruit === secondFruitType) {
                // Swap roles
                secondFruitType = lastFruitType;
                lastFruitType = currentFruit;
                lastFruitStartIndex = i;
            } else {
                // New third fruit type encountered
                maxFruits = Math.max(maxFruits, i - windowStart);
                windowStart = lastFruitStartIndex;
                secondFruitType = lastFruitType;
                lastFruitType = currentFruit;
                lastFruitStartIndex = i;
            }
        }
    }

    maxFruits = Math.max(maxFruits, fruits.length - windowStart);
    return maxFruits;
}