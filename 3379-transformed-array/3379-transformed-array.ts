/**
 * Constructs transformed array based on circular movement
 * Each element determines how many steps to move (positive = right, negative = left)
 * Strategy: Use modulo arithmetic to handle circular wrapping
 */
const constructTransformedArray = (nums: number[]): number[] => {
    const arrayLength = nums.length;
    const result = Array(arrayLength);

    for (let i = 0; i < arrayLength; i++) {
        if (nums[i] > 0) {
            // Move right (clockwise)
            result[i] = nums[(i + nums[i]) % arrayLength];
        } else if (nums[i] === 0) {
            // Stay at current position
            result[i] = nums[i];
        } else {
            // Move left (counter-clockwise) - handle negative modulo
            result[i] = nums[((i + nums[i]) % arrayLength + arrayLength) % arrayLength];
        }
    }

    return result;
};