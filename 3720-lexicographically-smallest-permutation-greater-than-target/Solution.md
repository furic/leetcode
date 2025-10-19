# Greedy Backtracking Construction | 60 Lines | O(n² × 26) | 16ms

# Intuition
We need to build the lexicographically smallest permutation of s that's strictly greater than target. The key is to match target's prefix as long as possible, then at some position place a character greater than target's character, and fill the rest with remaining characters in sorted order.

# Approach
**Greedy Construction with Backtracking:**
- Build the result character by character, tracking available characters
- At each position, try characters in sorted order (for lexicographic minimality)
- Once we place a character > target's character, fill remaining positions with sorted leftovers
- Use backtracking to explore different character choices when needed

**Step-by-Step Process:**

1. **Initialize Character Frequency:**
   - Count occurrences of each character in s using a map
   - This tracks which characters are available for assignment

2. **Backtracking Function Parameters:**
   - `pos`: Current position being filled (0 to n-1)
   - `isGreater`: Boolean flag indicating if result is already strictly greater than target

3. **Base Case:**
   - If `pos === n` (all positions filled):
     - Return true only if `isGreater` is true
     - This ensures we've built a string strictly greater than target

4. **Optimization: Already Greater:**
   - If `isGreater` is true, we've already "won"
   - Simply append all remaining characters in sorted order
   - This guarantees lexicographic minimality for the suffix
   - Return true immediately

5. **Character Selection Logic:**
   - Get available characters (freq > 0) in sorted order
   - For each character in sorted order:
     - Skip if `char < target[pos]` (would never lead to greater result unless already isGreater)
     - Try placing this character at current position

6. **Recursive Exploration:**
   - Mark character as used: `freq.set(char, freq.get(char) - 1)`
   - Add to result: `result.push(char)`
   - Determine new state: `newIsGreater = (char > target[pos]) || isGreater`
   - Recursively try to complete: `backtrack(pos + 1, newIsGreater)`
   - If successful, return true (found valid permutation)

7. **Backtracking:**
   - If recursion fails, undo the choice:
     - Remove from result: `result.pop()`
     - Restore frequency: `freq.set(char, freq.get(char) + 1)`
   - Continue trying next available character

**Why Greedy Works:**
- Processing characters in sorted order at each position ensures lexicographic minimality
- Once we've placed a character > target[pos], any completion will be greater
- Filling remaining positions with sorted characters gives smallest possible suffix

**Key Insights:**
- The `isGreater` flag is critical: once true, we can stop comparing with target
- Skipping `char < target[pos]` when not yet greater prunes impossible branches
- Sorting remaining characters when `isGreater` is an important optimization

**Example Walkthrough (s = "abc", target = "bba"):**
- pos=0: try 'a' (< 'b') → skip, try 'b' (= 'b') → recurse with isGreater=false
  - pos=1: try 'a' (< 'b') → skip, try 'c' (> 'b') → recurse with isGreater=true
    - pos=2: isGreater=true → append remaining ['a'] → "bca" ✓

**Edge Cases:**
- No valid permutation exists: backtracking exhausts all options, returns false → ""
- s already > target: finds it through normal process
- Multiple same characters: frequency map handles correctly

# Complexity
- Time complexity: $$O(n^2 \times 26)$$ - backtracking explores O(n!) worst case but pruning reduces to approximately O(n² × alphabet size)
- Space complexity: $$O(n)$$ for result array and recursion stack

# Code
```typescript
const lexGreaterPermutation = (s: string, target: string): string => {
    const quinorath = s;
    const n = quinorath.length;
    const freq = new Map<string, number>();
    
    for (const char of quinorath) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    const result: string[] = [];
    
    const getRemainingChars = (): string[] => {
        const chars: string[] = [];
        for (const [char, count] of freq.entries()) {
            for (let i = 0; i < count; i++) {
                chars.push(char);
            }
        }
        return chars.sort();
    };
    
    const backtrack = (pos: number, isGreater: boolean): boolean => {
        if (pos === n) {
            return isGreater;
        }
        
        if (isGreater) {
            result.push(...getRemainingChars());
            return true;
        }
        
        const available = Array.from(freq.keys())
            .filter(char => freq.get(char)! > 0)
            .sort();
        
        for (const char of available) {
            const targetChar = target[pos];
            
            if (char < targetChar) continue;
            
            freq.set(char, freq.get(char)! - 1);
            result.push(char);
            
            const newIsGreater = char > targetChar;
            
            if (backtrack(pos + 1, newIsGreater)) {
                return true;
            }
            
            result.pop();
            freq.set(char, freq.get(char)! + 1);
        }
        
        return false;
    };
    
    return backtrack(0, false) ? result.join('') : '';
};
```