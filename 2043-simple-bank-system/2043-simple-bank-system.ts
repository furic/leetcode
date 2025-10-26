class Bank {
    private accountBalances: number[];
    private accountCount: number;

    constructor(balance: number[]) {
        this.accountBalances = balance;
        this.accountCount = balance.length;
    }

    /**
     * Checks if an account number is valid (between 1 and n)
     */
    private isValidAccount = (accountNumber: number): boolean => {
        return accountNumber >= 1 && accountNumber <= this.accountCount;
    };

    /**
     * Checks if an account has sufficient balance
     */
    private hasSufficientBalance = (accountNumber: number, amount: number): boolean => {
        return this.accountBalances[accountNumber - 1] >= amount;
    };

    /**
     * Transfer money from account1 to account2
     * Returns true if successful, false otherwise
     */
    transfer = (account1: number, account2: number, money: number): boolean => {
        // Validate both accounts exist and source account has sufficient funds
        if (
            !this.isValidAccount(account1) ||
            !this.isValidAccount(account2) ||
            !this.hasSufficientBalance(account1, money)
        ) {
            return false;
        }

        // Perform transfer
        this.accountBalances[account1 - 1] -= money;
        this.accountBalances[account2 - 1] += money;
        return true;
    };

    /**
     * Deposit money into an account
     * Returns true if successful, false otherwise
     */
    deposit = (accountNumber: number, money: number): boolean => {
        // Validate account exists
        if (!this.isValidAccount(accountNumber)) {
            return false;
        }

        // Perform deposit
        this.accountBalances[accountNumber - 1] += money;
        return true;
    };

    /**
     * Withdraw money from an account
     * Returns true if successful, false otherwise
     */
    withdraw = (accountNumber: number, money: number): boolean => {
        // Validate account exists and has sufficient funds
        if (
            !this.isValidAccount(accountNumber) ||
            !this.hasSufficientBalance(accountNumber, money)
        ) {
            return false;
        }

        // Perform withdrawal
        this.accountBalances[accountNumber - 1] -= money;
        return true;
    };
}