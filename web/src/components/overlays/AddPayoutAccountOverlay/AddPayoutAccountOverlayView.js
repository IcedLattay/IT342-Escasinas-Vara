import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import styles from "./AddPayoutAccountOverlay.module.css";
import inputStyles from "../../../global-styles/InputStyles.module.css";
import { handlePayoutAccountNumberOnChange } from "../../../helper-functions/WalletHelpFunctions";

export default function AddPayoutAccountOverlayView({
    onExit,
    payoutMethodToAdd,
    payoutAccountNumberToAdd,
    fieldErrorMsgs,
    fieldValidationTracker,
    payoutAccountNumberField,
    onPayoutAccountNumberChange,
    isSubmitting,
    onSubmit
}) {
    const payoutMethodLabel =
        payoutMethodToAdd === "GCASH"
            ? "GCash"
            : payoutMethodToAdd === "PAYMAYA"
            ? "Paymaya"
            : "";

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p
                    style={{
                        fontSize: "1.1rem"
                    }}
                >Add a {payoutMethodLabel} wallet</p>
            </div>
            
            <div className={styles.body}>
                <div className={`${styles.field} ${styles.number}`}>
                    <p>Enter your {payoutMethodLabel} number</p>

                    <div className={`${styles.inputWrapper} ${inputStyles.inputWrapper} ${ fieldErrorMsgs?.accountNumberToAddError ? inputStyles.error : ""}`}>
                        <p 
                            style={{ 
                                fontWeight: "500",
                                color: "#656565"
                            }}
                        >+63</p>

                        <input 
                            type="text"
                            value={payoutAccountNumberToAdd} 
                            onChange={onPayoutAccountNumberChange}
                            ref={payoutAccountNumberField}
                        />
                    </div>

                    {fieldErrorMsgs?.accountNumberToAddError && (
                    <p 
                        style={{
                            fontSize: ".7rem",
                            color: "#a51111"
                        }}
                    > 
                        { fieldErrorMsgs.accountNumberToAddError }
                    </p>
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