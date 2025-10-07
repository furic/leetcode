const avoidFlood = (rains: number[]): number[] => {
    const totalDays = rains.length;
    const result = rains.map(() => 1);
    
    // Track which lakes are currently full and when they were filled
    const fullLakes = new Map<number, number>();
    
    // Track available dry days (days with no rain)
    const availableDryDays: number[] = [];
    let nextUnusedDryDayIndex = 0;

    for (let day = 0; day < totalDays; day++) {
        const lakeNumber = rains[day];

        if (lakeNumber === 0) {
            // No rain today - mark as available dry day
            availableDryDays.push(day);
        } else {
            // Rain on specific lake
            result[day] = -1;

            // Check if lake is already full (would cause flood)
            if (fullLakes.has(lakeNumber)) {
                const previousRainDay = fullLakes.get(lakeNumber)!;

                // Find first available dry day after the lake was filled
                let dryDayIndex = nextUnusedDryDayIndex;
                while (
                    dryDayIndex < availableDryDays.length && 
                    availableDryDays[dryDayIndex] < previousRainDay
                ) {
                    dryDayIndex++;
                }

                // No dry day available between previous rain and now - flood is inevitable
                if (dryDayIndex === availableDryDays.length) {
                    return [];
                }

                // Use this dry day to drain the lake
                const chosenDryDay = availableDryDays[dryDayIndex];
                result[chosenDryDay] = lakeNumber;

                // Mark this dry day as used
                availableDryDays[dryDayIndex] = -1;

                // Update pointer if we used the next unused dry day
                if (nextUnusedDryDayIndex === dryDayIndex) {
                    nextUnusedDryDayIndex++;
                }
            }

            // Update lake status (now full or refilled)
            fullLakes.set(lakeNumber, day);
        }
    }

    return result;
};