
import styles from "./TransactionItem.module.css"

export default function TransactionItem({ 
    onClick,
    transactionId,
    direction, 
    amount, 
    reason, 
    date, 
    isLast=false,
}) {
    return (
        <div 
            key={transactionId}
            className={styles.transactionItem}
            style={{
                borderBottom: isLast ? "none" : "1px solid #C3C3C3"
            }}
        >
            <div className={styles.details}>

                <div className={styles.payment}>
                    <p>{ direction }</p>
                    <p 
                        style={{
                            fontSize: "1.1rem", 
                            marginTop: ".5rem"
                        }}
                    >{ direction=="Debit" ? "- Php" : "Php" } {amount}</p>
                    <p style={{color: "#616161"}}>{reason}</p>
                </div>
                
                <p style={{ marginLeft: "auto"}}>{date}</p>

            </div>
            
        </div>
    );
}