import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import "./ReceiptOverlay.css"
import Checkmark from "../../vector-assets/Checkmark"
import MayaLogo  from "../../vector-assets/MayaLogo";
import GCashLogo from "../../vector-assets/GCashLogo";
import { formatBalance } from "../../../helper-functions/WalletHelpFunctions";
import { useContext } from "react";
import { AuthContext } from "../../../security/AuthContext";

export default function ReceiptOverlay({ 
        receiptData,
        onExit,
    }) {

    const { wallet } = useContext(AuthContext);
    
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

                        { receiptData ? 
                        <p className="value receipt">{`${wallet.currency} ${formatBalance(receiptData.amount)}`} </p>
                        :
                        <div className="value receipt" style={{ width: "25%", backgroundColor: "#dddddd" }}/>
                         }
                    </div>
                    <div className="detail receipt">
                        <p>Transaction ID</p>

                        { receiptData ? 
                        <p className="value receipt"> {receiptData.externalReferenceId} </p>
                        :
                        <div className="value receipt" style={{ width: "50%", backgroundColor: "#dddddd" }}/>
                         }
                        
                    </div>
                    <div className="detail receipt">
                        <p>Payment Method</p>

                        
                        { receiptData ?
                        <div className="value receipt payment-method">
                            
                            <p>{ receiptData.paymentMethod }</p>

                            { receiptData.paymentMethod == "GCash" ? 
                            <GCashLogo width={1} height={1} />
                            :
                                ( receiptData.paymentMethod == "Paymaya" &&
                                    <MayaLogo width={1} height={1} />
                                )
                            } 
                            
                        </div>
                        :
                        <div className="value receipt" style={{ width: "40%", backgroundColor: "#dddddd" }}/>
                        }
                    </div>
                    <div className="detail receipt last">
                        <p>Date of Transaction</p>

                        { receiptData ? 
                        <p className="value receipt"> {receiptData.createdAt} </p>
                        :
                        <div className="value receipt" style={{ width: "35%", backgroundColor: "#dddddd" }}/>
                         }
                    </div>
                </div>
            </div>
        </div>
    );

}