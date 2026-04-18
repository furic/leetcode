const mirrorDistance = (n: number): number =>
    Math.abs(n - +n.toString().split('').reverse().join(''));