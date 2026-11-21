function findSubtreeSizes(parent: number[], s: string): number[] {
    const n = parent.length;
    const children: number[][] = Array.from({ length: n }, () => []);
    for (let x = 1; x < n; x++) children[parent[x]].push(x);
    const size: number[] = new Array(n).fill(1), above: number[] = new Array(n), last: number[] = new Array(26).fill(-1);  // last[c]: the deepest node with letter c on the path from the root
    const stack = [0];  // x enters x, ~x leaves it: no recursion, so no stack overflow on a deep tree
    while (stack.length) {
        let x = stack.pop()!;
        if (x >= 0) {
            const c = s.charCodeAt(x) - 97;
            above[x] = last[c];  // the closest ancestor with the same letter, or -1
            last[c] = x;
            stack.push(~x);  // leave x after all its children
            for (const child of children[x]) stack.push(child);
        } else {
            x = ~x;
            last[s.charCodeAt(x) - 97] = above[x];
            if (x > 0) size[above[x] >= 0 ? above[x] : parent[x]] += size[x];  // the root has no parent
        }
    }
    return size;
}