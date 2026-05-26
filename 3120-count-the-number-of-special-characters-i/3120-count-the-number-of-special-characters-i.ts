function numberOfSpecialChars(word: string): number {
    const set = new Set();
    for(const c of word){
        if(word.includes(c.toUpperCase()) && word.includes(c.toLowerCase()))
            set.add(c);
    }
    return set.size / 2;
};