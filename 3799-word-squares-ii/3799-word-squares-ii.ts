const wordSquares = (words: string[]): string[][] => {
    const n = words.length;
    const results: string[][] = [];

    const isValid = (top: string, left: string, right: string, bottom: string): boolean => {
        return top[0] === left[0] && 
               top[3] === right[0] && 
               bottom[0] === left[3] && 
               bottom[3] === right[3];
    };
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (j === i) continue;
            for (let k = 0; k < n; k++) {
                if (k === i || k === j) continue;
                for (let l = 0; l < n; l++) {
                    if (l === i || l === j || l === k) continue;
                    
                    const top = words[i];
                    const left = words[j];
                    const right = words[k];
                    const bottom = words[l];
                    
                    if (isValid(top, left, right, bottom)) {
                        results.push([top, left, right, bottom]);
                    }
                }
            }
        }
    }
    
    results.sort((a, b) => {
        for (let i = 0; i < 4; i++) {
            if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
        }
        return 0;
    });
    
    return results;
};