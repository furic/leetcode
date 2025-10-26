# Array-Based Account System | 54 Lines | O(1) per operation | 26ms

# Intuition
This is a straightforward simulation problem requiring basic account management operations. We need to store account balances and validate operations before executing them. The key is proper validation: checking account existence and sufficient balance before any state changes.

# Approach
**Direct Array Manipulation with Validation:**
- Store balances in an array where index i corresponds to account (i+1)
- For each operation, validate preconditions before modifying state
- Use helper methods to encapsulate common validation logic

**Step-by-Step Design:**

1. **Data Structure:**
   - Use array `accountBalances` to store balances
   - Account numbers are 1-indexed, array is 0-indexed
   - Account n corresponds to `accountBalances[n-1]`

2. **Helper Methods:**
   
   **isValidAccount(accountNumber):**
   - Checks if account number is within valid range [1, n]
   - Returns true if `1 ≤ accountNumber ≤ accountBalances.length`
   
   **hasSufficientBalance(accountNumber, amount):**
   - Checks if account has enough funds for operation
   - Returns true if `accountBalances[accountNumber-1] ≥ amount`
   - Assumes account is already validated

3. **Transfer Operation:**
   - **Validations:**
     - Both accounts must exist
     - Source account must have sufficient balance
   - **Execution:**
     - Subtract amount from source: `accountBalances[account1-1] -= money`
     - Add amount to destination: `accountBalances[account2-1] += money`
   - **Atomicity:** Only modify if all validations pass

4. **Deposit Operation:**
   - **Validation:** Account must exist
   - **Execution:** Add amount to account: `accountBalances[account-1] += money`
   - **Note:** No balance check needed (always valid if account exists)

5. **Withdraw Operation:**
   - **Validations:**
     - Account must exist
     - Account must have sufficient balance
   - **Execution:** Subtract amount: `accountBalances[account-1] -= money`

**Design Decisions:**

**Why Array Over Map:**
- Accounts are sequential from 1 to n
- Array provides O(1) access by index
- No need for hash map overhead
- Simple index arithmetic: account n → index n-1

**Why Validation Before Modification:**
- Prevents partial/invalid state changes
- All-or-nothing semantics for each operation
- Easy to reason about correctness

**Why Helper Methods:**
- Encapsulate repeated validation logic
- Improve code readability
- Single source of truth for validation rules
- Easy to modify validation logic in one place

**Example Execution (balance = [10, 100, 20, 50, 30]):**

**withdraw(3, 10):**
- isValidAccount(3)? Yes (3 ≤ 5)
- hasSufficientBalance(3, 10)? Yes (20 ≥ 10)
- Execute: accountBalances[2] = 20 - 10 = 10
- Return: true

**transfer(5, 1, 20):**
- isValidAccount(5)? Yes (5 ≤ 5)
- isValidAccount(1)? Yes (1 ≤ 5)
- hasSufficientBalance(5, 20)? Yes (30 ≥ 20)
- Execute: accountBalances[4] = 30 - 20 = 10, accountBalances[0] = 10 + 20 = 30
- Return: true

**transfer(3, 4, 15):**
- isValidAccount(3)? Yes
- isValidAccount(4)? Yes
- hasSufficientBalance(3, 15)? No (10 < 15)
- Return: false (no modification)

**withdraw(10, 50):**
- isValidAccount(10)? No (10 > 5)
- Return: false (no modification)

**Edge Cases Handled:**
- Invalid account numbers (< 1 or > n)
- Insufficient balance
- Transfer to same account (valid if balance sufficient)
- Zero amount operations (valid)
- Negative amounts (not validated per problem, assumed valid input)

**Time Complexity Analysis:**
- All operations: O(1)
  - Array access: O(1)
  - Arithmetic operations: O(1)
  - Validations: O(1)
  - No loops or recursive calls

# Complexity
- Time complexity: $$O(1)$$ per operation (constructor is $$O(n)$$ to copy array)
- Space complexity: $$O(n)$$ for storing n account balances

# Code
```typescript
class Bank {
    private accountBalances: number[];

    constructor(balance: number[]) {
        this.accountBalances = balance;
    }

    transfer = (fromAccount: number, toAccount: number, amount: number): boolean => {
        if (
            !this.isValidAccount(fromAccount) ||
            !this.isValidAccount(toAccount) ||
            !this.hasSufficientBalance(fromAccount, amount)
        ) {
            return false;
        }

        this.accountBalances[fromAccount - 1] -= amount;
        this.accountBalances[toAccount - 1] += amount;
        return true;
    };

    deposit = (account: number, amount: number): boolean => {
        if (!this.isValidAccount(account)) {
            return false;
        }

        this.accountBalances[account - 1] += amount;
        return true;
    };

    withdraw = (account: number, amount: number): boolean => {
        if (!this.isValidAccount(account) || !this.hasSufficientBalance(account, amount)) {
            return false;
        }

        this.accountBalances[account - 1] -= amount;
        return true;
    };

    private isValidAccount = (accountNumber: number): boolean => {
        return accountNumber >= 1 && accountNumber <= this.accountBalances.length;
    };

    private hasSufficientBalance = (accountNumber: number, requiredAmount: number): boolean => {
        return this.accountBalances[accountNumber - 1] >= requiredAmount;
    };
}
```