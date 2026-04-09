import ReceiptOverlayContainer from "./ReceiptOverlayContainer";

export default function ReceiptOverlay({ 
        receiptData,
        onExit,
    }) {
    
    return (
        <ReceiptOverlayContainer
            receiptData={receiptData}
            onExit={onExit}
        />
    );

}