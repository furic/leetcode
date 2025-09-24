const fractionToDecimal = (numerator: number, denominator: number): string => {
    if (numerator === 0) return "0";
    
    const resultSign = (numerator < 0) !== (denominator < 0) ? "-" : "";
    const absoluteNumerator = Math.abs(numerator);
    const absoluteDenominator = Math.abs(denominator);
    
    const decimalParts: string[] = [resultSign + Math.floor(absoluteNumerator / absoluteDenominator).toString()];
    let remainder = absoluteNumerator % absoluteDenominator;
    
    if (remainder === 0) return decimalParts.join("");
    
    decimalParts.push(".");
    const remainderPositions = new Map<number, number>();
    
    while (remainder !== 0) {
        if (remainderPositions.has(remainder)) {
            const cycleStartPosition = remainderPositions.get(remainder)!;
            return decimalParts.slice(0, cycleStartPosition).join("") + 
                   "(" + decimalParts.slice(cycleStartPosition).join("") + ")";
        }
        
        remainderPositions.set(remainder, decimalParts.length);
        remainder *= 10;
        decimalParts.push(Math.floor(remainder / absoluteDenominator).toString());
        remainder %= absoluteDenominator;
    }
    
    return decimalParts.join("");
};