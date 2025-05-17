function maxWeight(n: number, edges: number[][], k: number, t: number): number {
    let ajMat = new Map<number, [number, number][]>();
    let map = new Map<string, number>();

    for (let edge of edges) {
        let [x, y, w] = edge;
        let neighbors = ajMat.get(x) || [];
        neighbors.push([y, w]);
        ajMat.set(x, neighbors);
    }
    if (k == 0) return 0
    let maxResult = -1;

    function dfs(node: number, pathLength: number, totalWeight: number) {
        if (pathLength == k) {
            if (totalWeight < t) {
                maxResult = Math.max(maxResult, totalWeight);
            }
            return;
        }
        let key = `${node}.${pathLength}.${totalWeight}`

        if (map.has(key)) return
        map.set(key, maxResult)
        let neighbors = ajMat.get(node) || [];
        for (let [nextNode, weight] of neighbors) {
            if (totalWeight + weight > t) continue;
            dfs(nextNode, pathLength + 1, totalWeight + weight);
        }
    }

    for (let x of Array.from(ajMat.keys())) {
        dfs(x, 0, 0);
    }
    console.log(maxResult)
    return maxResult;
}