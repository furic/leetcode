const findSubtreeSizes = (parent: number[], s: string): number[] => {
    const nodeCount = parent.length;
    const children: number[][] = Array.from({ length: nodeCount }, () => []);
    for (let node = 1; node < nodeCount; node++) children[parent[node]].push(node);

    const subtreeSize: number[] = new Array(nodeCount).fill(1);
    const sameLetterAncestor: number[] = new Array(nodeCount);
    const deepestByLetter: number[] = new Array(26).fill(-1);  // deepestByLetter[c]: the deepest node with letter c on the path from the root

    const stack = [0];  // node enters it, ~node leaves it: no recursion, so no stack overflow on a deep tree
    while (stack.length) {
        const entry = stack.pop()!;

        if (entry >= 0) {
            const letter = s.charCodeAt(entry) - 97;
            sameLetterAncestor[entry] = deepestByLetter[letter];  // the closest ancestor with the same letter, or -1
            deepestByLetter[letter] = entry;
            stack.push(~entry);  // leave the node after all its children
            for (const child of children[entry]) stack.push(child);
        } else {
            const node = ~entry;
            deepestByLetter[s.charCodeAt(node) - 97] = sameLetterAncestor[node];
            if (node > 0) {  // the root has no parent
                const newParent = sameLetterAncestor[node] >= 0 ? sameLetterAncestor[node] : parent[node];
                subtreeSize[newParent] += subtreeSize[node];
            }
        }
    }

    return subtreeSize;
};