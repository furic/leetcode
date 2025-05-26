const largestPathValue = (colors: string, edges: number[][]): number => {
    const numNodes = colors.length;
    const adjacencyList: number[][] = Array.from({ length: numNodes }, () => []);
    const indegree: number[] = Array(numNodes).fill(0);

    // Build the graph and compute indegrees
    for (const [from, to] of edges) {
        adjacencyList[from].push(to);
        indegree[to]++;
    }

    // dp[node][color] = max number of times this color appears on any path to this node
    const colorCount: number[][] = Array.from({ length: numNodes }, () => Array(26).fill(0));
    const queue: number[] = [];

    // Initialize the queue with nodes of indegree 0
    for (let i = 0; i < numNodes; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
        const colorIndex = colors.charCodeAt(i) - 97;
        colorCount[i][colorIndex] = 1;
    }

    let visitedNodes = 0;
    let maxColorValue = 0;

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        visitedNodes++;

        const currentColorValues = colorCount[currentNode];
        maxColorValue = Math.max(maxColorValue, Math.max(...currentColorValues));

        for (const neighbor of adjacencyList[currentNode]) {
            for (let c = 0; c < 26; c++) {
                const increment = (colors.charCodeAt(neighbor) - 97 === c) ? 1 : 0;
                colorCount[neighbor][c] = Math.max(colorCount[neighbor][c], currentColorValues[c] + increment);
            }

            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If we visited fewer nodes than exist, there's a cycle
    return visitedNodes === numNodes ? maxColorValue : -1;
};