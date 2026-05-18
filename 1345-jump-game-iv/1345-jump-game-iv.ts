function minJumps(arr: number[]): number {
    const n = arr.length;
    // If the array has 1 or 0 elements, we are already at the last index.
    if (n <= 1) return 0;

    // Create a hash map mapping values to all their indices
    const valueMap = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const val = arr[i];
        let list = valueMap.get(val);
        if (list === undefined) {
            list = [];
            valueMap.set(val, list);
        }
        list.push(i);
    }

    // Boolean array to track visited states using Uint8Array for minimum memory footprint
    const visited = new Uint8Array(n);
    visited[0] = 1;

    // Queue configured with Int32Array prevents array scaling lag overhead
    const queue = new Int32Array(n);
    let head = 0;
    let tail = 0;

    queue[tail++] = 0;
    let steps = 0;

    // Breadth-First Search
    while (head < tail) {
        const size = tail - head;

        for (let i = 0; i < size; i++) {
            const curr = queue[head++];

            // Check identical values jumps
            const sameValues = valueMap.get(arr[curr]);
            if (sameValues !== undefined) {
                for (let j = 0; j < sameValues.length; j++) {
                    const neighbor = sameValues[j];
                    if (visited[neighbor] === 0) {
                        // Return early if the final destination is reached
                        if (neighbor === n - 1) return steps + 1;
                        visited[neighbor] = 1;
                        queue[tail++] = neighbor;
                    }
                }
                // Clear the value from Map to circumvent redundant redundant O(N^2) checks
                valueMap.delete(arr[curr]);
            }

            // Check Step Forward jump
            const right = curr + 1;
            if (right < n && visited[right] === 0) {
                if (right === n - 1) return steps + 1;
                visited[right] = 1;
                queue[tail++] = right;
            }

            // Check Step Backward jump
            const left = curr - 1;
            if (left >= 0 && visited[left] === 0) {
                // (Note: Moving left will never instantaneously land on n - 1)
                visited[left] = 1;
                queue[tail++] = left;
            }
        }
        // One layer of BFS finished traversing; increment minimum step needed by 1
        steps++;
    }

    return steps;
}