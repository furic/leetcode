/**
 * Finds minimum number of boxes needed to pack all apples
 * Strategy: Greedily use largest capacity boxes first to minimize box count
 */
const minimumBoxes = (apple: number[], capacity: number[]): number => {
    // Calculate total apples to pack
    const totalApples = apple.reduce((sum, appleCount) => sum + appleCount, 0);

    // Sort boxes by capacity in descending order (largest first)
    capacity.sort((a, b) => b - a);

    let remainingApples = totalApples;
    let boxesUsed = 0;
    
    // Greedily take largest boxes until all apples are packed
    while (remainingApples > 0) {
        remainingApples -= capacity[boxesUsed];
        boxesUsed++;
    }

    return boxesUsed;
};