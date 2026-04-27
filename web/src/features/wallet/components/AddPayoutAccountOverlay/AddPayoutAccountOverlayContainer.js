import { useEffect, useRef, useState } from "react";
import AddPayoutAccountOverlayView from "./AddPayoutAccountOverlayView";
import { handlePayoutAccountNumberOnChange, normalizePhoneNumber } from "../../utils/WalletHelpFunctions";
import { savePayoutAccount } from "../../api/WalletService";



export default function AddPayoutAccountOverlayContainer({ 
    onExit,
    payoutMethodToAdd,
    setSavedPayoutAccounts,
    setAddPayoutAccountOverlayIsOpen,
    setSelectedPayoutAccount
}) {

    // useStates
    const [payoutAccountNumberToAdd, setPayoutAccountNumberToAdd] = useState("");
    const [fieldErrorMsgs, setFieldErrorMsgs] = useState({
        accountNumberToAddError: ""
    });
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
            setSelectedPayoutAccount(newlySavedPayoutAccount.id);
            setAddPayoutAccountOverlayIsOpen(false);
        } catch (err) {
            console.log("Error adding payout account:", err);

            const rawError = err.response?.data?.error?.details || "Saving payout account failed.";
            const match = rawError.match(/"(.*)"/);
            const cleanMessage = match ? match[1] : rawError;

            setFieldErrorMsgs((prev) => ({
                ...prev,
                accountNumberToAddError: cleanMessage
            }));
        } finally {
            setIsSubmitting(false);
        }
    }

    function onPayoutAccountNumberChange(e) {
        handlePayoutAccountNumberOnChange(
            e,
            payoutMethodToAdd,
            setPayoutAccountNumberToAdd,
            setFieldValidationTracker,
            setFieldErrorMsgs
        );
    }

    return (
        <AddPayoutAccountOverlayView
            onExit={onExit}
            payoutMethodToAdd={payoutMethodToAdd}
            payoutAccountNumberToAdd={payoutAccountNumberToAdd}
            fieldErrorMsgs={fieldErrorMsgs}
            fieldValidationTracker={fieldValidationTracker}
            payoutAccountNumberField={payoutAccountNumberField}
            isSubmitting={isSubmitting}
            onPayoutAccountNumberChange={onPayoutAccountNumberChange}
            onSubmit={handleAddPayoutAccount}
        />
    );
}