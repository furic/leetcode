const findKthNumber = (n: number, k: number): number => {
    let currentPrefix = 1;
    k -= 1; // we already consider 1 as the first number

    const countSteps = (prefix: number): number => {
        let steps = 0;
        let first = prefix;
        let next = prefix + 1;

        while (first <= n) {
            steps += Math.min(n + 1, next) - first;
            first *= 10;
            next *= 10;
        }

        return steps;
    };

    while (k > 0) {
        const count = countSteps(currentPrefix);
        if (count <= k) {
            // Skip the whole subtree starting with currentPrefix
            currentPrefix++;
            k -= count;
        } else {
            // Go deeper into the subtree
            currentPrefix *= 10;
            k -= 1;
        }
    }

    return currentPrefix;
};