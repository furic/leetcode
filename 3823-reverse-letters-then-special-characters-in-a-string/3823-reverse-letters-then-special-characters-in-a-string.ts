const reverseByType = (s: string): string => {
    const SPECIAL_CHARS = new Set('!@#$%^&*()'.split(''));
    
    const letters: string[] = [];
    const specialCharacters: string[] = [];
    
    // Separate letters and special characters
    for (let i = 0; i < s.length; i++) {
        if (SPECIAL_CHARS.has(s[i])) {
            specialCharacters.push(s[i]);
        } else {
            letters.push(s[i]);
        }
    }

    // Reverse both arrays
    letters.reverse();
    specialCharacters.reverse();

    // Build result string
    const result: string[] = [];
    let j = 0, k = 0;
    for (let i = 0; i < s.length; i++) {
        if (SPECIAL_CHARS.has(s[i])) {
            result.push(specialCharacters[k++]);
        } else {
            result.push(letters[j++]);
        }
    }

    return result.join('');
}