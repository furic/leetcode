function totalWaviness(num1: number, num2: number): number {
    let total = 0;
    
    for (let num = num1; num <= num2; num++) {
        const digits = num.toString().split('').map(Number);
        
        // Numbers with < 3 digits have waviness 0
        if (digits.length < 3) continue;
        
        let waviness = 0;
        
        // Check each middle digit (not first or last)
        for (let i = 1; i < digits.length - 1; i++) {
            const curr = digits[i];
            const prev = digits[i - 1];
            const next = digits[i + 1];
            
            // Check for peak: strictly greater than both neighbors
            if (curr > prev && curr > next) {
                waviness++;
            }
            // Check for valley: strictly less than both neighbors
            else if (curr < prev && curr < next) {
                waviness++;
            }
        }
        
        total += waviness;
    }
    
    return total;
}