import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import styles from "./AddPayoutAccountOverlay.module.css";
import inputStyles from "../../../global-styles/InputStyles.module.css";
import { handlePayoutAccountNumberOnChange } from "../../../helper-functions/WalletHelpFunctions";

export default function AddPayoutAccountOverlayView({
    onExit,
    payoutMethodToAdd,
    payoutAccountNumberToAdd,
    setPayoutAccountNumberToAdd,
    fieldValidationTracker,
    setFieldValidationTracker,
    payoutAccountNumberField,
    isSubmitting,
    onSubmit
}) {
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p
                    style={{
                        fontSize: "1.1rem"
                    }}
                >Add a {payoutMethodToAdd && (payoutMethodToAdd === "GCASH" ? 
                "GCash" : 
                ( payoutMethodToAdd === "PAYMAYA" && "Paymaya"))} wallet</p>
            </div>
            
            <div className={styles.body}>
                <div className={`${styles.field} ${styles.number}`}>
                    <p>Enter your {payoutMethodToAdd && (payoutMethodToAdd === "GCASH" ? 
                    "GCash" : 
                    ( payoutMethodToAdd === "PAYMAYA" && 
                    "Paymaya"))}</p>

                    <div className={`${styles.inputWrapper} ${inputStyles.inputWrapper} ${ (payoutAccountNumberToAdd.replace(/\s/g, '').length === 10 && !fieldValidationTracker.payoutAccountNumberIsValid) ? inputStyles.error : ''}`}>
                        <p 
                            style={{ 
                                fontWeight: "500",
                                color: "#656565"
                            }}
                        >+63</p>

                        <input 
                            type="text"
                            value={payoutAccountNumberToAdd} 
                            onChange={(e) => handlePayoutAccountNumberOnChange(e, setPayoutAccountNumberToAdd, setFieldValidationTracker)}
                            ref={payoutAccountNumberField}
                        />
                    </div>

                    {payoutAccountNumberToAdd.replace(/\s/g, '').length === 10 && !fieldValidationTracker.payoutAccountNumberIsValid && (
                    <p 
                        style={{
                            fontSize: ".7rem",
                            color: "#a51111"
                        }}
                    >Invalid {payoutMethodToAdd && (payoutMethodToAdd === "GCASH" ? 
                    "GCash" : 
                    ( payoutMethodToAdd === "PAYMAYA" && 
                    "Paymaya"))} number</p>
                    )}
                </div>

                <button 
                    className={styles.submitButton}
                    type="submit" 
                    style={{
                        fontSize: ".8rem",
                        fontFamily: "Inter"
                    }}
                    onClick={onSubmit} 
                    disabled={
                        isSubmitting ||
                        !fieldValidationTracker.payoutAccountNumberIsValid
                    }
                >
                    
                    <>Add account</>
                    
                </button>
            
            </div> 
            <ExitOverlayButton onClick={onExit} />
        </div>
    );
}