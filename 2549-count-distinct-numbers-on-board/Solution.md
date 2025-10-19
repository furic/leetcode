# Mathematical Pattern Analysis | 1 Line | O(1) |

# Intuition
At first glance, this seems like a complex simulation problem. However, by analyzing the pattern of which numbers get added, we can find a simple mathematical relationship. The key insight is understanding what `x % i == 1` means and how numbers propagate.

# Approach
**Pattern Discovery Through Analysis:**
- Instead of simulating 10^9 days, identify the mathematical pattern
- Analyze which numbers can be generated from n and how they propagate
- Discover that the answer follows a simple formula

**Step-by-Step Analysis:**

1. **Understanding the Operation:**
   - For number x on board, we add all i where `x % i == 1`
   - This means: x = ki + 1 for some integer k ≥ 1
   - Rearranging: i = (x - 1) / k
   - So we're looking for divisors of (x - 1)

2. **Starting with n:**
   - Day 0: board has {n}
   - For n to generate i: `n % i == 1` → i divides (n - 1)
   - So we add all divisors of (n - 1) that are ≥ 2

3. **Key Observation:**
   - n generates n-1 (since n % (n-1) = 1 when n ≥ 2)
   - n-1 generates n-2 (since (n-1) % (n-2) = 1 when n ≥ 3)
   - n-2 generates n-3, and so on...
   - This creates a chain: n → n-1 → n-2 → ... → 2

4. **Propagation Analysis:**
   - Once we have n-1, it will generate n-2
   - Once we have n-2, it will generate n-3
   - This continues until we reach 2
   - Number 1 can never appear because we need i ≥ 1 and x % i == 1, but x % 1 = 0 for all x

5. **Why It Stops at 2:**
   - For any x ≥ 2: x % (x-1) = 1, so x generates x-1
   - But 2 % 1 = 0, not 1, so 2 cannot generate 1
   - Therefore, the cascade stops at 2

6. **Final Pattern:**
   - For n ≥ 2: board eventually contains {2, 3, 4, ..., n}
   - Count = n - 1 distinct numbers
   - For n = 1: only 1 remains (special case, nothing can be generated)

**Why 10^9 Days Doesn't Matter:**
- The propagation from n to 2 happens quickly (within n steps)
- After that, no new numbers can be added
- 10^9 days is far more than needed to reach steady state
- The problem uses this large number to ensure convergence

**Mathematical Proof Sketch:**
- Lemma: If x is on board and x ≥ 2, then x-1 will eventually be on board
  - Proof: x % (x-1) = 1 for all x ≥ 2
- By induction: if n is on board, then {2, 3, ..., n} will all eventually appear
- 1 cannot appear (proven above)
- Therefore answer is n - 1 for n ≥ 2

# Complexity
- Time complexity: $$O(1)$$ - simple arithmetic operation
- Space complexity: $$O(1)$$ - no data structures needed

# Code
```typescript
const distinctIntegers = (n: number): number => n > 1 ? n - 1 : 1;
```