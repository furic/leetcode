const trimTrailingVowels = (s: string): string => {
    const VOWELS = 'aeiou';
    let i = s.length - 1;
    for (; i >=0 ;i--) {
        if (!VOWELS.includes(s[i])) break;
    }
    return s.substring(0, i + 1);
};