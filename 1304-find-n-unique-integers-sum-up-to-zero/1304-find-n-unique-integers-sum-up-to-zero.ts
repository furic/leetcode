const sumZero = (n: number): number[] => [
    ...Array.from({ length: Math.floor(n / 2) }, (_, i) => [i + 1, -(i + 1)]).flat(),
    ...(n % 2 ? [0] : []),
];