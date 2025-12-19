# Chronological Graph DFS | 47 Lines | O(M log M) | 461ms

# Intuition

The secret spreads through meetings, but the key insight is that meetings at the same timestamp happen simultaneously - meaning the secret can spread instantly through a chain of connected meetings. We need to process meetings chronologically and handle the instant propagation within each timestamp by treating meetings as a graph where connected components all learn the secret together.

# Approach

**Phase 1: Group Meetings by Timestamp**
- Parse all meetings and organize them into a map keyed by timestamp
- Track all unique timestamps for chronological processing
- This allows us to handle simultaneous meetings together

**Phase 2: Sort Timestamps Chronologically**
- Sort the unique timestamps in ascending order
- Critical because the secret can only spread forward in time
- A person who learns the secret at time T can only share it at time T or later

**Phase 3: Initialize Secret Holders**
- Start with person 0 and firstPerson knowing the secret at time 0
- Use a Set to track all people who currently know the secret
- This Set will grow as we process meetings

**Phase 4: Process Each Timestamp**
For each timestamp (in chronological order), perform these steps:

**4a. Build Meeting Graph for Current Timestamp:**
- Create an adjacency list representation of all meetings at this timestamp
- For each meeting between personA and personB, add bidirectional edges
- This graph represents all possible connections at this exact moment in time
- Identify which people in these meetings already know the secret (from previous timestamps)

**4b. Identify Initial Secret Holders at This Timestamp:**
- Scan through all meeting participants at this timestamp
- Mark anyone who already knows the secret (from earlier times)
- These are our "seed" nodes for spreading the secret within this timestamp's graph

**4c. Spread Secret Through Connected Components (DFS):**
- Initialize a visited set to track processed nodes
- Start DFS from all people who know the secret at this timestamp
- Key insight: If person A knows the secret and meets person B, then B learns it instantly
- And if B meets person C in a different meeting at the same timestamp, C also learns it
- Continue DFS traversal until all reachable people in the connected component know the secret
- Use a stack-based DFS approach:
  - Pop a person from the stack
  - Skip if already visited or not involved in meetings at this timestamp
  - Mark as visited and add to secret holders
  - Push all their meeting partners (neighbors) onto the stack
  - This ensures the secret propagates through all connected meetings

**Why Connected Components Matter:**
- At time T, if person A knows secret and meets B, B learns it
- If B also meets C at time T, C learns it too (instant propagation)
- If C meets D at time T, D learns it as well
- All people in this connected chain learn the secret simultaneously
- But if person E meets F at time T and neither knows the secret, they remain ignorant

**Phase 5: Return Results**
- After processing all timestamps, convert the Set of secret holders to an array
- This array contains all people who know the secret after all meetings

**Critical Details:**
- We process timestamps in order because secrets can only flow forward in time
- Within a single timestamp, we use graph traversal because secret spreads instantly
- We rebuild the graph for each timestamp because meeting participants vary
- The visited set is local to each timestamp to allow re-processing people at different times
- The peopleWithSecret set is global and persists across all timestamps

# Complexity

- Time complexity: $$O(M \log M)$$
  - M = number of meetings
  - Grouping meetings by timestamp: O(M)
  - Sorting T unique timestamps: O(T log T), where T ≤ M
  - Processing all meetings across all timestamps: O(M)
  - DFS within each timestamp: O(M) total across all timestamps
  - Overall: O(M + T log T + M) = O(M log M) since T ≤ M

- Space complexity: $$O(M + n)$$
  - Meeting storage grouped by timestamp: O(M)
  - Adjacency list for meetings at each timestamp: O(M) amortized
  - Sets for tracking secret holders: O(n) in worst case
  - DFS stack and visited set: O(n) per timestamp
  - Overall: O(M + n)

# Code
```typescript []
const findAllPeople = (n: number, meetings: number[][], firstPerson: number): number[] => {
    const meetingsByTime = new Map<number, number[][]>();
    const uniqueTimestamps: number[] = [];

    for (const [personA, personB, timestamp] of meetings) {
        if (!meetingsByTime.has(timestamp)) {
            meetingsByTime.set(timestamp, []);
            uniqueTimestamps.push(timestamp);
        }
        meetingsByTime.get(timestamp)!.push([personA, personB, timestamp]);
    }

    uniqueTimestamps.sort((a, b) => a - b);

    const peopleWithSecret = new Set<number>([0, firstPerson]);

    for (const currentTime of uniqueTimestamps) {
        const meetingGraph = new Map<number, number[]>();
        const secretKnowersAtThisTime = new Set<number>();

        for (const [personA, personB] of meetingsByTime.get(currentTime)!) {
            if (!meetingGraph.has(personA)) {
                meetingGraph.set(personA, []);
            }
            meetingGraph.get(personA)!.push(personB);

            if (!meetingGraph.has(personB)) {
                meetingGraph.set(personB, []);
            }
            meetingGraph.get(personB)!.push(personA);

            if (peopleWithSecret.has(personA)) {
                secretKnowersAtThisTime.add(personA);
            }
            if (peopleWithSecret.has(personB)) {
                secretKnowersAtThisTime.add(personB);
            }
        }

        const visited = new Set<number>();
        const stack = Array.from(secretKnowersAtThisTime);

        while (stack.length > 0) {
            const currentPerson = stack.pop()!;

            if (visited.has(currentPerson) || !meetingGraph.has(currentPerson)) {
                continue;
            }

            visited.add(currentPerson);
            peopleWithSecret.add(currentPerson);

            for (const neighbor of meetingGraph.get(currentPerson)!) {
                stack.push(neighbor);
            }
        }
    }

    return Array.from(peopleWithSecret);
};
```