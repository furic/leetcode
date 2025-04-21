const numOfUnplacedFruits = (fruits: number[], baskets: number[]): number => {
    let n = baskets.length;
    let log2n = Math.log2(n) | 0; // Equivalent to Math.floor(log2(n))

    if ((1 << log2n) !== n) { // If n is not a power of 2
        n = 1 << (log2n + 1); // Get next power of 2
        baskets = [...baskets, ...new Array(n - baskets.length).fill(0)]; // Extend baskets with zeros
    }

    let segTree: number[] = new Array(2 * n).fill(0);

    // Initialize segment tree
    for (let i = 0; i < baskets.length; i++) {
        segTree[n + i] = baskets[i];
    }
    for (let i = n - 1; i > 0; i--) {
        segTree[i] = Math.max(segTree[2 * i], segTree[2 * i + 1]);
    }

    let unplaced = 0;

    for (const f of fruits) {
        let i = 1; // Start from root of the segment tree
        if (segTree[i] < f) {
            unplaced++;
            continue;
        }

        // Binary search for the smallest valid basket
        while (i < n) {
            i *= 2;
            if (segTree[i] < f) {
                i++; // Move to right child if left is invalid
            }
        }

        // Use the basket and update the segment tree
        segTree[i] = 0;
        while (i > 1) {
            i >>= 1;
            segTree[i] = Math.max(segTree[2 * i], segTree[2 * i + 1]);
        }
    }

    return unplaced;
};