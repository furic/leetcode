const canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
    const prereqMap: number[][] = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
        prereqMap[course].push(prereq);
    }

    // 0 = unvisited, 1 = in current DFS path, 2 = fully processed (no cycle)
    const state = new Uint8Array(numCourses);

    const hasCycle = (course: number): boolean => {
        if (state[course] === 1) return true;  // Back edge → cycle
        if (state[course] === 2) return false; // Already verified safe

        state[course] = 1;
        for (const prereq of prereqMap[course]) {
            if (hasCycle(prereq)) return true;
        }
        state[course] = 2;
        return false;
    };

    for (let course = 0; course < numCourses; course++) {
        if (hasCycle(course)) return false;
    }

    return true;
};