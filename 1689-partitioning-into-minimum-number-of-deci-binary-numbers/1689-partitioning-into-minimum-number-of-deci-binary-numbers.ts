const minPartitions = (n: string): number => {
    for (let digit = 9; digit > 0; digit--) {
        if (n.includes(`${digit}`)) return digit;
    }
};