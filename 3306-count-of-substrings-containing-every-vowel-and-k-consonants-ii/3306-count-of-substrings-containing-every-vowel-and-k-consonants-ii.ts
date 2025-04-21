const countOfSubstrings = (word: string, k: number): number => {
    let frequencies: number[][] = [new Array(128).fill(0), new Array(128).fill(0)];
    "aeiou".split("").forEach(v => frequencies[0][v.charCodeAt(0)] = 1);

    let response = 0, currentK = 0, vowels = 0, extraLeft = 0, left = 0;

    for (let right = 0; right < word.length; right++) {
        let rightChar = word.charCodeAt(right);

        if (frequencies[0][rightChar] === 1) {
            if (++frequencies[1][rightChar] === 1) vowels++;
        } else {
            currentK++;
        }

        while (currentK > k) {
            let leftChar = word.charCodeAt(left);
            if (frequencies[0][leftChar] === 1) {
                if (--frequencies[1][leftChar] === 0) vowels--;
            } else {
                currentK--;
            }
            left++;
            extraLeft = 0;
        }

        while (vowels === 5 && currentK === k && left < right && frequencies[0][word.charCodeAt(left)] === 1 && frequencies[1][word.charCodeAt(left)] > 1) {
            extraLeft++;
            frequencies[1][word.charCodeAt(left)]--;
            left++;
        }

        if (currentK === k && vowels === 5) {
            response += (1 + extraLeft);
        }
    }

    return response;
}