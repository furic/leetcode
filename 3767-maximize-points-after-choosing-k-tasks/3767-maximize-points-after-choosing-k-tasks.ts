const maxPoints = (technique1: number[], technique2: number[], k: number): number => {
    const n = technique1.length;
    
    // Calculate benefit of using technique 1 over technique 2 for each task
    const benefits = technique1.map((val, i) => val - technique2[i]);
    
    // Sort benefits in descending order
    benefits.sort((a, b) => b - a);
    
    // Start with all tasks using technique 2
    let total = technique2.reduce((sum, val) => sum + val, 0);
    
    // Must use technique 1 for at least k tasks (pick highest benefits)
    for (let i = 0; i < k; i++) {
        total += benefits[i];
    }
    
    // Optionally use technique 1 for remaining tasks if benefit is positive
    for (let i = k; i < n; i++) {
        if (benefits[i] > 0) {
            total += benefits[i];
        } else {
            break; // Benefits are sorted, no need to continue
        }
    }
    
    return total;
};