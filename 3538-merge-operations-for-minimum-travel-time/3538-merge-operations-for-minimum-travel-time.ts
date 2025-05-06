type Segment = { start: number; end: number; time: number };

const minTravelTime = (
    l: number,
    n: number,
    k: number,
    position: number[],
    time: number[]
): number => {
    const segments: Segment[] = [];
    for (let i = 0; i < n - 1; i++) {
        segments.push({
            start: position[i],
            end: position[i + 1],
            time: time[i],
        });
    }
    console.log(segments);

    const memo = new Map<string, number>();

    const getKey = (segs: Segment[], mergesLeft: number) =>
        segs.map((s) => `${s.start}-${s.time}`).join("|") + "|" + mergesLeft;

    const dfs = (segs: Segment[], mergesLeft: number): number => {
        const key = getKey(segs, mergesLeft);
        if (memo.has(key)) return memo.get(key)!;

        if (mergesLeft === 0) {
            const total = segs.reduce(
                (sum, seg) => sum + (seg.end - seg.start) * seg.time,
                0
            );
            memo.set(key, total);
            return total;
        }

        let minTime = Infinity;

        // Only signs at index 1 to n-2 can be merged (i.e., segments[1] to segments[n-2])
        for (let i = 1; i < segs.length; i++) {
            const newSegs = segs.map((s) => ({ ...s }));
            const removed = newSegs.splice(i, 1)[0]; // Remove segment i (which ends at the removed sign)
            
            newSegs[i - 1].end = removed.end; // Update the end time
            if (i <= segs.length - 2) {
                newSegs[i].time += removed.time; // Add its time to segment i+1
            }

            const result = dfs(newSegs, mergesLeft - 1);
            minTime = Math.min(minTime, result);
        }

        memo.set(key, minTime);
        return minTime;
    };

    return dfs(segments, k);
};
