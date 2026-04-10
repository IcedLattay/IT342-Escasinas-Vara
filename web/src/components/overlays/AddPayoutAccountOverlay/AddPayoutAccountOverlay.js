import AddPayoutAccountOverlayContainer from "./AddPayoutAccountOverlayContainer";

export default function AddPayoutAccountOverlay({ 
    onExit,
    payoutMethodToAdd,
    setSavedPayoutAccounts,
    setAddPayoutAccountOverlayIsOpen
}) {
    return (
        <AddPayoutAccountOverlayContainer 
            onExit={onExit}
            payoutMethodToAdd={payoutMethodToAdd}
            setSavedPayoutAccounts={setSavedPayoutAccounts}
            setAddPayoutAccountOverlayIsOpen={setAddPayoutAccountOverlayIsOpen}
        />
    );
}