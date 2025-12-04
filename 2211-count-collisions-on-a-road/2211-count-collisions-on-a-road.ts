/**
 * Counts total collisions when cars move on an infinite road
 * Key insight: Cars that escape (leading L's, trailing R's) never collide.
 * All other moving cars will eventually stop, each contributing 1 collision.
 */
const countCollisions = (directions: string): number => {
    const numCars = directions.length;
    let leftBound = 0;
    let rightBound = numCars - 1;

    // Skip cars moving left at the start - they escape to the left
    while (leftBound < numCars && directions[leftBound] === "L") {
        leftBound++;
    }

    // Skip cars moving right at the end - they escape to the right
    while (rightBound >= leftBound && directions[rightBound] === "R") {
        rightBound--;
    }

    // Count non-stationary cars in the "collision zone"
    // Each moving car that eventually stops contributes exactly 1 collision
    let collisionCount = 0;
    for (let i = leftBound; i <= rightBound; i++) {
        if (directions[i] !== "S") {
            collisionCount++;
        }
    }
    
    return collisionCount;
};