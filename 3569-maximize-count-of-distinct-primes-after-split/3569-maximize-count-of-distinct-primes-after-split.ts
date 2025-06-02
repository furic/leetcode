const maximumCount = (nums: number[], queries: number[][]): number[] => {
    const N = nums.length;
    const MAX_VAL = 100001;

    // Sieve of Eratosthenes
    const isPrime = new Array<boolean>(MAX_VAL).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let p = 2; p * p < MAX_VAL; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i < MAX_VAL; i += p)
                isPrime[i] = false;
        }
    }

    class SimpleSortedSet {
        private map = new Map<number, true>();
        private _min = Infinity;
        private _max = -Infinity;
        private _size = 0;

        add = (value: number): void => {
            if (!this.map.has(value)) {
                this.map.set(value, true);
                this._min = Math.min(this._min, value);
                this._max = Math.max(this._max, value);
                this._size++;
            }
        };

        remove = (value: number): void => {
            if (this.map.has(value)) {
                this.map.delete(value);
                this._size--;
                if (this._size === 0) {
                    this._min = Infinity;
                    this._max = -Infinity;
                } else {
                    if (value === this._min) {
                        this._min = Infinity;
                        for (const k of this.map.keys()) {
                            this._min = Math.min(this._min, k);
                        }
                    }
                    if (value === this._max) {
                        this._max = -Infinity;
                        for (const k of this.map.keys()) {
                            this._max = Math.max(this._max, k);
                        }
                    }
                }
            }
        };

        min = (): number => this._min;
        max = (): number => this._max;
        isEmpty = (): boolean => this._size === 0;
    }

    const segTreeSize = Math.max(N - 1, 1);
    const tree = new Array<number>(4 * segTreeSize).fill(0);
    const lazy = new Array<number>(4 * segTreeSize).fill(0);

    const push = (node: number): void => {
        if (lazy[node] !== 0) {
            tree[2 * node] += lazy[node];
            lazy[2 * node] += lazy[node];
            tree[2 * node + 1] += lazy[node];
            lazy[2 * node + 1] += lazy[node];
            lazy[node] = 0;
        }
    };

    const updateRange = (node: number, l: number, r: number, ql: number, qr: number, val: number): void => {
        if (l > r || l > qr || r < ql) return;
        if (ql <= l && r <= qr) {
            tree[node] += val;
            lazy[node] += val;
            return;
        }
        push(node);
        const mid = Math.floor((l + r) / 2);
        updateRange(2 * node, l, mid, ql, qr, val);
        updateRange(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = Math.max(tree[2 * node], tree[2 * node + 1]);
    };

    const applyPrimeContribution = (L: number, R: number, factor: number): void => {
        if (L > R) return;
        if (L >= 1) updateRange(1, 1, segTreeSize, 1, Math.min(segTreeSize, L), factor * 1);
        if (R >= L + 1) updateRange(1, 1, segTreeSize, L + 1, Math.min(segTreeSize, R), factor * 2);
        if (N - 1 >= R + 1) updateRange(1, 1, segTreeSize, R + 1, segTreeSize, factor * 1);
    };

    const primeLocs = new Map<number, SimpleSortedSet>();

    for (let i = 0; i < N; i++) {
        const val = nums[i];
        if (isPrime[val]) {
            if (!primeLocs.has(val)) {
                primeLocs.set(val, new SimpleSortedSet());
            }
            primeLocs.get(val)!.add(i);
        }
    }

    if (N > 1) {
        for (const [_, locs] of primeLocs.entries()) {
            if (!locs.isEmpty()) {
                applyPrimeContribution(locs.min(), locs.max(), 1);
            }
        }
    }

    const result: number[] = [];

    for (const [idx, val] of queries) {
        const oldVal = nums[idx];
        nums[idx] = val;

        if (oldVal !== val) {
            if (isPrime[oldVal]) {
                const locs = primeLocs.get(oldVal)!;
                const L_old = locs.min();
                const R_old = locs.max();
                if (N > 1) applyPrimeContribution(L_old, R_old, -1);
                locs.remove(idx);
                if (!locs.isEmpty()) {
                    if (N > 1) applyPrimeContribution(locs.min(), locs.max(), 1);
                }
            }

            if (isPrime[val]) {
                if (!primeLocs.has(val)) {
                    primeLocs.set(val, new SimpleSortedSet());
                }
                const locs = primeLocs.get(val)!;
                if (!locs.isEmpty()) {
                    if (N > 1) applyPrimeContribution(locs.min(), locs.max(), -1);
                }
                locs.add(idx);
                if (N > 1) applyPrimeContribution(locs.min(), locs.max(), 1);
            }
        }

        result.push(N <= 1 ? 0 : Math.max(0, tree[1]));
    }

    return result;
};