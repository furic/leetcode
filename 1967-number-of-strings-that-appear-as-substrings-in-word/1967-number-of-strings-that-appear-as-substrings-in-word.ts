function numOfStrings(patterns: string[], word: string): number {
    let count: number = 0;
    for (let pat of patterns) {
        let left: number = 0;
        let right: number = pat.length;

        while (right <= word.length) {
            if (pat == word.slice(left, right)) {
                count += 1;
                break;
            }
            left += 1;
            right += 1;
        }
    }
    return count
};