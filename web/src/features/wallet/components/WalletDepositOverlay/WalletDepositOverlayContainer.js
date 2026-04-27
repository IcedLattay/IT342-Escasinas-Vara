import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../security/AuthContext";
import { deposit } from "../../api/WalletService";
import WalletDepositOverlayView from "./WalletDepositOverlayView";

export default function WalletDepositOverlayContainer({ onExit }) {

    const { wallet } = useContext(AuthContext);

    // useStates
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("GCASH")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fieldValidationTracker, setFieldValidationTracker] = useState({
        amountToDepositIsValid: false
    })
    const [amountToDeposit, setAmountToDeposit] = useState("")

    // useRefs
    const amountToDepositField = useRef(null);

    // useEffects
    useEffect(() => {
        amountToDepositField.current.focus();

    }, [])

    // Api calls
    async function handleDeposit(e) {
        setIsSubmitting(true)

        e.preventDefault();

        const walletDepositData = {
            amount: parseFloat(amountToDeposit),
            paymentMethod: selectedPaymentMethod,
        };

        try {
            const res = await deposit(walletDepositData);

            console.log(res.data)

            sessionStorage.setItem("externalReferenceId", res.data.data.externalReferenceId);

            window.location.href = res.data.data.checkoutUrl;
        } catch (err) {
            console.log("Deposit error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <WalletDepositOverlayView 
            onExit={onExit}
            wallet={wallet}
            amountToDepositField={amountToDepositField}
            amountToDeposit={amountToDeposit}
            setAmountToDeposit={setAmountToDeposit}
            fieldValidationTracker={fieldValidationTracker}
            setFieldValidationTracker={setFieldValidationTracker}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            onSubmit={handleDeposit}
            isSubmitting={isSubmitting}
        />
    );
}