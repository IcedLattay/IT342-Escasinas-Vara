import { useContext } from "react";
import ReceiptOverlayView from "./ReceiptOverlayView";
import { AuthContext } from "../../../security/AuthContext";


export default function ReceiptOverlayContainer({ 
    receiptData,
    onExit,
}) {

    const { wallet } = useContext(AuthContext);

    return (
        <ReceiptOverlayView
            receiptData={receiptData}
            onExit={onExit}
            wallet={wallet}
        />
    )
}