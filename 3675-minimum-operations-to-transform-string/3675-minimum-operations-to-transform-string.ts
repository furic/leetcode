const minOperations = (s: string): number => {
    let maxSteps = 0;

    for (const char of s) {
        // Compute how many steps it takes to turn `char` into 'a' using circular alphabet
        const stepsToA = (26 - (char.charCodeAt(0) - 'a'.charCodeAt(0))) % 26;
        maxSteps = Math.max(maxSteps, stepsToA);
    }

    return maxSteps;
};