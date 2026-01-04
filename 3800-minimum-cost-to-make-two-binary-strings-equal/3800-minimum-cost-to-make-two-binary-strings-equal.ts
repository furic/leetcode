const minimumCost = (
    s: string,
    t: string,
    flipCost: number,
    swapCost: number,
    crossCost: number
): number => {
    let countA = 0; // s[i]='0', t[i] = '1'
    let countB = 0; // s[i]='1', t[i] = '0'

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "0" && t[i] === "1") countA++;
        else if (s[i] === "1" && t[i] === "0") countB++;
    }

    const pairedAB = Math.min(countA, countB);
    const remaining = Math.abs(countA - countB);

    const costAB = pairedAB * Math.min(2 * flipCost, swapCost);

    const costRemaining =
        Math.floor(remaining / 2) *
        Math.min(2 * flipCost, crossCost + swapCost);

    const costLeftover = (remaining % 2) * flipCost;

    return costAB + costRemaining + costLeftover;
};