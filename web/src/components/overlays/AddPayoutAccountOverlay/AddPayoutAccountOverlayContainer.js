import { useEffect, useRef, useState } from "react";
import AddPayoutAccountOverlayView from "./AddPayoutAccountOverlayView";
import { normalizePhoneNumber } from "../../../helper-functions/WalletHelpFunctions";
import { savePayoutAccount } from "../../../api/WalletService";



export default function AddPayoutAccountOverlayContainer({ 
    onExit,
    payoutMethodToAdd,
    setSavedPayoutAccounts,
    setAddPayoutAccountOverlayIsOpen  
}) {

    // useStates
    const [payoutAccountNumberToAdd, setPayoutAccountNumberToAdd] = useState("");
    const [fieldValidationTracker, setFieldValidationTracker] = useState({
        payoutAccountNumberIsValid: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // useRefs
    const payoutAccountNumberField = useRef(null);

    // useEffects
    useEffect(() => {
        payoutAccountNumberField.current.focus();
    }, [])

    // Api calls
    async function handleAddPayoutAccount(e) {
        setIsSubmitting(true);

        e.preventDefault();

        const payoutAccountToAddData = {
            accountNumber: normalizePhoneNumber(payoutAccountNumberToAdd),
            payoutMethod: payoutMethodToAdd 
        } 

        try {
            const res = await savePayoutAccount(payoutAccountToAddData);

            const newlySavedPayoutAccount = res.data.data.payoutAccount;

            setSavedPayoutAccounts((prev) => [newlySavedPayoutAccount, ...prev]);
            setAddPayoutAccountOverlayIsOpen(false);
        } catch (err) {
            console.log("Error adding payout account:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <AddPayoutAccountOverlayView
            onExit={onExit}
            payoutMethodToAdd={payoutMethodToAdd}
            payoutAccountNumberToAdd={payoutAccountNumberToAdd}
            setPayoutAccountNumberToAdd={setPayoutAccountNumberToAdd}
            fieldValidationTracker={fieldValidationTracker}
            setFieldValidationTracker={setFieldValidationTracker}
            payoutAccountNumberField={payoutAccountNumberField}
            isSubmitting={isSubmitting}
            onSubmit={handleAddPayoutAccount}
        />
    );
}