const closestMeetingNode = (edges: number[], node1: number, node2: number): number => {
    const n = edges.length;

    const getDistances = (start: number): number[] => {
        const distances = Array(n).fill(-1);
        let current = start, dist = 0;
        while (current !== -1 && distances[current] === -1) {
            distances[current] = dist++;
            current = edges[current];
        }
        return distances;
    };

    const dist1 = getDistances(node1);
    const dist2 = getDistances(node2);

    let result = -1;
    let minMaxDist = Infinity;

    for (let i = 0; i < n; i++) {
        if (dist1[i] !== -1 && dist2[i] !== -1) {
            const maxDist = Math.max(dist1[i], dist2[i]);
            if (maxDist < minMaxDist || (maxDist === minMaxDist && i < result)) {
                minMaxDist = maxDist;
                result = i;
            }
        }
    }

    return result;
};