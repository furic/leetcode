# Greedy Backtracking Construction | 60 Lines | O(n² × 26) | 16ms

# Intuition
We need to build the lexicographically smallest permutation that's strictly greater than target. The strategy is to match target's prefix as long as possible, then place the smallest character that's greater than target's character at that position, then fill remaining positions with smallest available characters.

# Approach
**Greedy Construction with Backtracking:**
- Build the result position by position from left to right
- Track whether we've already made the result greater than target
- Once greater, greedily use smallest remaining characters
- Use backtracking to handle cases where our choices lead to dead ends

**Step-by-Step Process:**

1. **Initialize Character Frequencies:**
   - Count all characters in s using a frequency map
   - This tracks which characters are still available to use

2. **Recursive Construction (backtrack function):**
   - Parameters:
     - `pos`: Current position being filled (0 to n-1)
     - `isGreater`: Whether result is already lexicographically greater than target

3. **Base Case:**
   - If `pos === n`, we've filled all positions
   - Return true if `isGreater` (we found a valid solution)

4. **Optimization: Already Greater:**
   - If `isGreater === true`, we don't need to be careful anymore
   - Simply append all remaining characters in sorted order
   - This ensures lexicographically smallest completion

5. **Try Each Available Character:**
   - Get all characters with count > 0, sorted alphabetically
   - For each character:
     - Skip if `char < target[pos]` (would need to make up for it later, not optimal)
     - Place character at current position
     - Update `isGreater` if `char > target[pos]`
     - Recursively try to fill remaining positions

6. **Backtracking:**
   - If recursive call succeeds, propagate success upward (return true)
   - If recursive call fails, undo the choice (pop from result, restore frequency)
   - Try next character option

**Key Insights:**

- **Greedy Character Selection:** Once we place a character > target[pos], all remaining positions should use smallest available characters
- **Pruning:** Skip characters < target[pos] when isGreater is false (can't lead to optimal solution)
- **Early Termination:** Once isGreater becomes true, construction becomes deterministic

**Example Walkthrough (s = "abc", target = "bba"):**
- freq = {a:1, b:1, c:1}
- pos=0: try 'a' (< 'b'), skip; try 'b' (= 'b'), use it
- pos=1: isGreater=false, try 'a' (< 'b'), skip; try 'c' (> 'b'), use it, isGreater=true
- pos=2: isGreater=true, append remaining sorted ['a'] → "bca"

**Why Backtracking is Needed:**
- Sometimes our greedy choice at position i might leave no valid options for position i+1
- Example: if we place a character that uses up all larger characters, might get stuck
- Backtracking allows us to undo and try alternative choices

**Failure Case:**
- If backtrack returns false from initial call, no valid permutation exists
- Return empty string

# Complexity
- Time complexity: $$O(n^2 \times 26)$$ - at most n positions, each tries up to 26 characters, each attempt does O(n) work for sorting remaining chars
- Space complexity: $$O(n)$$ for recursion stack and result array

# Code
```typescript
const lexGreaterPermutation = (s: string, target: string): string => {
    const n = s.length;
    const freq = new Map<string, number>();
    
    for (const char of s) {
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