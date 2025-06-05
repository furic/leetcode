const smallestEquivalentString = (s1: string, s2: string, baseStr: string): string => {
    const adj: Record<string, string[]> = {};

    // Step 1: Build the adjacency list for equivalence graph
    for (let i = 0; i < s1.length; i++) {
        const u = s1[i];
        const v = s2[i];
        if (!adj[u]) adj[u] = [];
        if (!adj[v]) adj[v] = [];
        adj[u].push(v);
        adj[v].push(u);
    }

    // DFS helper to find smallest lex character in component
    const dfs = (ch: string, visited: Set<string>): string => {
        visited.add(ch);
        let minChar = ch;

        for (const neighbor of adj[ch] || []) {
            if (!visited.has(neighbor)) {
                const nextMin = dfs(neighbor, visited);
                if (nextMin < minChar) minChar = nextMin;
            }
        }

        return minChar;
    };

    let result = '';

    for (const ch of baseStr) {
        if (!adj[ch]) {
            result += ch;
        } else {
            const visited = new Set<string>();
            const minChar = dfs(ch, visited);
            result += minChar;
        }
    }

    return result;
};