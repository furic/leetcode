const differenceOfSums = (n: number, m: number): number => {
    // Array.from({ length: n }, (_, i) => i + 1)
    //     .reduce((acc, num) => acc + (num % m ? num : -num), 0);
    let result = 0
    for (let i = 1; i <= n; i++) {
        result += i % m ? i : -i;
    }
    return result;
}