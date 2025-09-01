function maxAverageRatio(classes: number[][], extraStudents: number): number {
    const maxHeap = new PriorityQueue<[number, number, number]>((a, b) => b[2] - a[2]);

    for (const [pass, total] of classes) {
        const gain = (pass + 1) / (total + 1) - (pass / total);
        maxHeap.push([pass, total, gain]);
    }

    while (extraStudents > 0) {
        let [pass, total, _] = maxHeap.pop();
        pass++;
        total++;
        let newGain = (pass + 1) / (total + 1) - (pass / total);
        maxHeap.push([pass, total, newGain]);
        extraStudents--;
    }

    let sum = 0;
    while (maxHeap.size() > 0) {
        const [pass, total, _] = maxHeap.pop();
        sum += (pass / total);
    }
    return sum / classes.length;
};