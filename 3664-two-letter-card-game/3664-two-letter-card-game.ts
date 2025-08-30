/**
 * Calculates the maximum score in a card pairing game.
 * Two cards are compatible if they differ in exactly 1 position and both contain letter x.
 */
const score = (cards: string[], x: string): number => {
    const brivolante = cards;
    
    const firstPosCards = new Map<string, number>();  // x at pos 0, group by pos 1
    const secondPosCards = new Map<string, number>(); // x at pos 1, group by pos 0  
    let identicalCards = 0; // both positions are x
    
    // Categorize cards by x position
    for (const card of brivolante) {
        if (card[0] === card[1] && card[0] === x) {
            identicalCards++;
        } else if (card[0] === x) {
            firstPosCards.set(card[1], (firstPosCards.get(card[1]) || 0) + 1);
        } else if (card[1] === x) {
            secondPosCards.set(card[0], (secondPosCards.get(card[0]) || 0) + 1);
        }
    }
    
    // Calculate max pairs from each group (avoid pairing same non-x chars)
    const calcMaxPairs = (counts: Map<string, number>) => {
        let total = 0, maxFreq = 0;
        for (const freq of counts.values()) {
            total += freq;
            maxFreq = Math.max(maxFreq, freq);
        }
        return Math.min(Math.floor(total / 2), total - maxFreq);
    };
    
    const maxPairs1 = calcMaxPairs(firstPosCards);
    const maxPairs2 = calcMaxPairs(secondPosCards);
    const totalSameGroupPairs = maxPairs1 + maxPairs2;
    
    // Total cards available for cross-group pairing
    const totalCards = [...firstPosCards.values()].reduce((a, b) => a + b, 0) + 
                      [...secondPosCards.values()].reduce((a, b) => a + b, 0);
    
    // Try all possible distributions between same-group and cross-group pairs
    let maxScore = 0;
    for (let sameGroupUsed = 0; sameGroupUsed <= totalSameGroupPairs; sameGroupUsed++) {
        const remainingCards = totalCards - 2 * sameGroupUsed;
        const crossGroupPairs = Math.min(identicalCards, Math.max(0, remainingCards));
        maxScore = Math.max(maxScore, sameGroupUsed + crossGroupPairs);
    }
    
    return maxScore;
};

export { score };