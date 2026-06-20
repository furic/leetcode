const maxBuilding = (n: number, restrictions: number[][]): number => {
    if (restrictions.length === 0) return n - 1;

    restrictions.sort((a, b) => a[0] - b[0]);

    // Forward pass: cap each restriction by what's reachable from the left
    let prevId = 1, prevHeight = 0;
    for (const r of restrictions) {
        r[1] = Math.min(r[1], r[0] - prevId + prevHeight);
        prevId = r[0];
        prevHeight = r[1];
    }

    // Backward pass: cap each restriction by what's reachable from the right
    for (let i = restrictions.length - 2; i >= 0; i--) {
        restrictions[i][1] = Math.min(
            restrictions[i][1],
            restrictions[i + 1][1] + restrictions[i + 1][0] - restrictions[i][0]
        );
    }

    // Max height in the tail segment (last restriction to building n)
    const last = restrictions[restrictions.length - 1];
    let maxHeight = n - last[0] + last[1];

    // Max height between each consecutive pair of restrictions
    prevId = 1;
    prevHeight = 0;
    for (const [id, height] of restrictions) {
        const gap   = id - prevId - Math.abs(height - prevHeight);
        const peak  = Math.max(height, prevHeight) + Math.floor(gap / 2);
        maxHeight   = Math.max(maxHeight, peak);
        prevId      = id;
        prevHeight  = height;
    }

    return maxHeight;
};