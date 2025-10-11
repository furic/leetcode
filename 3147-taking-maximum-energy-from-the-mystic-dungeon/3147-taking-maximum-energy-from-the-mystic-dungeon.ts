const maximumEnergy = (energy: number[], k: number): number => {
    const totalMagicians = energy.length;
    let maxEnergyGained = -Infinity;

    // Try all possible starting positions in the last k positions
    // (starting earlier would visit the same magicians as one of these paths)
    for (let startPosition = totalMagicians - k; startPosition < totalMagicians; startPosition++) {
        let currentPathEnergy = 0;

        // Walk backwards through the chain, accumulating energy
        for (let position = startPosition; position >= 0; position -= k) {
            currentPathEnergy += energy[position];
            
            // Track maximum energy at any point in this path
            // (we can choose to "stop" at any magician along the way)
            maxEnergyGained = Math.max(maxEnergyGained, currentPathEnergy);
        }
    }

    return maxEnergyGained;
};