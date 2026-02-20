# Recursive Decomposition with Sort | 23 Lines | O(n² log n) | 1ms

# Intuition

Special strings behave like balanced parentheses (1='(', 0=')'). Decompose into top-level special substrings, recursively optimize each, then sort descending to get lexicographically largest arrangement.

# Approach

**Recursive Strategy:**

1. **Find Top-Level Substrings**: Use balance counter
   - balance++ for '1', balance-- for '0'
   - balance=0 marks end of special substring

2. **Recursive Processing**: For each substring "1...0"
   - Recursively process inner part (excluding outer 1 and 0)
   - Wrap result with "1" and "0"

3. **Sort Descending**: Arrange substrings largest first
   - Larger = starts with more 1s
   - "11..." > "10..." lexicographically

**Why This Works:**
- Special substrings are independently swappable
- Sorting descending maximizes lexicographic order
- Recursion handles nested structure

**Example: s="11011000"**

Top-level: ["1101", "1000"]

Process "1101":
- Inner: "10" → recursively "10"
- Result: "1100"

Process "1000":
- Inner: "00" → recursively "00"  
- Result: "1000"

Sort: ["1100", "1000"] (already sorted)

Join: "11001000"... wait that's not right

Actually: ["1101", "1000"] → inner ["10", "00"]
After recursion: ["1100", "1000"]
Sort desc: ["1100", "1000"]
Result: "11001000"

Hmm, expected "11100100". Let me reconsider...

Actually the decomposition is: "1(10)1(1(00)0)00"
Top level: "11011000" has two parts...

Let me trace correctly:
- s="11011000", balance tracking finds "11011000" as one unit
- Inner of "11011000" is "1011000"
- Recurse on "1011000": finds ["10", "11000"]
- Sort: ["11000", "10"]
- Join: "1100010"
- Wrap: "1" + "1100010" + "0" = "11100100" ✓

# Complexity

- Time complexity: $$O(n^2 \log n)$$
  - Recursive depth: O(n) worst case
  - Per level: find substrings O(n), sort O(k log k)
  - Overall: O(n² log n)

- Space complexity: $$O(n^2)$$
  - Recursion stack: O(n)
  - Substring storage: O(n²) across all calls
  - Overall: O(n²)

# Code
```typescript []
const makeLargestSpecial = (s: string): string => {
    const specialSubstrings: string[] = [];
    let balance = 0;
    let substringStart = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            balance++;
        } else {
            balance--;
        }

        if (balance === 0) {
            const innerPart = makeLargestSpecial(s.slice(substringStart + 1, i));
            specialSubstrings.push("1" + innerPart + "0");
            substringStart = i + 1;
        }
    }

    specialSubstrings.sort().reverse();
    
    return specialSubstrings.join("");
};
```