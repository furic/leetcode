const canFinish = (numCourses: number, prerequisites: number[][]): boolean => {
    const prereqMap: number[][] = Array(numCourses).fill(0).map(() => []);
    for (const [course, prereq] of prerequisites) {
        prereqMap[course].push(prereq);
    }

    const state = new Uint8Array(numCourses); // 0=unvisited, 1=in-progress, 2=done

    for (let course = 0; course < numCourses; course++) {
        if (hasCycle(course, prereqMap, state)) return false;
    }
    return true;
};

function hasCycle(course: number, prereqMap: number[][], state: Uint8Array): boolean {
    if (state[course] === 1) return true;  // Back edge → cycle
    if (state[course] === 2) return false; // Already verified safe

    state[course] = 1;
    for (const prereq of prereqMap[course]) {
        if (hasCycle(prereq, prereqMap, state)) return true;
    }
    state[course] = 2;
    return false;
}