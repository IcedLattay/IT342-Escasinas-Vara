import AddPayoutAccountOverlayContainer from "./AddPayoutAccountOverlayContainer";

export default function AddPayoutAccountOverlay({ 
    onExit,
    payoutMethodToAdd
}) {
    return (
        <AddPayoutAccountOverlayContainer 
            onExit={onExit}
            payoutMethodToAdd={payoutMethodToAdd}
        />
    );
}