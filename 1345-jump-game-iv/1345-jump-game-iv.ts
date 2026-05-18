const minJumps = (arr: number[]): number => {
    const n = arr.length;
    if (n <= 1) return 0;

    // Group indices by value for same-value jumps
    const valueToIndices = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const val = arr[i];
        if (!valueToIndices.has(val)) valueToIndices.set(val, []);
        valueToIndices.get(val)!.push(i);
    }

    // Uint8Array and manual Int32Array queue avoid GC overhead on large inputs
    const visited = new Uint8Array(n);
    visited[0] = 1;
    const queue = new Int32Array(n);
    let head = 0, tail = 0;
    queue[tail++] = 0;
    let steps = 0;

    while (head < tail) {
        const levelSize = tail - head;

        for (let i = 0; i < levelSize; i++) {
            const curr = queue[head++];

            // Same-value jumps: teleport to all indices with the same value
            const sameIndices = valueToIndices.get(arr[curr]);
            if (sameIndices) {
                for (const neighbor of sameIndices) {
                    if (!visited[neighbor]) {
                        if (neighbor === n - 1) return steps + 1;
                        visited[neighbor] = 1;
                        queue[tail++] = neighbor;
                    }
                }
                valueToIndices.delete(arr[curr]); // Prevent redundant O(n²) revisits
            }

            // Adjacent right jump
            const right = curr + 1;
            if (right < n && !visited[right]) {
                if (right === n - 1) return steps + 1;
                visited[right] = 1;
                queue[tail++] = right;
            }

            // Adjacent left jump (can never land on n-1 going left)
            const left = curr - 1;
            if (left >= 0 && !visited[left]) {
                visited[left] = 1;
                queue[tail++] = left;
            }
        }

        steps++;
    }

    return steps;
};