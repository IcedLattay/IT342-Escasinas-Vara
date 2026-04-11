import ReceiptOverlayContainer from "./ReceiptOverlayContainer";

export default function ReceiptOverlay({ 
    setTransaction,
    transaction,
    onExit,
}) {
    
    return (
        <ReceiptOverlayContainer
            setTransaction={setTransaction}
            transaction={transaction}
            onExit={onExit}
        />
    );

}