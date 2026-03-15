# DFS Cycle Detection Three-State | 16 Lines | O(V+E) | 10ms

# Intuition
Course completion is possible if and only if the prerequisite graph has no cycles. A standard DFS with three node states — unvisited, in-progress, and done — detects back edges (cycles) efficiently.

# Approach
- Build an adjacency list `prereqMap` where `prereqMap[course]` lists all prerequisites of `course`.
- Track each node's state with a `Uint8Array`:
  - `0` — unvisited
  - `1` — currently in the DFS stack (in-progress)
  - `2` — fully explored, confirmed cycle-free
- For each course, run `hasCycle` if not already done:
  - If `state === 1`, we've re-entered a node already on the current DFS path — this is a back edge, meaning a cycle exists → return `true`.
  - If `state === 2`, this subtree was already verified safe → return `false` immediately (memoization).
  - Otherwise, mark as in-progress (`1`), recurse into all prerequisites, then mark as done (`2`).
- If any call detects a cycle, return `false` from `canFinish`. If all courses are explored without a cycle, return `true`.
- The `state = 2` memoization ensures each node's subtree is only fully explored once, even when reached from multiple paths.

# Complexity
- Time complexity: $$O(V + E)$$ — each node and edge is visited at most once due to the done-state early exit.

- Space complexity: $$O(V + E)$$ — adjacency list storage plus $$O(V)$$ recursion stack depth in the worst case.

# Code
```typescript []
const canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
    const prereqMap: number[][] = Array(numCourses).fill(0).map(() => []);
    for (const [course, prereq] of prerequisites) {
        prereqMap[course].push(prereq);
    }

    const state = new Uint8Array(numCourses);

    for (let course = 0; course < numCourses; course++) {
        if (hasCycle(course, prereqMap, state)) return false;
    }
    return true;
};

function hasCycle(course: number, prereqMap: number[][], state: Uint8Array): boolean {
    if (state[course] === 1) return true;
    if (state[course] === 2) return false;

    state[course] = 1;
    for (const prereq of prereqMap[course]) {
        if (hasCycle(prereq, prereqMap, state)) return true;
    }
    state[course] = 2;
    return false;
}
```