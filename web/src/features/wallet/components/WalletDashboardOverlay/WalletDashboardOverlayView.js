import styles from "./WalletDashboardOverlay.module.css";
import ExitOverlayButton from "../../../../shared/components/ExitOverlayButton/ExitOverlayButton";
import RightArrow from "../../../../shared/assets/vector-assets/RightArrow";
import TransactionItem from "../TransactionItem/TransactionItem";
import { formatBalance } from "../../utils/WalletHelpFunctions";
import buttonStyles from "../../../../shared/styles/ButtonStyles.module.css";
import transactionItemStyles from "../TransactionItem/TransactionItem.module.css";

export default function WalletDashboardOverlay({
    recentTransactions, 
    wallet,
    onExit,
    handleOnClickWalletDeposit,
    handleOnClickWalletWithdrawal,
    handleOnClickViewTransactions, 
}) {

    return (
        <div className={styles.content}>
            
            <div className={`${styles.section} ${styles.walletBalance}`}>
                <div className={styles.details}>
                    <p>Wallet Balance</p>

                    { wallet ?  
                    <p
                        style={{
                            height: "1.5rem",
                            fontSize: "1.25rem"
                        }}
                    >{`${wallet.currency} ${formatBalance(wallet.balance)}`}</p>
                    :
                    <div 
                        className={styles.loading}
                        style={{ 
                            width: "45%", 
                            height: "1.5rem",
                        }}
                    />
                    }
                </div>
                <div className={styles.buttonsContainer}>
                    <p 
                        className={`${buttonStyles.smallButton} ${buttonStyles.green}`}
                        onClick={handleOnClickWalletDeposit}
                    >Deposit to wallet</p>
                    <p 
                        className={`${buttonStyles.smallButton} ${buttonStyles.green}`}
                        onClick={handleOnClickWalletWithdrawal}
                    >Withdraw from wallet</p>
                </div>
            </div>

            <div className={`${styles.section} ${styles.transactionHistory}`}>
                <div className={`${buttonStyles.smallButton} ${buttonStyles.mono} ${buttonStyles.withIcon}`}>
                    <p>Transaction History</p>

                    <RightArrow width={.6} height={.6}/>
                </div>

                <div 
                    style={{
                        borderBottom: "1.5px solid #C3C3C3", 
                        width: "100%"
                    }} 
                />
                
                <div className={styles.transactionsList}>     
                    { recentTransactions ?
                    recentTransactions.map((transaction, i) => (
                    <TransactionItem
                        id={transaction.id}
                        direction={transaction.direction}
                        amount={transaction.amount}
                        activity={transaction.activity}
                        date={transaction.formattedCreatedAt}
                        isLast={i === recentTransactions.length - 1}
                    />
                    ))
                    :
                    Array.from({ length: 3 }).map((_, i, arr) => {
                    const isLast = i === arr.length - 1;

                    return (
                    <div
                    className={transactionItemStyles.transactionItem}
                    style={{
                        borderBottom: isLast ? "none" : "1px solid #C3C3C3"
                    }}
                    >
                        <div className={`${transactionItemStyles.details} ${transactionItemStyles.loading}`} />
                    </div>
                    );
                    })
                    }
                </div>
            </div>
            
            <ExitOverlayButton onClick={onExit}/>
        </div>
    );
}