const isOneBitCharacter = (bits: number[]): boolean => {
    const arrayLength = bits.length;
    let currentIndex = 0;

    // Parse characters until we reach or pass the last bit
    // If bit is 1: two-bit character (skip 2 positions)
    // If bit is 0: one-bit character (skip 1 position)
    while (currentIndex < arrayLength - 1) {
        if (bits[currentIndex] === 1) {
            // Two-bit character (10 or 11)
            currentIndex += 2;
        } else {
            // One-bit character (0)
            currentIndex += 1;
        }
    }

    // If we land exactly on the last bit, it's a one-bit character (0)
    // If we skip over it, it was part of a two-bit character
    return currentIndex === arrayLength - 1;
};