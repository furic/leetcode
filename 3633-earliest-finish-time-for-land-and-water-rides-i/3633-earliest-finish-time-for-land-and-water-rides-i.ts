function earliestFinishTime(landStartTime: number[], landDuration: number[], waterStartTime: number[], waterDuration: number[]): number {
    let res = Infinity;
    const n = landStartTime.length;
    const m = waterStartTime.length;

    for (let i = 0; i < n; i++) {
        let landFinish = landStartTime[i] + landDuration[i];
        for (let j = 0; j < m; j++) {
            let waterStart = Math.max(landFinish, waterStartTime[j]);
            let totalFinish = waterStart + waterDuration[j];
            res = Math.min(res, totalFinish);
        }
    }

    for (let j = 0; j < m; j++) {
        let waterFinish = waterStartTime[j] + waterDuration[j];
        for (let i = 0; i < n; i++) {
            let landStart = Math.max(waterFinish, landStartTime[i]);
            let totalFinish = landStart + landDuration[i];
            res = Math.min(res, totalFinish);
        }
    }

    return res;
};