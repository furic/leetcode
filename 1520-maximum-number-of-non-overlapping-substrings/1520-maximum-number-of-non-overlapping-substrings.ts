function maxNumOfSubstrings(s: string): string[] {
    const count: number[] = new Array(26).fill(0);
    const first: number[] = new Array(26).fill(-1);
    const last: number[] = new Array(26).fill(-1);

    const order: number[] = [];

    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i) - 97;

        if (count[c] === 0) {
            first[c] = i;
            order.push(c);
        }

        count[c]++;
        last[c] = i;
    }

    const res: string[] = [];
    let queue: number[][] = [];

    for (const c of order) {
        queue.unshift([first[c], last[c], count[c]]);

        let left = Infinity;
        let right = -Infinity;
        let total = 0;

        for (const [x, y, z] of queue) {
            total += z;
            left = Math.min(left, x);
            right = Math.max(right, y);

            if (total === right - left + 1) {
                break;
            }
        }

        if (total === right - left + 1) {
            res.push(s.substring(left, right + 1));
            queue = [];
        }
    }

    return res;
};