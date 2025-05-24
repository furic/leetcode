const findWordsContaining = (words: string[], x: string): number[] => {
    return words.map((word, index) => word.indexOf(x) !== -1 ? index : -1).filter((index) => index !== -1);
};