const trimTrailingVowels = (s: string): string => {
    const VOWELS = 'aeiou';
    let i = s.length - 1;
    while (i >= 0 && VOWELS.includes(s[i])) {
        i--;
    }
    return s.substring(0, i + 1);
};