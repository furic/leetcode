function maxBottlesDrunk(numBottles: number, numExchange: number): number {
    let totalBottlesDrunk = numBottles;
    let emptyBottles = numBottles;

    // Keep exchanging empty bottles for full ones while we have enough to exchange
    while (emptyBottles >= numExchange) {
        totalBottlesDrunk++;
        emptyBottles -= numExchange - 1;
        numExchange++;
    }

    return totalBottlesDrunk;
};