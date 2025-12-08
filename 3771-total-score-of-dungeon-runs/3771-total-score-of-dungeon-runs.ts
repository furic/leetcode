const totalScore = (hp: number, damage: number[], requirement: number[]): number => {
    const n = damage.length;
    
    // Build cumulative damage: cumDamage[i] = sum of damage[0..i-1]
    const cumDamage = new Array(n + 1);
    cumDamage[0] = 0;
    for (let i = 0; i < n; i++) {
        cumDamage[i + 1] = cumDamage[i] + damage[i];
    }
    
    let totalScore = 0;
    
    for (let i = 0; i < n; i++) {
        const threshold = cumDamage[i + 1] + requirement[i] - hp;
        
        // Binary search: find first j where cumDamage[j] >= threshold
        let left = 0, right = i;
        let firstValid = i + 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (cumDamage[mid] >= threshold) {
                firstValid = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        // Count valid starting positions: firstValid to i (inclusive)
        if (firstValid <= i) {
            totalScore += i - firstValid + 1;
        }
    }
    
    return totalScore;
};