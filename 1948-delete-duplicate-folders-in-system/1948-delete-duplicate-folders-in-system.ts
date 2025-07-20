class FolderNode {
    name: string;
    children: Map<string, FolderNode>;
    signature: string;

    constructor(name: string) {
        this.name = name;
        this.children = new Map();
        this.signature = "";
    }
}

const deleteDuplicateFolder = (paths: string[][]): string[][] => {
    const root = new FolderNode("");

    // Build the folder tree
    for (const path of paths) {
        let current = root;
        for (const folder of path) {
            if (!current.children.has(folder)) {
                current.children.set(folder, new FolderNode(folder));
            }
            current = current.children.get(folder)!;
        }
    }

    const signatureCount = new Map<string, number>();

    // Generate unique subtree signatures for duplicate detection
    const generateSignatures = (node: FolderNode): string => {
        if (node.children.size === 0) {
            node.signature = "";
            return "";
        }

        const childSignatures: string[] = [];
        const sortedChildren = Array.from(node.children.entries()).sort(
            ([aName], [bName]) => aName.localeCompare(bName)
        );

        for (const [childName, childNode] of sortedChildren) {
            const childSignature = generateSignatures(childNode);
            childSignatures.push(`${childName}(${childSignature})`);
        }

        node.signature = childSignatures.join("");
        signatureCount.set(node.signature, (signatureCount.get(node.signature) ?? 0) + 1);
        return node.signature;
    };

    generateSignatures(root);

    const result: string[][] = [];
    const currentPath: string[] = [];

    // Collect non-duplicate folder paths
    const collectValidPaths = (node: FolderNode) => {
        if (
            node.signature !== "" &&
            signatureCount.get(node.signature)! >= 2
        ) {
            return; // skip duplicates
        }

        if (node.name !== "") {
            currentPath.push(node.name);
            result.push([...currentPath]);
        }

        const sortedChildren = Array.from(node.children.entries()).sort(
            ([aName], [bName]) => aName.localeCompare(bName)
        );

        for (const [, childNode] of sortedChildren) {
            collectValidPaths(childNode);
        }

        if (node.name !== "") {
            currentPath.pop();
        }
    };

    for (const [, childNode] of root.children.entries()) {
        collectValidPaths(childNode);
    }

    return result;
};