import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../security/AuthContext";
import WalletWithdrawalOverlayView from "./WalletWithdrawalOverlayView";



export default function WalletWithdrawalOverlayContainer({ onExit }) {
    const { wallet } = useContext(AuthContext);
    
    // DUMMY DATA FOR NOW since wa pako ka implement payout accounts in backend!
    const payoutAccounts = [
        // { id: 1, payoutMethod: "GCash", number: "63-9****51849" },
        // { id: 2, payoutMethod: "GCash", number: "63-9****23952" },
        // { id: 3, payoutMethod: "Maya", number: "63-9****12345" },
    ];
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
    const [selectedPayoutAccount, setSelectedPayoutAccount] = useState(payoutAccounts[0]?.id);
    const [addPayoutAccountOverlayIsOpen, setAddPayoutAccountOverlayIsOpen] = useState(false);
    const [payoutMethodToAdd, setPayoutMethodToAdd] = useState(null);

    // useRefs
    const amountToWithdrawField = useRef(null);

    // useEffects
    useEffect(() => {
        amountToWithdrawField.current.focus();
    }, [])

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
            payoutAccounts={payoutAccounts}
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
            setselectedPayoutAccount={setSelectedPayoutAccount}
        />
    );
}