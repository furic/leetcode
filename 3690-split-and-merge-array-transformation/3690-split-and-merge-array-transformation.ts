const minSplitMerge = (nums1: number[], nums2: number[]): number => {
    const n = nums1.length;

    const targetKey = nums2.join(",");
    const startKey = nums1.join(",");
    if (startKey === targetKey) return 0;

    const queue: [number[], number][] = [[nums1, 0]];
    const visited = new Set<string>([startKey]);

    while (queue.length > 0) {
        const [currentArr, steps] = queue.shift()!;

        for (let left = 0; left < n; left++) {
            for (let right = left; right < n; right++) {
                const block = currentArr.slice(left, right + 1);
                const remaining = [
                    ...currentArr.slice(0, left),
                    ...currentArr.slice(right + 1),
                ];

                for (let pos = 0; pos <= remaining.length; pos++) {
                    const nextArr = [
                        ...remaining.slice(0, pos),
                        ...block,
                        ...remaining.slice(pos),
                    ];

                    const nextKey = nextArr.join(",");
                    if (nextKey === targetKey) {
                        return steps + 1;
                    }

                    if (!visited.has(nextKey)) {
                        visited.add(nextKey);
                        queue.push([nextArr, steps + 1]);
                    }
                }
            }
        }
    }

    return 0;
};