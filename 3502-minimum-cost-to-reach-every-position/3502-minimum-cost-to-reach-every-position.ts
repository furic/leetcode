const minCosts = (cost: number[]): number[] => {
    const n = cost.length;
    const answer: number[] = new Array(n).fill(0);

    answer[0] = cost[0];

    for (let i = 1; i < n; i++) {
        answer[i] = Math.min(answer[i - 1], cost[i]);
    }

    return answer;
};