// 3 ms, array
const maxLevelSum = (root) => {
    const q = [root];
    let i = 0;
    let lvl = 1;
    let maxLvl = 1;
    let maxSum = root.val;

    for (; i < q.length; ++lvl) {
        const endLvl = q.length;
        let sum = 0;
        for (; i < endLvl; ++i) {
            const node = q[i];
            sum += node.val;
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        if (sum > maxSum) {
            maxSum = sum;
            maxLvl = lvl;
        }
    }
    return maxLvl;
};