const distinctPoints = (s: string, k: number): number => {
    const totalMoves = s.length;
    
    const directionCounts = new Map<string, number>([
        ['U', 0],
        ['D', 0], 
        ['L', 0],
        ['R', 0]
    ]);
    
    const uniqueEndpoints = new Set<string>();

    for (let windowEnd = 0; windowEnd < totalMoves; windowEnd++) {
        if (windowEnd >= k) {
            const exitingDirection = s[windowEnd - k];
            directionCounts.set(exitingDirection, directionCounts.get(exitingDirection)! - 1);
        }
        
        const enteringDirection = s[windowEnd];
        directionCounts.set(enteringDirection, directionCounts.get(enteringDirection)! + 1);
        
        if (windowEnd >= k - 1) {
            const upMovement = Math.max(0, directionCounts.get('U')! - directionCounts.get('D')!);
            const downMovement = Math.max(0, directionCounts.get('D')! - directionCounts.get('U')!);
            const leftMovement = Math.max(0, directionCounts.get('L')! - directionCounts.get('R')!);
            const rightMovement = Math.max(0, directionCounts.get('R')! - directionCounts.get('L')!);
            
            const endpointKey = `${upMovement}|${downMovement}|${leftMovement}|${rightMovement}`;
            uniqueEndpoints.add(endpointKey);
        }
    }
    
    return uniqueEndpoints.size;
};