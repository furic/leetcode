/**
 * Counts odd numbers in the inclusive range [low, high]
 * Formula: ⌊(high+1)/2⌋ - ⌊low/2⌋
 */
const countOdds = (low: number, high: number): number => 
    Math.floor((high + 1) / 2) - Math.floor(low / 2);