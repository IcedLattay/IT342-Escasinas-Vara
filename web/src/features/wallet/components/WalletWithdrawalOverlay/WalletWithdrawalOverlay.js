import WalletWithdrawalOverlayContainer from "./WalletWithdrawalOverlayContainer";

export default function WalletWithdrawalOverlay({ 
    onExit,
    savedPayoutAccounts,
    setAddPayoutAccountOverlayIsOpen,
    setPayoutMethodToAdd,
    selectedPayoutAccount,
    setSelectedPayoutAccount,
    setTransaction
}) {
    
    return (
        <WalletWithdrawalOverlayContainer 
            onExit={onExit}
            savedPayoutAccounts={savedPayoutAccounts}
            setAddPayoutAccountOverlayIsOpen={setAddPayoutAccountOverlayIsOpen}
            setPayoutMethodToAdd={setPayoutMethodToAdd}
            selectedPayoutAccount={selectedPayoutAccount}
            setSelectedPayoutAccount={setSelectedPayoutAccount}
            setTransaction={setTransaction}
        />
    );
}