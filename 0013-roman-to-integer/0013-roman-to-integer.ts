const romanToInt = (s: string): number => {
    const romanSymbolValues: Record<string, number> = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let totalValue = 0;

    for (let position = 0; position < s.length; position++) {
        const currentSymbolValue = romanSymbolValues[s[position]];
        const nextSymbolValue = romanSymbolValues[s[position + 1]];

        if (nextSymbolValue && currentSymbolValue < nextSymbolValue) {
            totalValue -= currentSymbolValue;
        } else {
            totalValue += currentSymbolValue;
        }
    }

    return totalValue;
};