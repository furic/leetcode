function maxProduct(root: TreeNode | null): number {
    const MOD = 1_000_000_007;
    let total = 0, best = 0;

    const sum = (node: TreeNode | null): number => {
        if (!node) return 0;
        return node.val + sum(node.left) + sum(node.right);
    };

    total = sum(root);

    const dfs = (node: TreeNode | null): number => {
        if (!node) return 0;
        const s = node.val + dfs(node.left) + dfs(node.right);
        best = Math.max(best, s * (total - s));
        return s;
    };

    dfs(root);
    return best % MOD;
}