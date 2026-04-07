
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