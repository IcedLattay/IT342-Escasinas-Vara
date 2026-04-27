import styles from "./Header.module.css";
import Wallet from "../../assets/vector-assets/Wallet";

export default function HeaderView({ 
    wallet,
    setWalletDashboardOverlayIsOpen
}) {
    return (
        <div 
            className={styles.content}
            title="This is the header"
        >
            <div 
                className={styles.wallet}
                onClick={() => setWalletDashboardOverlayIsOpen(true)}
            >
                <Wallet width={1} height={1} />
                <p className={styles.amountText} style={{ fontSize: ".9rem" }}>{ wallet ? `${wallet.currency} ${wallet.balance}` : "PHP 50,000.00" }</p>
            </div>
        </div>
    );
}