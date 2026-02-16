const maxXor = (nums: number[], k: number): number => {
    const n = nums.length;
    const BITS = 15;

    const prefix = new Uint32Array(n + 1);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] ^ nums[i];
    }

    // Trie with counts for deletion support
    const trie: number[][] = [[0, 0]];
    const cnt: number[] = [0];

    const insert = (val: number) => {
        let node = 0;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (val >> b) & 1;
            if (!trie[node][bit]) {
                trie[node][bit] = trie.length;
                trie.push([0, 0]);
                cnt.push(0);
            }
            node = trie[node][bit];
            cnt[node]++;
        }
    };

    const remove = (val: number) => {
        let node = 0;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (val >> b) & 1;
            node = trie[node][bit];
            cnt[node]--;
        }
    };

    const query = (val: number): number => {
        let node = 0,
            res = 0;
        for (let b = BITS - 1; b >= 0; b--) {
            const bit = (val >> b) & 1;
            const want = 1 - bit;
            if (trie[node][want] && cnt[trie[node][want]] > 0) {
                res |= 1 << b;
                node = trie[node][want];
            } else if (trie[node][bit] && cnt[trie[node][bit]] > 0) {
                node = trie[node][bit];
            } else {
                return res;
            }
        }
        return res;
    };

    // Priority queues with lazy deletion
    // Store [value, index]
    const maxPQ = new MaxPriorityQueue<[number, number]>((x) => x[0]);
    const minPQ = new MinPriorityQueue<[number, number]>((x) => x[0]);

    let ans = 0;
    let l = 0;

    insert(prefix[0]);

    for (let r = 0; r < n; r++) {
        maxPQ.push([nums[r], r]);
        minPQ.push([nums[r], r]);
        insert(prefix[r + 1]);

        // Lazy cleanup: remove stale entries outside window
        while (maxPQ.front()![1] < l) maxPQ.pop();
        while (minPQ.front()![1] < l) minPQ.pop();

        // Shrink window until valid
        while (maxPQ.front()![0] - minPQ.front()![0] > k) {
            remove(prefix[l]);
            l++;
            while (maxPQ.front()![1] < l) maxPQ.pop();
            while (minPQ.front()![1] < l) minPQ.pop();
        }

        ans = Math.max(ans, query(prefix[r + 1]));
    }

    return ans;
};
