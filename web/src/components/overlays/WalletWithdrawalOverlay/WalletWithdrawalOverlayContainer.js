import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../security/AuthContext";
import WalletWithdrawalOverlayView from "./WalletWithdrawalOverlayView";



export default function WalletWithdrawalOverlayContainer({ 
    onExit,
    savedPayoutAccounts,
    setAddPayoutAccountOverlayIsOpen,
    setPayoutMethodToAdd,
    selectedPayoutAccount,
    setSelectedPayoutAccount
}) {
    const { wallet } = useContext(AuthContext);
    
    const supportedPayoutMethods = [
        {id: "GCASH", payoutMethod: "GCash",},
        {id: "PAYMAYA", payoutMethod: "Paymaya"}
    ];

    // useStates
    const [amountToWithdraw, setAmountToWithdraw] = useState("");
    const [fieldValidationTracker, setFieldValidationTracker] = useState({
        amountToWithdrawIsValid: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [balanceIsSufficient, setBalanceIsSufficient] = useState(true);

    // useRefs
    const amountToWithdrawField = useRef(null);

    // useEffects
    useEffect(() => {
        amountToWithdrawField.current.focus();
    }, [])

    useEffect(() => {
        if (savedPayoutAccounts.length > 0 && !selectedPayoutAccount) {
            setSelectedPayoutAccount(savedPayoutAccounts[0].id);
        }
    }, [savedPayoutAccounts, selectedPayoutAccount]);

    async function handleWithdrawal(e) {
        setIsSubmitting(true);

        e.preventDefault();

        // define form data

        try {
            // call withdraw api which will deduct the balance and create a transaction
            // const res = await withdraw(formData);  

            
        } catch (err) {
            console.log("Withdrawal error:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <WalletWithdrawalOverlayView
            onExit={onExit}
            wallet={wallet}
            handleAddPayoutAccount={(payoutMethodId) => {
                setPayoutMethodToAdd(payoutMethodId);
                setAddPayoutAccountOverlayIsOpen(true);
            }}
            amountToWithdrawField={amountToWithdrawField}
            supportedPayoutMethods={supportedPayoutMethods}
            amountToWithdraw={amountToWithdraw}
            setAmountToWithdraw={setAmountToWithdraw}
            fieldValidationTracker={fieldValidationTracker}
            setFieldValidationTracker={setFieldValidationTracker}
            balanceIsSufficient={balanceIsSufficient}
            setBalanceIsSufficient={setBalanceIsSufficient}
            isSubmitting={isSubmitting}
            onSubmit={handleWithdrawal}
            selectedPayoutAccount={selectedPayoutAccount}
            setSelectedPayoutAccount={setSelectedPayoutAccount}
            savedPayoutAccounts={savedPayoutAccounts}
        />
    );
}