import ExitOverlayButton from "../../../../shared/components/ExitOverlayButton/ExitOverlayButton";
import Checkmark from "../../../../shared/assets/vector-assets/Checkmark";
import GCashLogo from "../../../../shared/assets/vector-assets/GCashLogo";
import MayaLogo from "../../../../shared/assets/vector-assets/MayaLogo";
import styles from "./ReceiptOverlay.module.css";
import { formatAndMaskPhone } from "../../utils/WalletHelpFunctions";

export default function ReceiptOverlayView({
    receiptData,
    onExit
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

                    { receiptData ? 
                    ( receiptData.fields.map((field, i) => (
                    <div 
                        key={`${field.label}-${i}`}
                        className={`${styles.detail} ${i === receiptData.fields.length - 1 ? styles.last : ""}`}
                    >
                        <p>{field.label}</p>
                        
                        <ReceiptField 
                            field={field}
                        />
                    </div>
                    )) )
                    :
                    Array.from({ length: 4 }).map((_, i) => (
                        <div
                        key={i}
                        className={`${styles.detail} ${styles.loadingDetail}`}
                        />
                    ))
                    }
                    
                </div>
            </div>
            
            <ExitOverlayButton onClick={onExit} />
        </div>
    );
}

function ReceiptField({ field }) {
    switch (field.type) {
        case "payout account":
            return (
                <div className={`${styles.value} ${styles.wrapper}`}>
                    <p>{formatAndMaskPhone(field.value.number)}</p>
                    { field.value.payoutMethod === "GCash" ? 
                        <GCashLogo width={1} height={1} />
                    :
                    ( field.value.payoutMethod === "Paymaya" &&
                        <MayaLogo width={1} height={1} />
                    )
                    }
                </div>
            );

        case "payment method":
            return (
                <div className={`${styles.value} ${styles.wrapper}`}>
                    <p>
                    { field.value === "GCash" ? 
                    "GCash"                    
                    :
                    ( field.value === "Paymaya" &&
                    "Paymaya"
                    )
                    }
                    </p>
                    { field.value === "GCash" ? 
                        <GCashLogo width={1} height={1} />
                    :
                    ( field.value === "Paymaya" &&
                        <MayaLogo width={1} height={1} />
                    )
                    }
                </div>
            );

        default:
            return <p className={styles.value}>{field.value}</p>;
    }
}