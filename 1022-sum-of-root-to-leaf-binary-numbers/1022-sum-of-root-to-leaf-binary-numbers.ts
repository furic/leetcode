function sumRootToLeaf(root: TreeNode | null): number {
    let total = 0;

    function dfs(node: TreeNode | null, curr: number): void {
        if (!node) return;

        curr = (curr * 2) + node.val;

        if (!node.left && !node.right) {
            total += curr;
            return;
        }

        dfs(node.left, curr);
        dfs(node.right, curr);
    }

    dfs(root, 0);
    return total;
}