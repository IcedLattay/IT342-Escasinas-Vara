import WalletDashboardOverlayContainer from "./WalletDashboardOverlayContainer";

export default function WalletDashboardOverlay({ 
    onExit,
    setSavedPayoutAccounts,
    handleOnClickWalletDeposit,
    handleOnClickWalletWithdrawal,
    handleOnClickViewTransactions, 
}) {

    return (
        <WalletDashboardOverlayContainer
            onExit={onExit}
            setSavedPayoutAccounts={setSavedPayoutAccounts}
            handleOnClickWalletDeposit={handleOnClickWalletDeposit}
            handleOnClickWalletWithdrawal={handleOnClickWalletWithdrawal}
            handleOnClickViewTransactions={handleOnClickViewTransactions}
        />
    );
}