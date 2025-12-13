const validateCoupons = (code: string[], businessLine: string[], isActive: boolean[]): string[] =>
  code
    .map((c, i) => ({ c, b: businessLine[i], a: isActive[i] }))
    .filter(({ c, b, a }) => a && c && /^[a-zA-Z0-9_]+$/.test(c) && ["electronics", "grocery", "pharmacy", "restaurant"].includes(b))
    .sort((x, y) => ["electronics", "grocery", "pharmacy", "restaurant"].indexOf(x.b) - ["electronics", "grocery", "pharmacy", "restaurant"].indexOf(y.b) || (x.c < y.c ? -1 : x.c > y.c ? 1 : 0))
    .map(({ c }) => c);