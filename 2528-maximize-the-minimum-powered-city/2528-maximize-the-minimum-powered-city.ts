const maxPower = (stations: number[], r: number, k: number): number => {
    const cityCount = stations.length;
    
    // Build difference array for efficient range updates
    // powerDiff[i] represents the change in power at city i
    const powerDiff: number[] = new Array(cityCount + 1).fill(0);

    // Convert stations to difference array
    // Each station contributes to cities in range [i-r, i+r]
    for (let cityIndex = 0; cityIndex < cityCount; cityIndex++) {
        const rangeStart = Math.max(0, cityIndex - r);
        const rangeEnd = Math.min(cityCount, cityIndex + r + 1);
        
        powerDiff[rangeStart] += stations[cityIndex];
        powerDiff[rangeEnd] -= stations[cityIndex];
    }

    // Check if we can achieve targetMinPower using at most k additional stations
    const canAchieveMinPower = (targetMinPower: number): boolean => {
        const tempPowerDiff = [...powerDiff];
        let currentCityPower = 0;
        let remainingStations = k;

        for (let cityIndex = 0; cityIndex < cityCount; cityIndex++) {
            // Calculate actual power at current city
            currentCityPower += tempPowerDiff[cityIndex];

            // If power is insufficient, add stations
            if (currentCityPower < targetMinPower) {
                const stationsNeeded = targetMinPower - currentCityPower;
                
                // Not enough stations available
                if (remainingStations < stationsNeeded) {
                    return false;
                }

                remainingStations -= stationsNeeded;
                
                // Add stations at optimal position (rightmost in range to help future cities)
                // Station at position cityIndex affects cities [cityIndex-r, cityIndex+r]
                // So we place it to maximize coverage: at cityIndex+r (or last affected city)
                const stationPosition = cityIndex + r;
                const coverageEnd = Math.min(cityCount, stationPosition + r + 1);
                
                tempPowerDiff[coverageEnd] -= stationsNeeded;
                currentCityPower += stationsNeeded;
            }
        }
        
        return true;
    };

    // Binary search on the answer: minimum power across all cities
    let minPossiblePower = Math.min(...stations);
    let maxPossiblePower = stations.reduce((sum, power) => sum + power, 0) + k;
    let maxAchievableMinPower = 0;

    while (minPossiblePower <= maxPossiblePower) {
        const midPower = Math.floor(minPossiblePower + (maxPossiblePower - minPossiblePower) / 2);
        
        if (canAchieveMinPower(midPower)) {
            maxAchievableMinPower = midPower;
            minPossiblePower = midPower + 1; // Try higher
        } else {
            maxPossiblePower = midPower - 1; // Try lower
        }
    }
    
    return maxAchievableMinPower;
};