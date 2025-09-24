function fractionToDecimal(numerator: number, denominator: number): string {
    if (numerator === 0) return "0";
    const sign = (numerator < 0) !== (denominator < 0) ? "-" : "";
    let num = Math.abs(numerator);
    let den = Math.abs(denominator);
    let result: string[] = [sign + Math.floor(num / den).toString()];
    let rem = num % den;
    if (rem === 0) return result.join("");
    result.push(".");
    const seen = new Map<number, number>();
    while (rem !== 0) {
        if (seen.has(rem)) {
            const pos = seen.get(rem)!;
            return result.slice(0, pos).join("") + "(" + result.slice(pos).join("") + ")";
        }
        seen.set(rem, result.length);
        rem *= 10;
        result.push(Math.floor(rem / den).toString());
        rem %= den;
    }
    return result.join("");
}