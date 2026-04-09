import WalletDashboardOverlayContainer from "./WalletDashboardOverlayContainer";

export default function WalletDashboardOverlay({ 
    onExit,
    handleOnClickWalletDeposit,
    handleOnClickWalletWithdrawal,
    handleOnClickViewTransactions, 
}) {

    return (
        <WalletDashboardOverlayContainer
            onExit={onExit}
            handleOnClickWalletDeposit={handleOnClickWalletDeposit}
            handleOnClickWalletWithdrawal={handleOnClickWalletWithdrawal}
            handleOnClickViewTransactions={handleOnClickViewTransactions}
        />
    );
}