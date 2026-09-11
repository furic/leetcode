function totalNumbers(digits: number[]): number {
    const uniqueNumbers = new Set<number>();
    const n = digits.length;

    // Duyệt qua tất cả các bộ 3 vị trí (i, j, k) khác nhau trong mảng
    for (let i = 0; i < n; i++) {
        // Chữ số hàng trăm không được là 0
        if (digits[i] === 0) continue;

        for (let j = 0; j < n; j++) {
            // Vị trí j phải khác vị trí i
            if (j === i) continue;

            for (let k = 0; k < n; k++) {
                // Vị trí k phải khác vị trí i và j
                if (k === i || k === j) continue;

                // Chữ số hàng đơn vị phải là số chẵn
                if (digits[k] % 2 === 0) {
                    const num = digits[i] * 100 + digits[j] * 10 + digits[k];
                    uniqueNumbers.add(num);
                }
            }
        }
    }
    return uniqueNumbers.size
};