const isValid = (word: string): boolean => 
    word.length >= 3 &&
    /^[a-zA-Z0-9]+$/.test(word) &&
    /[aeiouAEIOU]/.test(word) &&
    /[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]/.test(word);