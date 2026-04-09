import WalletWithdrawalOverlayContainer from "./WalletWithdrawalOverlayContainer";

export default function WalletWithdrawalOverlay({ 
    onExit,
    setAddPayoutAccountOverlayIsOpen,
    setPayoutMethodToAdd
}) {
    
    return (
        <WalletWithdrawalOverlayContainer 
            onExit={onExit}
            setAddPayoutAccountOverlayIsOpen={setAddPayoutAccountOverlayIsOpen}
            setPayoutMethodToAdd={setPayoutMethodToAdd}
        />
    );
}