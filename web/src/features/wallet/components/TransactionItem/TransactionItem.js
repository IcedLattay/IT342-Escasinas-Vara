
import { useContext } from "react";
import styles from "./TransactionItem.module.css"
import { AuthContext } from "../../../../security/AuthContext";

export default function TransactionItem({ 
    onClick,
    id,
    category,
    amount, 
    activity, 
    date, 
    isLast=false,
}) {

    const { wallet } = useContext(AuthContext);

    const direction = {
        Withdrawal: `Debit`,
        Deposit: `Credit`,
        Disbursement: `Debit`,
        Payment: `Debit`
    }[activity];

    const value = {
        Debit: `- ${wallet.currency} ${amount}`,
        Credit: `+ ${wallet.currency} ${amount}`
    }[direction];

    const activityDescription = {
        Withdrawal: "Wallet Withdrawal",
        Deposit: "Wallet Deposit",
        Disbursement: "basta naa ni",
        Payment: "basta naa sd ni"
    }[activity];

    return (
        <div 
            key={`${id}-${category}`}
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
                            marginTop: ".5rem",
                            color: direction === "Debit" ? "#870404" : "#226103"
                        }}
                    >{value}</p>
                    <p style={{color: "#616161"}}>{activityDescription}</p>
                </div>
                
                <p style={{ marginLeft: "auto"}}>{date}</p>

            </div>
            
        </div>
    );
}