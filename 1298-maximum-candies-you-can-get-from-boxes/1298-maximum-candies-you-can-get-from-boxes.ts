const maxCandies = (
    status: number[],
    candies: number[],
    keys: number[][],
    containedBoxes: number[][],
    initialBoxes: number[]
): number => {
    let totalCandies = 0;
    const n = status.length;
    const haveKey = [...status]; // 1 means we can open the box
    let foundOpenable = true;
    let boxes: number[] = [...initialBoxes];

    while (boxes.length > 0 && foundOpenable) {
        foundOpenable = false;
        const nextBoxes: number[] = [];

        for (const boxId of boxes) {
            if (haveKey[boxId] === 1) {
                foundOpenable = true;
                totalCandies += candies[boxId];

                for (const key of keys[boxId]) {
                    haveKey[key] = 1;
                }
                for (const newBox of containedBoxes[boxId]) {
                    nextBoxes.push(newBox);
                }

                // Mark box as "used" to avoid processing it again
                haveKey[boxId] = -1;
            } else if (haveKey[boxId] !== -1) {
                nextBoxes.push(boxId);
            }
        }

        boxes = nextBoxes;
    }

    return totalCandies;
};