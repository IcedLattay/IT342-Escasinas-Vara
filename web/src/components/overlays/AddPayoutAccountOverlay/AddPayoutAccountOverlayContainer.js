import { useEffect, useRef, useState } from "react";
import AddPayoutAccountOverlayView from "./AddPayoutAccountOverlayView";
import { normalizePhoneNumber } from "../../../helper-functions/WalletHelpFunctions";



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
            // const res = await addPayoutAccount(payoutAccountToAddData);

            // const newlySavedPayoutAccount = res.data.data.payoutAccount;

            // temporary test data
            const payoutAccount = { id: 4, payoutMethod: "GCash", number: "63-9****51849" };

            setSavedPayoutAccounts((prev) => [payoutAccount, ...prev]);
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