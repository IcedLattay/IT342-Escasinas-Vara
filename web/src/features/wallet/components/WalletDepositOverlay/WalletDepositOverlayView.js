import ExitOverlayButton from "../../../../shared/components/ExitOverlayButton/ExitOverlayButton";
import MayaLogo from "../../../../shared/assets/vector-assets/MayaLogo"
import GCashLogo from "../../../../shared/assets/vector-assets/GCashLogo"
import { Loader2 } from "lucide-react";
import { handleAmountOnChange, handleAmountOnBlur } from "../../utils/WalletHelpFunctions";
import styles from "./WalletDepositOverlay.module.css";

export default function WalletDepositOverlayView({ 
    onExit,
    wallet,
    amountToDepositField,
    amountToDeposit,
    setAmountToDeposit,
    fieldValidationTracker,
    setFieldValidationTracker,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    onSubmit,
    isSubmitting,
}) {

    return (
        <div className={styles.content}>
            

            <div className={styles.header}>
                <p
                    style={{
                        fontSize: "1.1rem"
                    }}
                >Deposit to wallet</p>
            </div>

            <div className={styles.body}>
                <div className={`${styles.field} ${styles.amount}`}>
                    <p>Enter amount</p>

                    <div className={styles.inputWrapper}>
                        <p>{ wallet?.currency }</p>

                        <input 
                            ref={amountToDepositField}
                            type="text" 
                            inputMode="decimal" 
                            placeholder="10.00" 
                            value={amountToDeposit}
                            onChange={(e) => handleAmountOnChange(e, "deposit", null, setAmountToDeposit, setFieldValidationTracker, null)}
                            onBlur={() => handleAmountOnBlur(amountToDeposit, setAmountToDeposit)}
                            disabled={isSubmitting}
                        />
                    </div>

                    <p 
                        style={{
                            fontSize: ".7rem",
                            color: "#626262"
                        }}
                    >Minimum Amount: PHP 10.00</p>
                </div>

                <div className={`${styles.field} ${styles.paymentMethod}`}>
                    <p>Select a payment method</p>

                    <div className={styles.paymentMethodsList}>
                        <div 
                            className={styles.paymentMethodsItem}
                            onClick={() => setSelectedPaymentMethod("GCASH")}
                        >
                            <GCashLogo
                                width={1.2}
                                height={1.2}
                            />

                            <p>GCash</p>

                            <div className={styles.outerCircle}>
                                { selectedPaymentMethod == "GCASH" &&
                                    <div className={styles.innerCircle}/>
                                }
                            </div>
                        </div>

                        <div 
                            className={styles.paymentMethodsItem}
                            onClick={() => setSelectedPaymentMethod("PAYMAYA")}
                        >
                            <MayaLogo
                                width={1.5}
                                height={1.5}
                            />

                            <p>Maya</p>

                            <div className={styles.outerCircle}>
                                { selectedPaymentMethod == "PAYMAYA" &&
                                    <div className={styles.innerCircle}/>
                                }
                            </div>
                        </div>
                    </div>
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
                        !fieldValidationTracker.amountToDepositIsValid
                    }
                >
                    { isSubmitting ? 
                    <Loader2 
                        style={{ 
                            height: "1rem",
                            margin: 0,
                            animation: "spin 1s linear infinite",
                            width: "1rem"
                        }}/>
                    : 
                    <>Proceed with payment</>
                    }
                </button>
            
            </div> 

            <ExitOverlayButton 
                onClick={onExit}
            />
        </div>
    );
}