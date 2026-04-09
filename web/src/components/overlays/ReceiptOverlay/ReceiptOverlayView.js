import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import Checkmark from "../../vector-assets/Checkmark";
import GCashLogo from "../../vector-assets/GCashLogo";
import MayaLogo from "../../vector-assets/MayaLogo";
import styles from "./ReceiptOverlay.module.css";
import { formatBalance } from "../../../helper-functions/WalletHelpFunctions";


export default function ReceiptOverlayView({
    receiptData,
    onExit,
    wallet
}) {

    return (
        <div className={styles.content}>

            <div className={styles.header}>
                <p
                    style={{
                        fontSize: "1.1rem",
                        // border: "1px solid red"
                    }}
                >Payment Successful</p>

                <div 
                    name="checkmark-circle" 
                    style={{
                        width: "1.1rem",
                        height: "1.1rem",
                        borderRadius: "10rem",
                        backgroundColor: "#6CAC74",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Checkmark width={.6} height={.6} />
                </div>
            </div>

            <div className={styles.body}>
                <p>Transaction Details</p>

                <div className={styles.details}>
                    <div className={styles.detail}>
                        <p>Amount</p>

                        { receiptData ? 
                        <p className={styles.value}>{`${wallet.currency} ${formatBalance(receiptData.amount)}`} </p>
                        :
                        <div 
                            className={`${styles.value} ${styles.loading}`}
                            style={{ 
                                width: "25%"
                            }}
                        />
                        }
                    </div>
                    <div className={styles.detail}>
                        <p>Transaction ID</p>

                        { receiptData ? 
                        <p className={styles.value}> {receiptData.externalReferenceId} </p>
                        :
                        <div 
                            className={`${styles.value} ${styles.loading}`}
                            style={{ 
                                width: "50%"
                            }}
                        />
                        }
                        
                    </div>
                    <div className={styles.detail}>
                        <p>Payment Method</p>
                        
                        { receiptData ?
                        <div className={`${styles.value} ${styles.paymentMethod}`}>
                            
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
                        <div 
                            className={`${styles.value} ${styles.loading}`}
                            style={{ 
                                width: "40%"
                            }}
                        />
                        }
                    </div>
                    <div className={`${styles.detail} ${styles.last}`}>
                        <p>Date of Transaction</p>

                        { receiptData ? 
                        <p className={styles.value} > {receiptData.createdAt} </p>
                        :
                        <div
                            className={`${styles.value} ${styles.loading}`}
                            style={{
                                width: "50%",
                            }}
                        />
                        }
                    </div>
                </div>
            </div>
            
            <ExitOverlayButton onClick={onExit} />
        </div>
    );
}