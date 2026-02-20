/**
 * Makes lexicographically largest special binary string by swapping consecutive special substrings
 * Special string: equal 0's and 1's, every prefix has ≥ 1's than 0's (like balanced parentheses)
 * Strategy: Recursively find special substrings, sort descending, join
 */
const makeLargestSpecial = (s: string): string => {
    const specialSubstrings: string[] = [];
    let balance = 0;
    let substringStart = 0;

    // Find all top-level special substrings using balance counter
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            balance++;
        } else {
            balance--;
        }

        // Balance reaches 0: found complete special substring
        if (balance === 0) {
            // Recursively process inner part (excluding outer "1" and "0")
            const innerPart = makeLargestSpecial(s.slice(substringStart + 1, i));
            
            // Wrap with "1" and "0" to maintain special property
            specialSubstrings.push("1" + innerPart + "0");
            
            substringStart = i + 1;
        }
    }

    // Sort descending (lexicographically largest first): "1..." comes before "0..."
    specialSubstrings.sort().reverse();
    
    return specialSubstrings.join("");
};