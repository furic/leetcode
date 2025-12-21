const minCost = (s: string, cost: number[]): number => {
    const map = new Map<string, number>();
    for (let i = 0; i < cost.length; i++) {
        map.set(s[i], (map.get(s[i])! || 0) + cost[i]);
    }
    const costs = Array.from(map.values()).sort((a, b) => b - a);
    return costs.slice(1).reduce((a, b) => a + b, 0);
};