const baseUnitConversions = (conversions: number[][]): number[] => {
    const MOD = BigInt(1_000_000_007); // Modulo value to avoid overflow
    let conversionResults = new Array(conversions.length + 1).fill(0);  // Array to store the conversion results for each unit
    conversionResults[0] = 1;  // The base unit (unit 0) is equivalent to 1 unit

    // Process the conversions in a loop
    while (conversions.length > 0) {
        conversions.forEach(([sourceUnit, targetUnit, conversionFactor], index) => {
            // If the source unit has a valid conversion result, propagate the conversion
            if (conversionResults[sourceUnit]) {
                // Update the conversion result for the target unit, applying modulo operation
                conversionResults[targetUnit] = Number(
                    (BigInt(conversionResults[sourceUnit]) * BigInt(conversionFactor)) % MOD
                );
                // Mark this conversion as processed by setting the corresponding entry to undefined
                conversions[index] = undefined;
            }
        });

        // Remove processed conversions
        conversions = conversions.filter(conversion => conversion !== undefined);
    }

    return conversionResults;  // Return the final array with conversion results
};