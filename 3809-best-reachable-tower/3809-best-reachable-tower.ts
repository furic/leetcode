const bestTower = (towers: number[][], center: number[], radius: number): number[] => {
    let best = [-1, -1];
    let maxQuality = -1;
    
    for (const [x, y, q] of towers) {
        const distance = Math.abs(x - center[0]) + Math.abs(y - center[1]);

        if (distance <= radius) {
            if (q > maxQuality || (q === maxQuality && (x < best[0] || (x === best[0] && y < best[1])))) {
                best = [x, y];
                maxQuality = q;
            }
        }
    }

    return best;
};