function bestClosingTime(customers: string): number {
    let penalty = 0;
    for (const c of customers) {
        if (c === 'Y') 
            penalty++;
    }

    let minPenalty = penalty;
    let minHour = 0;

    for (let i = 0; i < customers.length; i++) {
        if (customers[i] === 'Y')
            penalty--;
        else
            penalty++;

        if (penalty < minPenalty) {
            minPenalty = penalty;
            minHour = i + 1;
        }
    }
    return minHour;
};