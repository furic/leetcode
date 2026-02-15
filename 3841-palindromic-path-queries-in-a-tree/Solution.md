# LCA + XOR Bitmask + Fenwick Tree | 165 Lines | O((n+q) log n) | 927ms

# Intuition

A string can form a palindrome if at most one character has odd frequency. Use XOR bitmasks to track character parities on paths. Combine Binary Lifting (LCA), Euler Tour (subtree updates), and Fenwick Tree (range XOR updates) for efficient queries.

# Approach

**Data Structures:**
1. **Binary Lifting**: O(log n) LCA queries
2. **Euler Tour**: Map tree to array with [in, out] intervals for subtrees
3. **Fenwick Tree**: O(log n) range XOR updates on Euler tour
4. **XOR Bitmask**: Track character parity (bit i = 1 if char i appears odd times)

**Key Insights:**
- Path(u,v) XOR = XOR(root,u) ⊕ XOR(root,v) ⊕ char(LCA)
- Palindrome possible ⟺ XOR has ≤1 bit set ⟺ (mask & (mask-1)) == 0
- Update node: XOR entire subtree using Euler tour range

**Query Processing:**
- **update u c**: XOR subtree with (oldMask ⊕ newMask)
- **query u v**: Compute path XOR, check if ≤1 bit set

**Example: n=3, edges=[[0,1],[1,2]], s="aac"**

Initial: XOR from root: [1, 1⊕1=0, 0⊕4=4]

Query 0→2:
- XOR(0,2) = 1⊕4⊕1 = 4 (only 'c')
- 4 & 3 = 0 ✓ (power of 2)

Update 1→'b':
- Old=1, New=2, Delta=3
- XOR subtree [1,2]

Query 0→2:
- New XOR = different
- Not palindrome ✗

# Complexity

- Time complexity: $$O((n+q) \log n)$$
  - Preprocessing: O(n log n) for binary lifting
  - Per query: O(log n) for LCA/Fenwick
  - Total: O((n+q) log n)

- Space complexity: $$O(n \log n)$$
  - Binary lifting table: O(n log n)
  - Euler tour arrays: O(n)
  - Fenwick tree: O(n)
  - Overall: O(n log n)

# Code
```typescript []
const palindromePath = (n: number, edges: number[][], s: string, queries: string[]): boolean[] => {
    const ALPHABET_SIZE = 26;
    const CHAR_CODE_A = 97;
    
    const adjacencyList: number[][] = Array.from({length: n}, () => []);
    for (const [nodeU, nodeV] of edges) {
        adjacencyList[nodeU].push(nodeV);
        adjacencyList[nodeV].push(nodeU);
    }
    
    const parent = new Int32Array(n).fill(-1);
    const depth = new Int32Array(n);
    const eulerInTime = new Int32Array(n);
    const eulerOutTime = new Int32Array(n);
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
        dfsStack.push([node, true]);
        
        for (const child of adjacencyList[node]) {
            if (child !== parent[node]) {
                parent[child] = node;
                depth[child] = depth[node] + 1;
                dfsStack.push([child, false]);
            }
        }
    }
    
    const maxJumpPower = Math.ceil(Math.log2(n + 1)) + 1;
    const ancestorJumpTable: Int32Array[] = Array.from({length: n}, 
        () => new Int32Array(maxJumpPower).fill(-1)
    );
    
    for (let i = 0; i < n; i++) ancestorJumpTable[i][0] = parent[i];
    
    for (let jumpPower = 1; jumpPower < maxJumpPower; jumpPower++) {
        for (let node = 0; node < n; node++) {
            if (ancestorJumpTable[node][jumpPower - 1] !== -1) {
                const midAncestor = ancestorJumpTable[node][jumpPower - 1];
                ancestorJumpTable[node][jumpPower] = ancestorJumpTable[midAncestor][jumpPower - 1];
            }
        }
    }
    
    const findLCA = (nodeU: number, nodeV: number): number => {
        if (depth[nodeU] < depth[nodeV]) [nodeU, nodeV] = [nodeV, nodeU];
        
        let depthDifference = depth[nodeU] - depth[nodeV];
        for (let jumpPower = 0; depthDifference > 0; jumpPower++, depthDifference >>= 1) {
            if (depthDifference & 1) {
                nodeU = ancestorJumpTable[nodeU][jumpPower];
            }
        }
        
        if (nodeU === nodeV) return nodeU;
        
        for (let jumpPower = maxJumpPower - 1; jumpPower >= 0; jumpPower--) {
            if (ancestorJumpTable[nodeU][jumpPower] !== ancestorJumpTable[nodeV][jumpPower]) {
                nodeU = ancestorJumpTable[nodeU][jumpPower];
                nodeV = ancestorJumpTable[nodeV][jumpPower];
            }
        }
        
        return ancestorJumpTable[nodeU][0];
    };
    
    const charBitmask = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        charBitmask[i] = 1 << (s.charCodeAt(i) - CHAR_CODE_A);
    }
    
    const pathXorFromRoot = new Int32Array(n);
    for (const node of dfsOrder) {
        if (parent[node] === -1) {
            pathXorFromRoot[node] = charBitmask[node];
        } else {
            pathXorFromRoot[node] = pathXorFromRoot[parent[node]] ^ charBitmask[node];
        }
    }
    
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
    
    const getCurrentRootXor = (node: number): number => {
        return pathXorFromRoot[node] ^ fenwickQuery(eulerInTime[node]);
    };
    
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
            
            if (oldMask !== newMask) {
                rangeXorUpdate(eulerInTime[targetNode], eulerOutTime[targetNode], oldMask ^ newMask);
            }
        } else {
            const nodeU = parseInt(parts[1]);
            const nodeV = parseInt(parts[2]);
            const lcaNode = findLCA(nodeU, nodeV);
            
            const pathCharXor = getCurrentRootXor(nodeU) ^ getCurrentRootXor(nodeV) ^ getCurrentCharMask(lcaNode);
            
            const canFormPalindrome = (pathCharXor & (pathCharXor - 1)) === 0;
            result.push(canFormPalindrome);
        }
    }
    
    return result;
};
```