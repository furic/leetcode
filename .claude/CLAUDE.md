# LeetCode Project - Claude Instructions

## Categorization Rules

### SQL Problem Identification

**Rule**: A problem belongs to the SQL category **ONLY** if there's a `.sql` file in the solution folder.

**Detection Method**:
```bash
# Check if a problem directory contains SQL files
ls {problem-directory}/*.sql 2>/dev/null
```

**Examples**:
- ✅ `3570-find-books-with-no-available-copies/` contains `solution.sql` → SQL category
- ❌ `1061-lexicographically-smallest-equivalent-string/` contains only `.ts` files → NOT SQL

**Important**:
- Do NOT categorize problems as SQL based on problem title or description alone
- Do NOT categorize problems as SQL if they only contain `.ts`, `.js`, `.py`, or other non-SQL files
- ALWAYS verify the presence of `.sql` files before categorizing as SQL

### Workflow Status

The auto-categorize workflow (`.github/workflows/auto-categorize.yml`) has been **disabled** (renamed to `.disabled`) to prevent duplicate entries in README.md. It was causing massive duplication by appending entries without checking for existing ones.

**Current State**: Manual categorization only

## README.md Structure

The README.md uses collapsible `<details>` and `<summary>` tags for better navigation:

- Main categories use `<details>` with emoji icons
- String Manipulation section has 9 nested subcategories with 2nd level `<summary>` tags
- All duplicates have been removed (6,877 duplicates cleaned up)

## Notes

- The project contains 483 unique LeetCode solutions across 11 categories
- File was reduced from 9,000+ lines to 648 lines after deduplication
- Pattern-based categorization is recommended (see CATEGORIZATION_GUIDE.md)
