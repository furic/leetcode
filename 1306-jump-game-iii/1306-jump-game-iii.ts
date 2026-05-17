const canReach = (arr: number[], start: number): boolean => {
    const n = arr.length;
    const visited = new Set<number>();
    const queue: number[] = [start];

    while (queue.length) {
        const idx = queue.shift()!;

        if (idx < 0 || idx >= n || visited.has(idx)) continue;
        if (arr[idx] === 0) return true;

        visited.add(idx);
        queue.push(idx + arr[idx]);
        queue.push(idx - arr[idx]);
    }

    return false;
};