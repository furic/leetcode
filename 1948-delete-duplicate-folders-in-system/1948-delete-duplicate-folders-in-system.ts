const deleteDuplicateFolder = (paths: string[][]): string[][] => {
    class TrieNode {
        signature = ""; // serialized subtree structure
        children = new Map<string, TrieNode>(); // child folder -> child node
    }

    const root = new TrieNode();

    // Build the folder trie from given paths
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

    // Post-order DFS to generate unique signatures for duplicate detection
    const generateSignatures = (node: TrieNode): void => {
        if (node.children.size === 0) return;

        const childSignatures: string[] = [];
        for (const [folderName, childNode] of node.children.entries()) {
            generateSignatures(childNode);
            childSignatures.push(`${folderName}(${childNode.signature})`);
        }

        childSignatures.sort(); // ensure lexicographical consistency
        node.signature = childSignatures.join("");
        signatureFrequency.set(
            node.signature,
            (signatureFrequency.get(node.signature) ?? 0) + 1
        );
    };

    generateSignatures(root);

    const result: string[][] = [];
    const currentPath: string[] = [];

    // Pre-order DFS to collect paths of non-duplicate folders
    const collectPaths = (node: TrieNode): void => {
        if (
            node.signature !== "" &&
            signatureFrequency.get(node.signature)! > 1
        ) {
            return; // skip duplicate subtree
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