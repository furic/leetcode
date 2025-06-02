const candy = (ratings: number[]): number => {
    const n = ratings.length;
    const candies = new Array<number>(n).fill(1);

    // First pass: left to right
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Second pass: right to left
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    // Sum up total candies
    return candies.reduce((sum, c) => sum + c, 0);
};