/**
 * Determines if path characters can form palindromes, with node character updates
 * Strategy: 
 * 1. Use Euler tour + Binary Lifting for LCA queries
 * 2. Track character frequencies as XOR bitmasks (bit i = parity of char i)
 * 3. Use Fenwick Tree for range updates when characters change
 * 4. Palindrome check: XOR mask has at most 1 bit set (≤1 char with odd count)
 */
const palindromePath = (n: number, edges: number[][], s: string, queries: string[]): boolean[] => {
    const ALPHABET_SIZE = 26;
    const CHAR_CODE_A = 97;
    
    // Build adjacency list for tree
    const adjacencyList: number[][] = Array.from({length: n}, () => []);
    for (const [nodeU, nodeV] of edges) {
        adjacencyList[nodeU].push(nodeV);
        adjacencyList[nodeV].push(nodeU);
    }
    
    // DFS to compute: parent, depth, Euler tour timestamps, traversal order
    const parent = new Int32Array(n).fill(-1);
    const depth = new Int32Array(n);
    const eulerInTime = new Int32Array(n);   // Entry time in Euler tour
    const eulerOutTime = new Int32Array(n);  // Exit time in Euler tour
    const dfsOrder: number[] = [];
    
    const dfsStack: [number, boolean][] = [[0, false]];
    let timestamp = 0;
    
    while (dfsStack.length > 0) {
        const [node, isExiting] = dfsStack.pop()!;
        
        if (isExiting) {
            eulerOutTime[node] = timestamp - 1;
            continue;
        }
        
        eulerInTime[node] = timestamp++;
        dfsOrder.push(node);
        dfsStack.push([node, true]);  // Mark for exit processing
        
        for (const child of adjacencyList[node]) {
            if (child !== parent[node]) {
                parent[child] = node;
                depth[child] = depth[node] + 1;
                dfsStack.push([child, false]);
            }
        }
    }
    
    // Binary lifting table for LCA: ancestorJumpTable[node][k] = 2^k-th ancestor
    const maxJumpPower = Math.ceil(Math.log2(n + 1)) + 1;
    const ancestorJumpTable: Int32Array[] = Array.from({length: n}, 
        () => new Int32Array(maxJumpPower).fill(-1)
    );
    
    // Initialize: 2^0-th ancestor = parent
    for (let i = 0; i < n; i++) ancestorJumpTable[i][0] = parent[i];
    
    // Fill jump table: 2^j-th ancestor = 2^(j-1)-th ancestor's 2^(j-1)-th ancestor
    for (let jumpPower = 1; jumpPower < maxJumpPower; jumpPower++) {
        for (let node = 0; node < n; node++) {
            if (ancestorJumpTable[node][jumpPower - 1] !== -1) {
                const midAncestor = ancestorJumpTable[node][jumpPower - 1];
                ancestorJumpTable[node][jumpPower] = ancestorJumpTable[midAncestor][jumpPower - 1];
            }
        }
    }
    
    // Find Lowest Common Ancestor using binary lifting
    const findLCA = (nodeU: number, nodeV: number): number => {
        // Make nodeU the deeper node
        if (depth[nodeU] < depth[nodeV]) [nodeU, nodeV] = [nodeV, nodeU];
        
        // Bring nodeU to same level as nodeV
        let depthDifference = depth[nodeU] - depth[nodeV];
        for (let jumpPower = 0; depthDifference > 0; jumpPower++, depthDifference >>= 1) {
            if (depthDifference & 1) {
                nodeU = ancestorJumpTable[nodeU][jumpPower];
            }
        }
        
        if (nodeU === nodeV) return nodeU;
        
        // Binary search for LCA
        for (let jumpPower = maxJumpPower - 1; jumpPower >= 0; jumpPower--) {
            if (ancestorJumpTable[nodeU][jumpPower] !== ancestorJumpTable[nodeV][jumpPower]) {
                nodeU = ancestorJumpTable[nodeU][jumpPower];
                nodeV = ancestorJumpTable[nodeV][jumpPower];
            }
        }
        
        return ancestorJumpTable[nodeU][0];
    };
    
    // Character bitmask: bit i = 1 if char i appears odd times
    const charBitmask = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        charBitmask[i] = 1 << (s.charCodeAt(i) - CHAR_CODE_A);
    }
    
    // XOR of all character masks from root to each node
    const pathXorFromRoot = new Int32Array(n);
    for (const node of dfsOrder) {
        if (parent[node] === -1) {
            pathXorFromRoot[node] = charBitmask[node];
        } else {
            pathXorFromRoot[node] = pathXorFromRoot[parent[node]] ^ charBitmask[node];
        }
    }
    
    // Fenwick Tree for range XOR updates (handles character changes in subtree)
    const fenwickTree = new Int32Array(n + 2);
    
    const fenwickUpdate = (index: number, delta: number) => {
        for (index++; index <= n + 1; index += index & -index) {
            fenwickTree[index] ^= delta;
        }
    };
    
    const fenwickQuery = (index: number): number => {
        let result = 0;
        for (index++; index > 0; index -= index & -index) {
            result ^= fenwickTree[index];
        }
        return result;
    };
    
    const rangeXorUpdate = (leftIndex: number, rightIndex: number, delta: number) => {
        fenwickUpdate(leftIndex, delta);
        fenwickUpdate(rightIndex + 1, delta);
    };
    
    // Get current XOR from root considering all updates
    const getCurrentRootXor = (node: number): number => {
        return pathXorFromRoot[node] ^ fenwickQuery(eulerInTime[node]);
    };
    
    // Get current character mask for a node
    const getCurrentCharMask = (node: number): number => {
        if (parent[node] === -1) return getCurrentRootXor(node);
        return getCurrentRootXor(node) ^ getCurrentRootXor(parent[node]);
    };
    
    const result: boolean[] = [];
    
    for (const query of queries) {
        const parts = query.split(' ');
        
        if (parts[0] === 'update') {
            const targetNode = parseInt(parts[1]);
            const newChar = parts[2];
            const newMask = 1 << (newChar.charCodeAt(0) - CHAR_CODE_A);
            const oldMask = getCurrentCharMask(targetNode);
            
            // Update subtree if character changed
            if (oldMask !== newMask) {
                rangeXorUpdate(eulerInTime[targetNode], eulerOutTime[targetNode], oldMask ^ newMask);
            }
        } else {
            const nodeU = parseInt(parts[1]);
            const nodeV = parseInt(parts[2]);
            const lcaNode = findLCA(nodeU, nodeV);
            
            // Path XOR = (root to U) XOR (root to V) XOR (char at LCA)
            // This gives XOR of all chars on path U to V
            const pathCharXor = getCurrentRootXor(nodeU) ^ getCurrentRootXor(nodeV) ^ getCurrentCharMask(lcaNode);
            
            // Palindrome possible if at most 1 char has odd count
            // Equivalent to: XOR has at most 1 bit set
            // Check: (mask & (mask-1)) === 0 means mask is power of 2 or 0
            const canFormPalindrome = (pathCharXor & (pathCharXor - 1)) === 0;
            result.push(canFormPalindrome);
        }
    }
    
    return result;
};