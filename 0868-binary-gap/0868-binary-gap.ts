function binaryGap(n: number): number {
    const binary: string = n.toString(2);
    let lastIndex: number = -1;
    let maxDistance: number = 0;

    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
            
            if (lastIndex !== -1) {
                const distance = i - lastIndex;
                maxDistance = Math.max(maxDistance, distance);
            }

            lastIndex = i;
        }
    }

    return maxDistance;
}