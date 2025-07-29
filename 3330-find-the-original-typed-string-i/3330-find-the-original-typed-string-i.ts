const possibleStringCount = (word: string): number => {
    let count: number = 1

    for (let i = word.length - 2; i >= 0; i--) {
        if (word[i] === word[i + 1]) count++
    }

    return count;
}