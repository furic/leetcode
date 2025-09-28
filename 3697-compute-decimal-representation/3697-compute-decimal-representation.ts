const decimalRepresentation = (n: number): number[] => {
    const base10Components: number[] = [];
    let positionalValue = 1; // Represents 10^0, 10^1, 10^2, etc.
    
    while (n > 0) {
        const digit = n % 10;
        
        // Only add non-zero digits as base-10 components
        if (digit !== 0) {
            const component = digit * positionalValue;
            base10Components.unshift(component);
        }
        
        n = Math.floor(n / 10);
        positionalValue *= 10;
    }
    
    return base10Components;
};