function minCost(colors: string, neededTime: number[]): number {
    let j: number = 0;
    let cant: number = 0;

    for (let i = 1; i < colors.length; i++) {
        if (colors[i] == colors[j]) {
            if (neededTime[i] < neededTime[j]) {
                cant += neededTime[i]
            } else {
                cant += neededTime[j]
                j = i
            }
        } else j = i
    }

    return cant
};