function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    if (prerequisites.length == 0) return true;

    const classesNeeded = Array(numCourses).fill(0).map(_ => []);
    for (const pre of prerequisites) {
        const course = pre[0];
        const prereq = pre[1];
        classesNeeded[course].push(prereq);
    }

    const visited = Array(numCourses).fill(false);

    for (const pre of prerequisites) {
        const course = pre[0];
        if (hasCycle(course, classesNeeded, visited)) return false;
    }

    return true;
};

function hasCycle(course: number, classesNeeded: number[][], visited: boolean[]): boolean {
    const reqs = classesNeeded[course];

    if (visited[course]) return true;
    if (reqs.length == 0) return false;

    visited[course] = true;

    while (reqs.length) {
        if (hasCycle(reqs[reqs.length - 1], classesNeeded, visited)) return true;
        reqs.pop();
    }

    visited[course] = false;
    return false;
}