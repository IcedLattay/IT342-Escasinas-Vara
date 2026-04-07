import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import "./ReceiptOverlay.css"
import Checkmark from "../../vector-assets/Checkmark"
import GCashLogo from "../../vector-assets/GCashLogo";

export default function ReceiptOverlay({ 
        receiptData,
        onExit,
    }) {
    
    return (
        <div className="overlay" id="receipt">
            <ExitOverlayButton onClick={onExit} />

            <div className="overlay-header receipt">
                <p
                    style={{
                        fontSize: "1.1rem",
                        // border: "1px solid red"
                    }}
                >Payment Successful</p>

                <div className="checkmark-circle" style={{
                    width: "1.1rem",
                    height: "1.1rem",
                    borderRadius: "10rem",
                    backgroundColor: "#6CAC74",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Checkmark width={.6} height={.6} />
                </div>
            </div>

            <div className="overlay-body receipt">
                <p>Transaction Details</p>

                <div className="details receipt">
                    <div className="detail receipt">
                        <p>Amount</p>
                        <p className="value receipt">PHP 2,000.00</p>
                    </div>
                    <div className="detail receipt">
                        <p>Transaction ID</p>
                        <p className="value receipt">sD-scz0ee11Hxhs</p>
                    </div>
                    <div className="detail receipt">
                        <p>Payment Method</p>

                        <div className="value receipt payment-method">
                            
                            <p>GCash</p>

                            <GCashLogo width={1} height={1} />
                        </div>
                    </div>
                    <div className="detail receipt last">
                        <p>Date of Transaction</p>
                        <p className="value receipt">sD-scz0ee11Hxhs</p>
                    </div>
                </div>
            </div>
        </div>
    );

}