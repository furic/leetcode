# Trie + Signature Deduplication | 62 Lines | O(N log N) | 131ms

# Intuition

To efficiently detect and remove duplicate folders with identical subtree structures, we can model the folder hierarchy using a **Trie**. By generating a **unique serialized signature** for each subtree, we can identify duplicates globally and remove them in a single pass.

# Approach

1. **Build a Trie:**
   - Insert each path into a Trie structure where each node represents a folder.

2. **Post-order DFS to generate signatures:**
   - For each node, serialize its immediate children in the form `folderName(childSignature)` and sort them to ensure consistency.
   - Store and count each signature globally.

3. **Pre-order DFS to collect valid paths:**
   - Traverse while skipping subtrees whose serialized signatures occur more than once (duplicates).
   - Record the current valid path to the result.

This ensures all duplicate folders and their subfolders are removed **in a single pass**, even if they become identical after initial deletion.

# Complexity

- **Time complexity:**  
  $$O(N \log N)$$  
  - N = total number of folders across all paths.
  - Sorting child signatures dominates per node.
- **Space complexity:**  
  $$O(N)$$  
  - For the Trie structure, signature map, and result collection.

# Code

```typescript
const deleteDuplicateFolder = (paths: string[][]): string[][] => {
    class TrieNode {
        signature = "";
        children = new Map<string, TrieNode>();
    }

    const root = new TrieNode();

    for (const path of paths) {
        let current = root;
        for (const folder of path) {
            if (!current.children.has(folder)) {
                current.children.set(folder, new TrieNode());
            }
            current = current.children.get(folder)!;
        }
    }

    const signatureFrequency = new Map<string, number>();

    const generateSignatures = (node: TrieNode): void => {
        if (node.children.size === 0) return;
        const childSignatures: string[] = [];
        for (const [folderName, childNode] of node.children.entries()) {
            generateSignatures(childNode);
            childSignatures.push(`${folderName}(${childNode.signature})`);
        }
        childSignatures.sort();
        node.signature = childSignatures.join("");
        signatureFrequency.set(
            node.signature,
            (signatureFrequency.get(node.signature) ?? 0) + 1
        );
    };

    generateSignatures(root);

    const result: string[][] = [];
    const currentPath: string[] = [];

    const collectPaths = (node: TrieNode): void => {
        if (
            node.signature !== "" &&
            signatureFrequency.get(node.signature)! > 1
        ) {
            return;
        }
        if (currentPath.length > 0) {
            result.push([...currentPath]);
        }
        for (const [folderName, childNode] of node.children.entries()) {
            currentPath.push(folderName);
            collectPaths(childNode);
            currentPath.pop();
        }
    };

    collectPaths(root);
    return result;
};
```