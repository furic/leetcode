const minimumFlips = (n: number): number => {
    const bits = n.toString(2);
    const len = bits.length;
    let count = 0;
    
    for (let i = 0; i < len; i++) {
        if (bits[i] !== bits[len - 1 - i]) {
            count++;
        }
    }
    
    return count;
};