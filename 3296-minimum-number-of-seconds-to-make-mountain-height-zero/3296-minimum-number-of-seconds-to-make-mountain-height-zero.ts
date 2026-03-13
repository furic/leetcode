const minNumberOfSeconds = (mountainHeight: number, workerTimes: number[]): number => {
    const workerCount = workerTimes.length;
    const maxWorkerTime = Math.max(...workerTimes);

    // Upper bound: slowest worker alone handles ceil(mountainHeight / workerCount) units
    const maxHeightPerWorker = Math.ceil(mountainHeight / workerCount);
    let lo = 0;
    let hi = maxWorkerTime * maxHeightPerWorker * (maxHeightPerWorker + 1) / 2;
    let minSeconds = hi;

    while (lo <= hi) {
        const mid = Math.floor(lo + (hi - lo) / 2);
        let totalReduction = 0;

        for (const workerTime of workerTimes) {
            // Invert t*x*(x+1)/2 <= mid to find max height units this worker can reduce
            const unitsReduced = Math.floor((-1 + Math.sqrt(1 + 8 * mid / workerTime)) / 2);
            totalReduction += unitsReduced;
            if (totalReduction >= mountainHeight) break;
        }

        if (totalReduction >= mountainHeight) {
            minSeconds = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }

    return minSeconds;
};