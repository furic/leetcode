# Filter and Sort Valid Coupons | 7 Lines | O(n log n) | 3ms

# Intuition
The problem requires filtering coupons based on validity criteria and then sorting them by category and code. Using array transformations (map, filter, sort) helps to process the input efficiently.

# Approach
- Combine the input arrays into one array of objects for easier filtering and sorting.
- Filter the coupons that are active, have valid codes (alphanumeric + underscore), and belong to the given business categories.
- Sort the filtered coupons primarily by the fixed category order, and secondarily by code lex order.
- Extract and return only the sorted coupon codes.

# Complexity
- Time complexity: $$O(n \log n)$$ due to sorting.
- Space complexity: $$O(n)$$ for storing intermediate arrays.

# Code
```typescript
const validateCoupons = (code: string[], businessLine: string[], isActive: boolean[]): string[] =>
  code
    .map((c, i) => ({ c, b: businessLine[i], a: isActive[i] }))
    .filter(({ c, b, a }) => a && c && /^[a-zA-Z0-9_]+$/.test(c) && ["electronics", "grocery", "pharmacy", "restaurant"].includes(b))
    .sort((x, y) => ["electronics", "grocery", "pharmacy", "restaurant"].indexOf(x.b) - ["electronics", "grocery", "pharmacy", "restaurant"].indexOf(y.b) || (x.c < y.c ? -1 : x.c > y.c ? 1 : 0))
    .map(({ c }) => c);
```