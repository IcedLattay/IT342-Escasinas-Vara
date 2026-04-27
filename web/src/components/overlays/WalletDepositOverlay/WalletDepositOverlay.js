import "./WalletDepositOverlay.css"
import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import MayaLogo from "../../vector-assets/MayaLogo"
import GCashLogo from "../../vector-assets/GCashLogo"
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function WalletDepositOverlay({ onExit }) {

    // useStates
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("GCASH")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [fieldValidationTracker, setFieldValidationTracker] = useState({
        amountToDepositIsValid: false
    })
    const [amountToDeposit, setAmountToDeposit] = useState("")



    // helper functions
    function handleAmountToDepositOnChange(e) {

        const val = e.target.value;

        if (/^\d+(\.\d{0,2})?$|^\d*$/.test(val) || val === "") {
            
            const cleaned = val.replace(/^0+(?=\d)/, "");
            setAmountToDeposit(cleaned);
        }

        if (parseFloat(e.target.value) >= 10) {
            setFieldValidationTracker({
                amountToDepositIsValid: true
            })
        } else {
            setFieldValidationTracker({
                amountToDepositIsValid: false
            })
        }
    }

    function handleAmountToDepositOnBlur() {
        if (amountToDeposit === "") return;
        
        const amount = parseFloat(amountToDeposit);

        setAmountToDeposit(amount.toFixed(2));
    }




    // Api calls
    async function handleDeposit(e) {
        setIsSubmitting(true)

        e.preventDefault();

        const walletDepositData = {
            amount: parseFloat(amountToDeposit),
            paymentMethod: selectedPaymentMethod,
        };

        try {
            const res = await axios.post(
                "http://localhost:8080/api/wallet/deposit",
                walletDepositData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )

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
        <div className="overlay" id="wallet-deposit">
            

            <div className="overlay-header wallet-deposit">
                <p
                    style={{
                        fontSize: "1.1rem"
                    }}
                >Deposit your wallet</p>
            </div>

            <div className="overlay-body wallet-deposit">
                <div className="field amount wallet-deposit">
                    <p>Enter amount</p>

                    <div className="input-field">
                        <p>PHP</p>

                        <input input type="text" inputMode="decimal" placeholder="10.00" value={amountToDeposit}
                            onChange={handleAmountToDepositOnChange}
                            onBlur={handleAmountToDepositOnBlur}
                            disabled={isSubmitting}
                        />
                    </div>

                    <p style={{
                        fontSize: ".7rem",
                        color: "#626262"
                    }}>Minimum Amount: PHP 10.00</p>
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

                <button className="submit-button" type="submit" 
                style={{
                    fontSize: ".8rem",
                    fontFamily: "Inter"
                }}
                onClick={handleDeposit}
                disabled={
                    isSubmitting ||
                    !fieldValidationTracker.amountToDepositIsValid
                }>
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