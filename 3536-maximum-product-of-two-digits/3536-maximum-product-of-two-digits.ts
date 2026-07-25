const maxProduct = (n: number): number => {
    let largest = 0, secondLargest = 0;

    while (n > 0) {
        const digit = n % 10;
        if (digit > largest) {
            secondLargest = largest;
            largest = digit;
        } else if (digit > secondLargest) {
            secondLargest = digit;
        }
        n = Math.floor(n / 10);
    }

    return largest * secondLargest;
};