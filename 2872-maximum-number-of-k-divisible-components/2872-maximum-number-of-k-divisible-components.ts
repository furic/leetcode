/**
 * Finds maximum number of components when splitting a tree such that
 * each component's sum of values is divisible by k
 * Strategy: DFS from root, cut edges whenever subtree sum is divisible by k
 */
const maxKDivisibleComponents = (n: number, edges: number[][], values: number[], k: number): number => {
    // Build adjacency list representation of the tree
    const adjacencyList: number[][] = Array.from({ length: n }, () => []);
    for (const [nodeA, nodeB] of edges) {
        adjacencyList[nodeA].push(nodeB);
        adjacencyList[nodeB].push(nodeA);
    }

    let componentCount = 0;

    /**
     * Returns the subtree sum (mod k) after greedily cutting edges
     * When subtree sum is divisible by k, we "cut" the edge to parent (return 0)
     */
    const calculateSubtreeSum = (currentNode: number, parentNode: number): number => {
        let subtreeSum = values[currentNode];

        for (const neighbor of adjacencyList[currentNode]) {
            if (neighbor === parentNode) continue;
            subtreeSum += calculateSubtreeSum(neighbor, currentNode);
        }

        // If subtree sum is divisible by k, we can cut this subtree off
        if (subtreeSum % k === 0) {
            componentCount++;
            return 0; // Return 0 as this subtree is now a separate component
        }

        return subtreeSum;
    };

    calculateSubtreeSum(0, -1);

    return componentCount;
};