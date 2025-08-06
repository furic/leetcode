class SegTree {
    private segNode: number[];
    public baskets: number[];
    private n: number;

    constructor(baskets: number[]) {
        this.baskets = baskets;
        this.n = baskets.length;
        this.segNode = new Array(4 * this.n + 7).fill(0);
        this.build(1, 0, this.n - 1);
    }

    private build(p: number, l: number, r: number): void {
        if (l === r) {
            this.segNode[p] = this.baskets[l];
            return;
        }
        const mid = Math.floor((l + r) / 2);
        this.build(p * 2, l, mid);
        this.build(p * 2 + 1, mid + 1, r);
        this.segNode[p] = Math.max(
            this.segNode[p * 2],
            this.segNode[p * 2 + 1],
        );
    }

    query(p: number, l: number, r: number, ql: number, qr: number): number {
        if (ql > r || qr < l) {
            return Number.MIN_SAFE_INTEGER;
        }
        if (ql <= l && r <= qr) {
            return this.segNode[p];
        }
        const mid = Math.floor((l + r) / 2);
        return Math.max(
            this.query(p * 2, l, mid, ql, qr),
            this.query(p * 2 + 1, mid + 1, r, ql, qr),
        );
    }

    update(p: number, l: number, r: number, pos: number, val: number): void {
        if (l === r) {
            this.segNode[p] = val;
            return;
        }
        const mid = Math.floor((l + r) / 2);
        if (pos <= mid) {
            this.update(p * 2, l, mid, pos, val);
        } else {
            this.update(p * 2 + 1, mid + 1, r, pos, val);
        }
        this.segNode[p] = Math.max(
            this.segNode[p * 2],
            this.segNode[p * 2 + 1],
        );
    }
}

function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
    const m = baskets.length;
    if (m === 0) {
        return fruits.length;
    }
    const tree = new SegTree(baskets);
    let count = 0;

    for (const fruit of fruits) {
        let l = 0,
            r = m - 1,
            res = -1;
        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (tree.query(1, 0, m - 1, 0, mid) >= fruit) {
                res = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        if (res !== -1 && tree.baskets[res] >= fruit) {
            tree.update(1, 0, m - 1, res, Number.MIN_SAFE_INTEGER);
        } else {
            count++;
        }
    }

    return count;
}