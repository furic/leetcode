const differenceOfSums = (n: number, m: number): number =>
    Array.from({ length: n }, (_, i) => i + 1)
        .reduce((acc, num) => acc + (num % m ? num : -num), 0);