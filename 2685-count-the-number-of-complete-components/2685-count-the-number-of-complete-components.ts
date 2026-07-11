const countCompleteComponents = (n: number, edges: number[][]): number => {
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }

    const visited = new Array<boolean>(n).fill(false);

    // BFS a component and check if it's complete (edges == n*(n-1)/2)
    const isComplete = (start: number): boolean => {
        const queue = [start];
        visited[start] = true;
        let head = 0, nodeCount = 0, edgeDegreeSum = 0;

        while (head < queue.length) {
            const curr = queue[head++];
            nodeCount++;
            edgeDegreeSum += adj[curr].length;
            for (const nb of adj[curr])
                if (!visited[nb]) { visited[nb] = true; queue.push(nb); }
        }

        return edgeDegreeSum / 2 === nodeCount * (nodeCount - 1) / 2;
    };

    let count = 0;
    for (let i = 0; i < n; i++)
        if (!visited[i] && isComplete(i)) count++;

    return count;
};