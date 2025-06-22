const divideString = (s: string, k: number, fill: string): string[] =>
  Array.from({ length: Math.ceil(s.length / k) }, (_, i) =>
    (s.slice(i * k, (i + 1) * k) + fill.repeat(k)).slice(0, k)
  );