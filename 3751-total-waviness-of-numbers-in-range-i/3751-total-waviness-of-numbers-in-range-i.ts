// Module-level cache for efficient range query processing
const MAX_NUMBER = 100000;
const wavinessCache: number[] = new Array(MAX_NUMBER + 1);
let isCacheInitialized = false;

/**
 * Calculates the total waviness (peaks + valleys) for all numbers in range [num1, num2]
 * Uses prefix sum caching for O(1) range queries after O(n) preprocessing
 */
const totalWaviness = (num1: number, num2: number): number => {
    if (!isCacheInitialized) {
        initializeWavinessCache();
        isCacheInitialized = true;
    }

    // Calculate range sum using prefix sums: sum(num1..num2) = prefix[num2] - prefix[num1-1]
    return wavinessCache[num2] - (num1 > 0 ? wavinessCache[num1 - 1] : 0);
};

/**
 * Initializes the waviness cache with individual waviness values,
 * then converts it to a prefix sum array
 */
const initializeWavinessCache = (): void => {
    // Mark all entries as uncomputed (-1 sentinel value)
    wavinessCache.fill(-1);

    // Numbers below 100 cannot form 3-digit patterns → waviness = 0
    for (let i = 0; i < 100; i++) {
        wavinessCache[i] = 0;
    }

    // Compute waviness for each number from 100 to MAX_NUMBER
    for (let i = 100; i <= MAX_NUMBER; i++) {
        wavinessCache[i] = calculateWaviness(i);
    }

    // Convert individual waviness values into prefix sums
    // After this: wavinessCache[i] = sum of waviness from 0 to i
    for (let i = 1; i <= MAX_NUMBER; i++) {
        wavinessCache[i] += wavinessCache[i - 1];
    }
};

/**
 * Calculates the waviness of a single number by scanning 3-digit windows
 * from right to left with dynamic programming optimization
 */
const calculateWaviness = (number: number): number => {
    let totalPeaksAndValleys = 0;
    let remainingDigits = number;

    // Scan digits from right to left in overlapping 3-digit windows
    while (remainingDigits > 99) {
        // Extract the rightmost digit of current window
        const rightDigit = remainingDigits % 10;
        
        // Remove rightmost digit
        remainingDigits = Math.floor(remainingDigits / 10);
        
        // Middle digit is now the rightmost of remaining number
        const middleDigit = remainingDigits % 10;
        
        // Left digit is the tens place of remaining number
        const leftDigit = Math.floor(remainingDigits / 10) % 10;

        // Check if middle digit forms a peak or valley
        if (isPeakOrValley(leftDigit, middleDigit, rightDigit)) {
            totalPeaksAndValleys++;
        }

        // DP Optimization: if we've already computed waviness for the remaining prefix,
        // add it and stop (no need to recompute digit by digit)
        if (wavinessCache[remainingDigits] !== -1) {
            totalPeaksAndValleys += wavinessCache[remainingDigits];
            break;
        }
    }

    return totalPeaksAndValleys;
};

/**
 * Checks if the middle digit forms a peak or valley with its neighbors
 * Peak: middle digit is strictly greater than both neighbors
 * Valley: middle digit is strictly less than both neighbors
 */
const isPeakOrValley = (leftDigit: number, middleDigit: number, rightDigit: number): boolean => {
    const isPeak = leftDigit < middleDigit && rightDigit < middleDigit;
    const isValley = leftDigit > middleDigit && rightDigit > middleDigit;
    return isPeak || isValley;
};