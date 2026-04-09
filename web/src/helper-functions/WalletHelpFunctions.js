
// helper functions for wallet


export function formatBalance(balance) {
    if (balance == null) {
        return "0.00"
    };

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(balance);
}


export function handleAmountOnChange(
    e,
    strategy,
    balance,
    setAmount, 
    setFieldValidationTracker,
    setBalanceIsSufficient
) {
    const val = e.target.value;

    if (!/^\d+(\.\d{0,2})?$|^\d*$/.test(val) && val !== "") {
        return;
    }

    const cleaned = val.replace(/^0+(?=\d)/, "");
    setAmount(cleaned);
    
    let result;
    
    switch (strategy) {

        case "deposit":
            result = amountInputValidationStrategies.deposit(cleaned);

            setFieldValidationTracker(prev => ({
                ...prev,
                amountToDepositIsValid: result.isValid
            }));

            break;
        case "withdraw":
            result = amountInputValidationStrategies.withdraw(cleaned, balance);

            setFieldValidationTracker(prev => ({
                ...prev,
                amountToWithdrawIsValid: result.isValid
            }));

            setBalanceIsSufficient(result.balanceIsSufficient);

            break;
    }
}

const amountInputValidationStrategies = {
    deposit: (value) => ({
        isValid: parseFloat(value) >= 10
    }),

    withdraw: (value, balance) => {
        const amount = parseFloat(value);
        let balanceIsSufficient;

        if (value === "") { 
            balanceIsSufficient = true;
        } else {
            balanceIsSufficient = amount <= balance;
        }
        const isValid = amount > 0 && balanceIsSufficient;

        return {
            isValid,
            balanceIsSufficient
        }
    }
};

export function handleAmountOnBlur(
    amount, 
    setAmount 
) {
    if (amount === "") return;
    
    const parsedAmount = parseFloat(amount);

    setAmount(parsedAmount.toFixed(2));
}