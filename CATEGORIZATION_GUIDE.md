# LeetCode Solution Categorization Guide (for Claude)

## How to Categorize New Solutions

1. **Detect new solutions**: Find directories matching `\d{4}-*` that aren't already in README.md
   ```bash
   comm -23 <(ls /path/to/leetcode | grep -E '^[0-9]' | sort) <(grep -oE '[0-9]+-[a-z0-9-]+' README.md | sort -u)
   ```
2. **Check for SQL**: If the directory contains a `.sql` file → SQL category. Do NOT use SQL based on title alone
3. **Pick the best category and subcategory** from the list below based on the primary algorithm/data structure
4. **Insert in sorted order** by problem number within the chosen subcategory
5. **Format**: `- [NNNN. Problem Title](./NNNN-problem-name/)`

## Existing Categories

```
📋 Arrays
  ├── Prefix Sum & Subarray/Product Problems
  ├── Sorting, Pairing & Removal
  ├── Counting, Frequency & Miscellaneous
  │   ├── Counting & Frequency
  │   └── Operations & Transformations
  ├── General Array Problems  (two sections exist — use 2nd for misc array problems)
  ├── Matrix Problems
  ├── Two-Pointer & Sliding Window
  └── Dynamic Programming

🔤 Strings
  ├── Lexicographical & Ordering
  ├── String Transformations & Operations
  ├── Palindromes & Subsequences
  ├── Vowels & Character Patterns
  ├── String Matching & Substrings
  ├── Digit & Number Strings
  ├── String Games & Encoding
  ├── File & Path Operations
  ├── Validation & Parsing
  └── Strings & Palindromes

🌳 Trees & Graphs

🔍 Hash Tables & Dictionaries

🔢 Bit Manipulation

🔢 Pure Math

💾 System Design

📊 SQL (only if .sql file exists in the solution directory)
```

## Categorization Heuristics

- **Arrays > Prefix Sum & Subarray/Product Problems**: Prefix sums, subarray sums/products, Kadane's, sliding window sums
- **Arrays > Sorting, Pairing & Removal**: Sorting-based solutions, pair matching, interval merging, removal of duplicates
- **Arrays > Counting & Frequency**: Counting elements, frequency maps, number of occurrences
- **Arrays > Operations & Transformations**: Array transformations, monotonic stack operations, greedy array modifications
- **Arrays > General Array Problems**: Miscellaneous array problems that don't fit elsewhere
- **Arrays > Matrix Problems**: 2D grid traversal, matrix manipulation, spiral/diagonal, grid BFS/DFS, submatrix sums
- **Arrays > Two-Pointer & Sliding Window**: Two pointers, sliding window (fixed or variable), binary search on arrays
- **Arrays > Dynamic Programming**: DP problems primarily on arrays (stock, house robber, subsequences)
- **Strings**: Problems focused on string operations, pattern matching, palindromes, character manipulation
- **Trees & Graphs**: BST, binary trees, graph traversal (BFS/DFS), linked lists, shortest path, connected components
- **Hash Tables & Dictionaries**: Problems where hash map/set is the **core** data structure (not just a helper)
- **Bit Manipulation**: Bitwise operations, XOR tricks, bit counting, powers of 2
- **Pure Math**: Number theory, GCD, combinatorics, geometry, arithmetic problems without data structure focus
- **System Design**: Design-pattern problems (LRU Cache, Design X, Implement Y)
- **SQL**: Database query problems — **must have a `.sql` file**

## Edge Cases

- **Linked list problems** (e.g., Merge K Sorted Lists) → Trees & Graphs
- **Matrix DP** (e.g., unique paths, product matrix) → Matrix Problems if grid-focused, Dynamic Programming if DP is the primary insight
- **Monotonic stack on arrays** → Arrays > Operations & Transformations
- **Visible people in a queue** → Arrays > Counting & Frequency (it's a counting problem using monotonic stack)
- **Cinema seat allocation** → Bit Manipulation (uses bitmask for row encoding)
- **Problems with both DP and matrix** → Matrix Problems if the grid structure is key; Dynamic Programming if the recurrence is the insight
- **Two General Array Problems sections**: The README has two separate sections with this name. Add to the second one for general/miscellaneous problems not fitting other subcategories.

When a problem spans multiple categories, choose the one that best describes the **primary technique** used in the solution.

## Current Stats (as of 2026-03-31)

- Total solution directories: 562
- Categories: 11 top-level, with Arrays having 7 subcategories and Strings having 9 subcategories
