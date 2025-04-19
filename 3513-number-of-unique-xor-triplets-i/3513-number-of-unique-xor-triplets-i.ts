const uniqueXorTriplets = (nums: number[]): number => {
    const length = nums.length;

    // If there are fewer than 3 numbers, return the length directly,
    // as we can only form at most 'length' unique XOR values.
    if (length < 3) return length;

    // Find the smallest power of 2 greater than 'length'.
    // This represents the total number of unique XOR values possible
    // based on the number of bits required to represent the largest number.
    let powerOfTwo = 1;
    while (powerOfTwo <= length) {
        powerOfTwo <<= 1; // Left shift to multiply by 2
    }

    return powerOfTwo;
}