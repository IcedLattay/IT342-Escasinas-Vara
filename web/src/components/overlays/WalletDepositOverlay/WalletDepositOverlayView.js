import "./WalletDepositOverlay.css"
import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import MayaLogo from "../../vector-assets/MayaLogo"
import GCashLogo from "../../vector-assets/GCashLogo"
import { Loader2 } from "lucide-react";
import { handleAmountOnChange, handleAmountOnBlur } from "../../../helper-functions/WalletHelpFunctions";

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
        <div className="overlay" id="wallet-deposit">
            

            <div className="overlay-header wallet-deposit">
                <p
                    style={{
                        fontSize: "1.1rem"
                    }}
                >Deposit to wallet</p>
            </div>

            <div className="overlay-body wallet-deposit">
                <div className="field amount wallet-deposit">
                    <p>Enter amount</p>

                    <div className="input-field">
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

                <div className="field payment-method wallet-deposit">
                    <p>Select a payment method</p>

                    <div className="payment-method-items">
                        <div className="payment-method-item"
                            onClick={() => setSelectedPaymentMethod("GCASH")}
                        >
                            <GCashLogo
                                width={1.2}
                                height={1.2}
                            />

                            <p>GCash</p>

                            <div className="outer-circle wallet-deposit">
                                { selectedPaymentMethod == "GCASH" &&
                                    <div className="inner-circle wallet-deposit" />
                                }
                            </div>
                        </div>

                        <div className="payment-method-item"
                            onClick={() => setSelectedPaymentMethod("PAYMAYA")}
                        >
                            <MayaLogo
                                width={1.5}
                                height={1.5}
                            />

                            <p>Maya</p>

                            <div className="outer-circle wallet-deposit">
                                { selectedPaymentMethod == "PAYMAYA" &&
                                    <div className="inner-circle wallet-deposit" />
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    className="submit-button" 
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