
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
    payoutMethodToAdd,
    setPayoutAccountNumber,
    setFieldValidationTracker,
    setFieldErrorMsgs
) {
    let raw = e.target.value.replace(/\D/g, '');

    // The "Replace 0 with 9" logic:
    // If user has 2+ digits and starts with 0, drop the 0 immediately
    if (raw.length >= 2 && raw.startsWith('0')) {
        raw = raw.substring(1);
    }

    const digitsOnly = raw.slice(0, 10);

    // Apply the Space Masking
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

    // Validation: Only valid if it's 10 digits AND starts with 9
    // Note: If they only have '0' in the box, isValid will be false
    const isValid = digitsOnly.length === 10 && digitsOnly.startsWith('9');

    setFieldValidationTracker((prev) => ({
        ...prev,
        payoutAccountNumberIsValid: isValid
    }));

    if (digitsOnly.length === 0) {
        setFieldErrorMsgs((prev) => ({
            ...prev,
            accountNumberToAddError: ""
        }));
    } else if (digitsOnly.length < 10) {
        setFieldErrorMsgs((prev) => ({
            ...prev,
            accountNumberToAddError: ""
        }));
    } else if (!isValid) {
        setFieldErrorMsgs((prev) => ({
            ...prev,
            accountNumberToAddError: `Invalid ${payoutMethodToAdd === "GCASH" ? "GCash" : "Paymaya"} number`
        }));
    } else {
        setFieldErrorMsgs((prev) => ({
            ...prev,
            accountNumberToAddError: ""
        }));
    }
}

export function buildReceiptData(
    transaction,
    currency
) {
    
    switch (transaction.type) {
        case "Payment":
            return {
                title: "Payment Receipt",
                fields: [
                    { label: "Account Name", type: "text", value: transaction.accountName },
                    { label: "Amount Sent", type: "text", value: `${currency} ${formatBalance(transaction.amount)}` },
                    { label: "Transaction ID", type: "text", value: transaction.transactionId },
                    { label: "Date", type: "text", value: transaction.createdAt },
                ],
            };

            case "Withdrawal":
            return {
                title: "Payout Receipt",
                fields: [
                    { label: "Payout Account", type: "payout account", value: transaction.payoutAccount },
                    { label: "Amount Sent", type: "text", value: `${currency} ${formatBalance(transaction.amount)}` },
                    { label: "Transaction ID", type: "text", value: transaction.transactionId },
                    { label: "Date", type: "text", value: transaction.createdAt },
                ],
            };

            case "Deposit":
            return {
                title: "Deposit Receipt",
                fields: [
                    { label: "Amount", type: "text", value: `${currency} ${formatBalance(transaction.amount)}` },
                    { label: "Transaction ID", type: "text", value: transaction.transactionId },
                    { label: "Payment Method", type: "payment method", value: transaction.paymentMethod },
                    { label: "Date", type: "text", value: transaction.createdAt },
                ],
            };

            default:
            return null;
        }
    }

export function normalizePhoneNumber(input) {
    let value = input.trim();

    value = value.replace(/\D/g, "");

    if (!value.startsWith("0")) {
        value = "0" + value;
    }

    return value;
}

export function formatAndMaskPhone(input) {
    let digits = input.replace(/\D/g, "");

    if (digits.startsWith("0")) {
        digits = "63" + digits.substring(1);
    }

    if (digits.length >= 12) {
        const countryCode = digits.substring(0, 2);
        const firstMobileDigit = digits.substring(2, 3);
        const lastFive = digits.slice(-5);
        
        return `${countryCode}-${firstMobileDigit}****${lastFive}`;
    }

    return digits;
}