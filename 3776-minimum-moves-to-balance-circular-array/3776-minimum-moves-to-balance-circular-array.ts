const minMoves = (balance: number[]): number => {
    const n = balance.length;
    const sum = balance.reduce((a, b) => a + b, 0);
    
    // If total sum is negative, impossible
    if (sum < 0) return -1;
    
    // Find the index with negative balance
    let negIndex = -1;
    for (let i = 0; i < n; i++) {
        if (balance[i] < 0) {
            negIndex = i;
            break;
        }
    }
    
    // If no negative balance, no moves needed
    if (negIndex === -1) return 0;
    
    const needed = -balance[negIndex];
    
    // Calculate circular distance for each positive balance
    const sources = [];
    for (let i = 0; i < n; i++) {
        if (i !== negIndex && balance[i] > 0) {
            // Circular distance: min of clockwise and counter-clockwise
            const dist = Math.min(
                Math.abs(i - negIndex),
                n - Math.abs(i - negIndex)
            );
            sources.push({ available: balance[i], distance: dist });
        }
    }
    
    // Sort by distance (take from closest first)
    sources.sort((a, b) => a.distance - b.distance);
    
    let moves = 0;
    let remaining = needed;
    
    for (const source of sources) {
        const take = Math.min(source.available, remaining);
        moves += take * source.distance;
        remaining -= take;
        if (remaining === 0) break;
    }
    
    return moves;
};