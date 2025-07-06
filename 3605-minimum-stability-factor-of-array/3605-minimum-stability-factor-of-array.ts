function minStable(nums: number[], maxC: number): number {
    const n = nums.length;

    // A helper function to compute the Highest Common Factor (HCF/GCD).
    const gcd = (a: number, b: number): number => {
        while (b) {
            [a, b] = [b, a % b];
        }
        return a;
    };

    // A Segment Tree is used for efficient range GCD queries.
    // This is crucial for the performance of the check function `can(L)`.
    const tree = new Array(4 * n);

    const build = (node: number, start: number, end: number) => {
        if (start === end) {
            tree[node] = nums[start];
            return;
        }
        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        build(leftChild, start, mid);
        build(rightChild, mid + 1, end);
        tree[node] = gcd(tree[leftChild], tree[rightChild]);
    };

    const queryRec = (node: number, start: number, end: number, l: number, r: number): number => {
        // If the query range is outside the node's range, return 0.
        // 0 is the identity for GCD, as gcd(x, 0) = x.
        if (r < start || end < l || l > r) {
            return 0;
        }
        // If the node's range is completely within the query range, return its value.
        if (l <= start && end <= r) {
            return tree[node];
        }
        const mid = Math.floor((start + end) / 2);
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        const p1 = queryRec(leftChild, start, mid, l, r);
        const p2 = queryRec(rightChild, mid + 1, end, l, r);
        
        // Combine results from children.
        if (p1 === 0) return p2;
        if (p2 === 0) return p1;
        return gcd(p1, p2);
    };
    
    // Wrapper for the recursive query function.
    const query = (l: number, r: number): number => {
        return queryRec(0, 0, n - 1, l, r);
    };
    
    // Build the segment tree if the array is not empty.
    if (n > 0) {
        build(0, 0, n - 1);
    }

    /**
     * Checks if it's possible to achieve a stability factor of at most L
     * with at most maxC modifications.
     */
    const can = (L: number): boolean => {
        // Base case: To get a stability factor of 0, no subarray of length >= 1
        // can be stable. This means every element must be < 2.
        if (L === 0) {
            let cost = 0;
            for (const num of nums) {
                if (num >= 2) {
                    cost++;
                }
            }
            return cost <= maxC;
        }
        if (L >= n) {
             return true;
        }

        let modifications = 0;
        let i = 0;
        while (i <= n - (L + 1)) {
            // If the subarray nums[i...i+L] is stable (HCF >= 2)
            if (query(i, i + L) >= 2) {
                modifications++;
                if (modifications > maxC) {
                    return false;
                }
                // By modifying nums[i+L], we break all stable windows of length L+1
                // that include this element. So we can jump our check past this index.
                i += (L + 1);
            } else {
                i++;
            }
        }
        return true;
    };
    
    // Binary search for the minimum possible stability factor L.
    let low = 0, high = n, ans = n;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (can(mid)) {
            // If we can achieve stability factor `mid`, try for an even smaller one.
            ans = mid;
            high = mid - 1;
        } else {
            // If we can't, we must allow a larger stability factor.
            low = mid + 1;
        }
    }
    return ans;
}