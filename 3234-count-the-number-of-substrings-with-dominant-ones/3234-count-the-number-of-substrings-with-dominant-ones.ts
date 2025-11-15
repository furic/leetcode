const numberOfSubstrings = (s: string): number => {
    const stringLength = s.length;
    
    // Build array to track last position where '0' occurred before each index
    // previousZeroPos[i] = last index where s[index] = '0' before position i
    const previousZeroPos: number[] = new Array(stringLength + 1);
    previousZeroPos[0] = -1;
    
    for (let index = 0; index < stringLength; index++) {
        const isFirstChar = index === 0;
        const previousCharIsZero = index > 0 && s[index - 1] === '0';
        
        if (isFirstChar || previousCharIsZero) {
            previousZeroPos[index + 1] = index;
        } else {
            previousZeroPos[index + 1] = previousZeroPos[index];
        }
    }
    
    let dominantSubstringCount = 0;
    
    // For each ending position, count valid substrings
    for (let endPos = 1; endPos <= stringLength; endPos++) {
        let zeroCount = s[endPos - 1] === '0' ? 1 : 0;
        let currentStartPos = endPos;
        
        // Jump backwards through positions with zeros
        // Stop when zeroCount² > stringLength (optimization: can't have enough 1's)
        while (currentStartPos > 0 && zeroCount * zeroCount <= stringLength) {
            // Calculate ones in current substring
            const substringLength = endPos - previousZeroPos[currentStartPos];
            const oneCount = substringLength - zeroCount;
            
            // Check if dominant: oneCount >= zeroCount²
            if (oneCount >= zeroCount * zeroCount) {
                // Count valid starting positions for this zeroCount
                const segmentLength = currentStartPos - previousZeroPos[currentStartPos];
                const extraOnes = oneCount - zeroCount * zeroCount;
                const validStartPositions = Math.min(segmentLength, extraOnes + 1);
                
                dominantSubstringCount += validStartPositions;
            }
            
            // Jump to previous zero position
            currentStartPos = previousZeroPos[currentStartPos];
            zeroCount++;
        }
    }
    
    return dominantSubstringCount;
};