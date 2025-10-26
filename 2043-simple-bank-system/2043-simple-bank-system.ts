class Bank {
    private accountBalances: number[];

    constructor(balance: number[]) {
        this.accountBalances = balance;
    }

    transfer = (fromAccount: number, toAccount: number, amount: number): boolean => {
        // Validate both accounts exist and source has sufficient funds
        if (
            !this.isValidAccount(fromAccount) ||
            !this.isValidAccount(toAccount) ||
            !this.hasSufficientBalance(fromAccount, amount)
        ) {
            return false;
        }

        // Perform transfer
        this.accountBalances[fromAccount - 1] -= amount;
        this.accountBalances[toAccount - 1] += amount;
        return true;
    };

    deposit = (account: number, amount: number): boolean => {
        // Validate account exists
        if (!this.isValidAccount(account)) {
            return false;
        }

        // Perform deposit
        this.accountBalances[account - 1] += amount;
        return true;
    };

    withdraw = (account: number, amount: number): boolean => {
        // Validate account exists and has sufficient funds
        if (!this.isValidAccount(account) || !this.hasSufficientBalance(account, amount)) {
            return false;
        }

        // Perform withdrawal
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

/**
 * Your Bank object will be instantiated and called as such:
 * var obj = new Bank(balance)
 * var param_1 = obj.transfer(account1, account2, money)
 * var param_2 = obj.deposit(account, money)
 * var param_3 = obj.withdraw(account, money)
 */