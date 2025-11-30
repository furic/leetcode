const minOperations = (nums: number[], k: number, queries: number[][]): number[] => {
    const n = nums.length;
    const q = queries.length;

    const remainder = nums.map(x => ((x % k) + k) %k);
    const mValues = nums.map(x => Math.floor(x / k));

    const segmentId = new Array(n);
    segmentId[0] = 0;
    for(let i = 1; i < n; i++) {
        segmentId[i] = remainder[i] === remainder[i - 1] ? segmentId[i - 1] : i;
    }

    const sortedM = [...new Set(mValues)].sort((a, b) => a - b);
    const compress = new Map<number, number>();
    sortedM.forEach((v, i) => compress.set(v, i + 1));
    const compressed = mValues.map(m => compress.get(m)!);
    const decompress = [0, ...sortedM];

    const size = sortedM.length;

    const countTree = new Array(size + 2).fill(0);
    const sumTree = new Array(size + 2).fill(0);

    const update = (tree: number[], i: number, delta: number) => {
        for (; i <= size; i += i & (-i)) tree[i] += delta;
    };

    const query = (tree: number[], i: number): number => {
        let sum = 0;
        for (; i > 0; i -= i & (-i)) sum += tree[i];
        return sum;
    };
    
    let totalCount = 0;
    let totalSum = 0;
    
    const add = (idx: number) => {
        const c = compressed[idx];
        const val = mValues[idx];
        update(countTree, c, 1);
        update(sumTree, c, val);
        totalCount++;
        totalSum += val;
    };
    
    const remove = (idx: number) => {
        const c = compressed[idx];
        const val = mValues[idx];
        update(countTree, c, -1);
        update(sumTree, c, -val);
        totalCount--;
        totalSum -= val;
    };

    const computeAnswer = (): number => {
        if (totalCount === 0) return 0;
        
        const medianPos = Math.floor((totalCount + 1) / 2);
        let lo = 1, hi = size;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (query(countTree, mid) >= medianPos) hi = mid;
            else lo = mid + 1;
        }
        
        const median = decompress[lo];
        const leftCount = query(countTree, lo);
        const leftSum = query(sumTree, lo);
        const rightCount = totalCount - leftCount;
        const rightSum = totalSum - leftSum;
        
        return (median * leftCount - leftSum) + (rightSum - median * rightCount);
    };

    const blockSize = Math.max(1, Math.floor(Math.sqrt(n)));
    const sortedQueries = queries.map((qr, i) => ({ l: qr[0], r: qr[1], idx: i }));
    sortedQueries.sort((a, b) => {
        const blockA = Math.floor(a.l / blockSize);
        const blockB = Math.floor(b.l / blockSize);
        if (blockA !== blockB) return blockA - blockB;
        return blockA % 2 === 0 ? a.r - b.r : b.r - a.r;
    });
    
    const result = new Array(q);
    let curL = 0, curR = -1;
    
    for (const { l, r, idx } of sortedQueries) {
        if (segmentId[r] > l) {
            result[idx] = -1;
            continue;
        }
        
        while (curR < r) add(++curR);
        while (curL > l) add(--curL);
        while (curR > r) remove(curR--);
        while (curL < l) remove(curL++);
        
        result[idx] = computeAnswer();
    }
    
    return result;
};