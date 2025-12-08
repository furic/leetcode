const countTriples = (n: number): number => {
    let count: number = 0;

    for (let i = 1; i < n; i++) {
        // j starting from i+1, because we don't have to check same pairs again
        for (let j = i + 1; j <= n; j++) {
            const sumSqrt: number = Math.sqrt(i * i + j * j);

            // if sumSqrt starts to exceed n, we can safely break.
            if (sumSqrt > n) break;

            // if square root is an integer, increment count
            // counting two times, because if a^2 + b^2 = c^2, then b^2 + a^2 = c^2
            if (Number.isInteger(sumSqrt)) count += 2;
        }
    }

    return count;
};