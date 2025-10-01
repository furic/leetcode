const numWaterBottles = (numBottles: number, numExchange: number): number => {
    let ans = numBottles;
    let empty = numBottles;
    while (empty >= numExchange) {
        const full = Math.floor(empty  / numExchange);
        ans += full;
        empty = full + empty % numExchange;
    }
    return ans;
};