/**
 * Finds all people who learn a secret through meetings
 * Secret spreads instantly within the same timestamp through connected meeting groups
 * Strategy: Process meetings chronologically, use graph traversal to spread secret within each timestamp
 */
const findAllPeople = (n: number, meetings: number[][], firstPerson: number): number[] => {
    // Group meetings by timestamp
    const meetingsByTime = new Map<number, number[][]>();
    const uniqueTimestamps: number[] = [];

    for (const [personA, personB, timestamp] of meetings) {
        if (!meetingsByTime.has(timestamp)) {
            meetingsByTime.set(timestamp, []);
            uniqueTimestamps.push(timestamp);
        }
        meetingsByTime.get(timestamp)!.push([personA, personB, timestamp]);
    }

    // Sort timestamps chronologically
    uniqueTimestamps.sort((a, b) => a - b);

    // Track who knows the secret (initially person 0 and firstPerson)
    const peopleWithSecret = new Set<number>([0, firstPerson]);

    // Process each timestamp's meetings
    for (const currentTime of uniqueTimestamps) {
        // Build adjacency list for meetings at this timestamp
        const meetingGraph = new Map<number, number[]>();
        const secretKnowersAtThisTime = new Set<number>();

        for (const [personA, personB] of meetingsByTime.get(currentTime)!) {
            // Add bidirectional edges
            if (!meetingGraph.has(personA)) {
                meetingGraph.set(personA, []);
            }
            meetingGraph.get(personA)!.push(personB);

            if (!meetingGraph.has(personB)) {
                meetingGraph.set(personB, []);
            }
            meetingGraph.get(personB)!.push(personA);

            // Mark if either person already knows the secret
            if (peopleWithSecret.has(personA)) {
                secretKnowersAtThisTime.add(personA);
            }
            if (peopleWithSecret.has(personB)) {
                secretKnowersAtThisTime.add(personB);
            }
        }

        // Spread secret through connected components using DFS
        const visited = new Set<number>();
        const stack = Array.from(secretKnowersAtThisTime);

        while (stack.length > 0) {
            const currentPerson = stack.pop()!;

            // Skip if already visited or not in this timestamp's graph
            if (visited.has(currentPerson) || !meetingGraph.has(currentPerson)) {
                continue;
            }

            visited.add(currentPerson);
            // This person learns the secret (reached via connected meetings)
            peopleWithSecret.add(currentPerson);

            // Spread to all people this person meets with at this timestamp
            for (const neighbor of meetingGraph.get(currentPerson)!) {
                stack.push(neighbor);
            }
        }
    }

    return Array.from(peopleWithSecret);
};