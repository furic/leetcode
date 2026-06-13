const mapWordWeights = (words: string[], weights: number[]): string =>
    words.map(word => {
        let totalWeight = 0;
        for (let i = 0; i < word.length; i++)
            totalWeight += weights[word.charCodeAt(i) - 97];
        return String.fromCharCode(122 - totalWeight % 26);
    }).join('');