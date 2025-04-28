const baseUnitConversions = (conversions: number[][]): number[] => {
    const mod = BigInt(1_000_000_007);
    let result = new Array(conversions.length).fill(0);
    result[0] = 1;
    while (conversions.length > 0) {
        conversions.forEach(([source, target, factor], index) => {
            if (result[source]) {
                result[target] = Number(
                    (BigInt(result[source]) * BigInt(factor)) % mod
                );
                conversions[index] = undefined;
            }
        });
        conversions = conversions.filter(
            (conversion) => conversion != undefined
        );
    }
    return result;
};
