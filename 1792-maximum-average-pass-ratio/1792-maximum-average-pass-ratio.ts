const maxAverageRatio = (classes: number[][], extraStudents: number): number => {
    // Max heap to track classes by their potential improvement gain
    const maxHeap = new MaxPriorityQueue<[number, number, number]>((c) => c[2]);

    // Calculate initial gain for each class and add to heap
    for (const [passingStudents, totalStudents] of classes) {
        const currentRatio = passingStudents / totalStudents;
        const improvedRatio = (passingStudents + 1) / (totalStudents + 1);
        const improvementGain = improvedRatio - currentRatio;
        maxHeap.push([passingStudents, totalStudents, improvementGain]);
    }

    // Greedily assign each extra student to class with highest improvement gain
    let remainingStudents = extraStudents;
    while (remainingStudents > 0) {
        const [passingStudents, totalStudents, _] = maxHeap.pop();
        
        // Add one student to this class
        const newPassingStudents = passingStudents + 1;
        const newTotalStudents = totalStudents + 1;
        
        // Recalculate improvement gain for this class
        const currentRatio = newPassingStudents / newTotalStudents;
        const improvedRatio = (newPassingStudents + 1) / (newTotalStudents + 1);
        const newImprovementGain = improvedRatio - currentRatio;
        
        maxHeap.push([newPassingStudents, newTotalStudents, newImprovementGain]);
        remainingStudents--;
    }

    // Calculate final average pass ratio
    let totalPassRatio = 0;
    while (maxHeap.size() > 0) {
        const [passingStudents, totalStudents, _] = maxHeap.pop();
        totalPassRatio += passingStudents / totalStudents;
    }
    
    return totalPassRatio / classes.length;
};