function decimalRepresentation(n: number): number[] {
  return (n + "")
    .split("")
    .reverse()
    .map((d, i) => d + "0".repeat(i))
    .reverse()
    .map(d => parseInt(d, 10))
    .filter(d => d !== 0)
}