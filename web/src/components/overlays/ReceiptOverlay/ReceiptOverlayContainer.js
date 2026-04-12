import { useContext, useEffect } from "react";
import { AuthContext } from "../../../security/AuthContext";
import { buildReceiptData } from "../../../helper-functions/WalletHelpFunctions";
import ReceiptOverlayView from "./ReceiptOverlayView";


export default function ReceiptOverlayContainer({ 
    transaction,
    onExit,
}) {

    const { wallet } = useContext(AuthContext);

    const receiptData = transaction ? buildReceiptData(transaction, wallet?.currency) : null;

    return (
        <ReceiptOverlayView
            receiptData={receiptData}
            onExit={onExit}
        />
    )
}