
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

export function handlePayoutAccountNumberOnChange(
    e,
    setPayoutAccountNumber,
    setFieldValidationTracker
) {
    let raw = e.target.value.replace(/\D/g, '');
    
    if (raw.length >= 2 && raw.startsWith('0')) {
        raw = raw.substring(1);
    }

    const digitsOnly = raw.slice(0, 10);

    let formatted = '';
    if (digitsOnly.length > 0) {
        formatted += digitsOnly.substring(0, 3);
        if (digitsOnly.length > 3) {
            formatted += ' ' + digitsOnly.substring(3, 6);
        }
        if (digitsOnly.length > 6) {
            formatted += ' ' + digitsOnly.substring(6, 10);
        }
    }

    setPayoutAccountNumber(formatted);

    const isValid = digitsOnly.length === 10 && digitsOnly.startsWith('9');

    setFieldValidationTracker((prev) => ({
        ...prev,
        payoutAccountNumberIsValid: isValid
    }));
}