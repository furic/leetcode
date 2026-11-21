# Iterative DFS Closest Same-Letter Ancestor | 27 Lines | O(n) | 260ms

# Intuition
Every node needs its closest ancestor with the same letter in the original tree. A DFS from the root can track, for each letter, the deepest node on the current root-to-node path. Once every node knows its new parent, subtree sizes can be built bottom-up, adding each node's size to its new parent as the node finishes.

# Approach
- Build a `children` list from `parent`.
- Keep `deepestByLetter[c]`, the deepest node with letter `c` on the current root-to-node path, or `-1` if none. This is a per-letter stack of ancestors, stored as one slot per letter and restored on exit.
- Run the DFS with an explicit stack to avoid recursion overflow on a deep tree (`n` up to `10^5`). A non-negative entry means "enter node" and `~node` means "leave node".
- **Enter `node`:**
  - Record `sameLetterAncestor[node] = deepestByLetter[letter]`, the closest ancestor with the same letter.
  - Set `deepestByLetter[letter] = node`.
  - Push `~node` first, then all its children, so the exit marker is popped only after every child has been fully processed.
- **Leave `node`:**
  - Restore `deepestByLetter[letter] = sameLetterAncestor[node]`, so siblings and other branches don't see this node as an ancestor.
  - If `node` is not the root, its new parent is `sameLetterAncestor[node]` if it exists, otherwise the original `parent[node]`. Add `subtreeSize[node]` to `subtreeSize[newParent]`.
- **Why sizes are final at exit:** every node whose new parent is `node` is a descendant of `node` in the original tree, so it has already left before `node` does. The new parent is always an ancestor, so it is still on the stack and has not left yet.
- All nodes start with size `1` (themselves), and the answer is `subtreeSize`.

# Complexity
- Time complexity: $$O(n)$$ — each node is pushed, entered and left once, with $$O(1)$$ work each.

- Space complexity: $$O(n)$$ — the children lists, the DFS stack, and the `sameLetterAncestor` and `subtreeSize` arrays. The 26-entry letter table is constant.

# Code
```typescript []
const findSubtreeSizes = (parent: number[], s: string): number[] => {
    const nodeCount = parent.length;
    const children: number[][] = Array.from({ length: nodeCount }, () => []);
    for (let node = 1; node < nodeCount; node++) children[parent[node]].push(node);

    const subtreeSize: number[] = new Array(nodeCount).fill(1);
    const sameLetterAncestor: number[] = new Array(nodeCount);
    const deepestByLetter: number[] = new Array(26).fill(-1);

    const stack = [0];
    while (stack.length) {
        const entry = stack.pop()!;

        if (entry >= 0) {
            const letter = s.charCodeAt(entry) - 97;
            sameLetterAncestor[entry] = deepestByLetter[letter];
            deepestByLetter[letter] = entry;
            stack.push(~entry);
            for (const child of children[entry]) stack.push(child);
        } else {
            const node = ~entry;
            deepestByLetter[s.charCodeAt(node) - 97] = sameLetterAncestor[node];
            if (node > 0) {
                const newParent = sameLetterAncestor[node] >= 0 ? sameLetterAncestor[node] : parent[node];
                subtreeSize[newParent] += subtreeSize[node];
            }
        }
    }

    return subtreeSize;
};
```