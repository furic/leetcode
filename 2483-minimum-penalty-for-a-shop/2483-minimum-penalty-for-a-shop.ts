/**
 * Finds the earliest hour to close shop to minimize penalty
 * Penalty: +1 for each hour open with no customers, +1 for each hour closed with customers
 * Strategy: Track cumulative benefit of staying open, find point with maximum benefit
 */
const bestClosingTime = (customers: string): number => {
    let maxBenefit = 0;
    let currentBenefit = 0;
    let bestClosingHour = -1; // -1 represents closing at hour 0 (never opening)

    // Process each hour to calculate benefit of staying open
    for (let hour = 0; hour < customers.length; hour++) {
        if (customers[hour] === "Y") {
            // Customer arrives: staying open avoids penalty, benefit increases
            currentBenefit++;
        } else {
            // No customer: staying open incurs penalty, benefit decreases
            currentBenefit--;
        }

        // Track the hour with maximum cumulative benefit
        if (currentBenefit > maxBenefit) {
            maxBenefit = currentBenefit;
            bestClosingHour = hour;
        }
    }

    // Return closing time (the hour AFTER the last hour we stay open)
    // If bestClosingHour is -1, we return 0 (close immediately)
    return bestClosingHour + 1;
};