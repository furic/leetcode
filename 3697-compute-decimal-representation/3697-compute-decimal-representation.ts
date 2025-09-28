const decimalRepresentation = (n: number): number[] =>
    n.toString()
        .split('')
        .reverse()
        .map((digit, positionIndex) => digit + '0'.repeat(positionIndex))
        .reverse()
        .map(componentString => parseInt(componentString, 10))
        .filter(component => component !== 0);