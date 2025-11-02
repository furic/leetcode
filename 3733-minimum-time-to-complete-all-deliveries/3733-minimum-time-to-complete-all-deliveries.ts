function minimumTime(d: number[], r: number[]): number {
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };
    
    const lcmValue = (r[0] * r[1]) / gcd(r[0], r[1]);
    
    const canComplete = (T: number): boolean => {
        const only1 = Math.floor(T / r[1]) - Math.floor(T / lcmValue);
        
        const only2 = Math.floor(T / r[0]) - Math.floor(T / lcmValue);
        
        const both = T - Math.floor(T / r[0]) - Math.floor(T / r[1]) + Math.floor(T / lcmValue);
        
        const need1 = Math.max(0, d[0] - only1);
        const need2 = Math.max(0, d[1] - only2);
        
        return need1 + need2 <= both;
    };
    
    let left = 1;
    let right = 3e13; // Upper bound
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canComplete(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}