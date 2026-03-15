# LeetCode Solution Categorization Guide (for Claude)

## How to Categorize New Solutions

1. **Detect new solutions**: Find directories matching `\d{4}-*` that aren't already in README.md
2. **Read the problem**: Open the problem's `README.md` to understand the algorithm/data structure
3. **Check for SQL**: If the directory contains a `.sql` file → SQL category. Do NOT use SQL based on title alone
4. **Pick the best category and subcategory** from the list below based on the primary algorithm/data structure
5. **Insert in sorted order** by problem number within the chosen subcategory
6. **Format**: `| # | [Problem Title](directory/) | [Solution](directory/file.ext) |`

## Existing Categories

```
📋 Arrays
  ├── Prefix Sum & Subarray/Product Problems
  ├── Sorting, Pairing & Removal
  ├── Counting, Frequency & Miscellaneous
  │   ├── Counting & Frequency
  │   └── Operations & Transformations
  ├── General Array Problems
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

- **Arrays**: Problems primarily about array manipulation, subarrays, sliding windows, sorting, matrix traversal
- **Strings**: Problems focused on string operations, pattern matching, palindromes, character manipulation
- **Trees & Graphs**: BST, binary trees, graph traversal (BFS/DFS), shortest path, connected components
- **Hash Tables & Dictionaries**: Problems where hash map/set is the core data structure (not just a helper)
- **Bit Manipulation**: Bitwise operations, XOR tricks, bit counting
- **Pure Math**: Number theory, GCD, combinatorics, arithmetic problems without data structure focus
- **System Design**: Design-pattern problems (LRU Cache, Iterator, etc.)
- **SQL**: Database query problems — **must have a `.sql` file**

When a problem spans multiple categories, choose the one that best describes the **primary technique** used in the solution.
