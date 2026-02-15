const mapWordWeights = (words: string[], weights: number[]): string => {
    let result = "";
    for (let i = 0; i < words.length; i++) {
        let weight = 0;
        for (let j = 0; j < words[i].length; j++) {
            weight += weights[words[i][j].charCodeAt(0) - 'a'.charCodeAt(0)];
        }
        result += String.fromCharCode('z'.charCodeAt(0) - (weight % 26));
    }
    return result;
}