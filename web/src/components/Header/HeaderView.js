import styles from "./Header.module.css";
import Wallet from "./../vector-assets/Wallet";

export default function HeaderView({ wallet }) {
    return (
        <div className={styles.content}>
            <div className={styles.wallet}>
                <Wallet width={1} height={1} />
                <p className={styles.amountText} style={{ fontSize: ".9rem" }}>{ wallet ? `${wallet.currency} ${wallet.balance}` : "PHP 50,000.00" }</p>
            </div>
        </div>
    );
}