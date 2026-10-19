const targetIndices = (nums: number[], target: number): number[] => {
    let lessCount = 0, equalCount = 0;

    for (const num of nums) {
        if (num < target) lessCount++;
        else if (num === target) equalCount++;
    }

    // After sorting, the target values occupy [lessCount, lessCount + equalCount)
    const result: number[] = [];
    for (let i = 0; i < equalCount; i++) result.push(lessCount + i);

    return result;
};