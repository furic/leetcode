/**
 * Finds all people who learn the secret through meetings (CORRECTED VERSION)
 * Processes meetings chronologically and handles same-time propagation correctly
 */
const findAllPeople = (n: number, meetings: number[][], firstPerson: number): number[] => {
    // Sort meetings by time to process chronologically
    meetings.sort((a, b) => a[2] - b[2]);
    
    // Track who knows the secret
    const knowsSecret = new Set<number>([0, firstPerson]);
    
    // Process meetings grouped by time
    let meetingIndex = 0;
    
    while (meetingIndex < meetings.length) {
        const currentTime = meetings[meetingIndex][2];
        
        // Build graph for all meetings at current time
        const graphAtCurrentTime = new Map<number, number[]>();
        const peopleAtCurrentTime = new Set<number>();
        
        // Collect all meetings happening at current time
        while (meetingIndex < meetings.length && meetings[meetingIndex][2] === currentTime) {
            const [personA, personB] = meetings[meetingIndex];
            
            if (!graphAtCurrentTime.has(personA)) {
                graphAtCurrentTime.set(personA, []);
            }
            if (!graphAtCurrentTime.has(personB)) {
                graphAtCurrentTime.set(personB, []);
            }
            
            graphAtCurrentTime.get(personA)!.push(personB);
            graphAtCurrentTime.get(personB)!.push(personA);
            
            peopleAtCurrentTime.add(personA);
            peopleAtCurrentTime.add(personB);
            
            meetingIndex++;
        }
        
        // Find connected components at this time using BFS
        const visited = new Set<number>();
        
        for (const startPerson of peopleAtCurrentTime) {
            if (visited.has(startPerson)) continue;
            
            // Find all people in this connected component
            const connectedPeople: number[] = [];
            const queue: number[] = [startPerson];
            visited.add(startPerson);
            
            while (queue.length > 0) {
                const currentPerson = queue.shift()!;
                connectedPeople.push(currentPerson);
                
                for (const neighbor of graphAtCurrentTime.get(currentPerson) || []) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
            
            // If anyone in this component knows the secret, everyone learns it
            const someoneKnowsSecret = connectedPeople.some(person => knowsSecret.has(person));
            
            if (someoneKnowsSecret) {
                connectedPeople.forEach(person => knowsSecret.add(person));
            }
        }
    }
    
    return Array.from(knowsSecret);
};