import { useEffect, useRef, useState } from "react";
import AddPayoutAccountOverlayView from "./AddPayoutAccountOverlayView";




export default function AddPayoutAccountOverlayContainer({ 
    onExit,
    payoutMethodToAdd  
}) {

    // useStates
    const [payoutAccountNumber, setPayoutAccountNumber] = useState("");
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

    return (
        <AddPayoutAccountOverlayView
            onExit={onExit}
            payoutMethodToAdd={payoutMethodToAdd}
            payoutAccountNumber={payoutAccountNumber}
            setPayoutAccountNumber={setPayoutAccountNumber}
            fieldValidationTracker={fieldValidationTracker}
            setFieldValidationTracker={setFieldValidationTracker}
            payoutAccountNumberField={payoutAccountNumberField}
            isSubmitting={isSubmitting}
        />
    );
}