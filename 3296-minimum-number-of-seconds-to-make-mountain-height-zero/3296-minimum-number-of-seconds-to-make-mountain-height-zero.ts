function minNumberOfSeconds(mountainHeight: number, workerTimes: number[]): number {
    const maxT: number = Math.max(...workerTimes);
    const n: number = workerTimes.length;
    const v: number = Math.ceil(mountainHeight / n);
    
    let start: number = 0;
    let end: number = maxT * v * (v + 1) / 2;
    let res: number = end;

    while (start <= end) {
        let mid: number = Math.floor(start + (end - start) / 2);
        let totalHeight: number = 0;

        for (const t of workerTimes) {
            const x: number = Math.floor((-1 + Math.sqrt(1 + 8 * mid / t)) / 2);
            totalHeight += x;
            if (totalHeight >= mountainHeight) 
                break;
        }

        if (totalHeight >= mountainHeight) {
            res = mid;
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return res;
};