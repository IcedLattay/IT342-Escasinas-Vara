import styles from "./WalletWithdrawalOverlay.module.css"
import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import { formatBalance, handleAmountOnChange, handleAmountOnBlur } from "../../../helper-functions/WalletHelpFunctions";
import { Loader2 } from "lucide-react";
import GCashLogo from "../../vector-assets/GCashLogo";
import MayaLogo from "../../vector-assets/MayaLogo";
import AddIcon from "../../vector-assets/AddIcon";

export default function WalletWithdrawalOverlay({ 
    onExit,
    wallet,
    amountToWithdrawField,
    payoutAccounts,
    supportedPayoutMethods,
    amountToWithdraw,
    setAmountToWithdraw,
    fieldValidationTracker,
    setFieldValidationTracker,
    balanceIsSufficient,
    setBalanceIsSufficient,
    selectedPayoutAccount,
    setselectedPayoutAccount,
    onSubmit,
    isSubmitting,
    handleAddPayoutAccount
}) {

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p
                    style={{
                        fontSize: "1.1rem"
                    }}
                >Withdraw from wallet</p>
            </div>

            <div className={styles.body}>
                <div className={`${styles.field} ${styles.amount}`}>
                    <p>Enter amount</p>

                    <div className={styles.inputWrapper}>
                        <p>{ wallet?.currency }</p>

                        <input 
                            type="text" 
                            inputMode="decimal" 
                            placeholder="0.00"
                            value={amountToWithdraw}
                            onChange={(e) => handleAmountOnChange(e, "withdraw", wallet?.balance, setAmountToWithdraw, setFieldValidationTracker, setBalanceIsSufficient)}
                            onBlur={() => handleAmountOnBlur(amountToWithdraw, setAmountToWithdraw)}
                            disabled={isSubmitting}
                            ref={amountToWithdrawField}
                        />
                    </div>

                    { (!balanceIsSufficient && wallet) && 
                    <p 
                        style={{
                            fontSize: ".7rem",
                            color: "#a51111"
                        }}
                    >Insufficient balance</p>
                    }

                    <p 
                        style={{
                            fontSize: ".7rem",
                            color: "#626262"
                        }}
                    >Wallet Balance: {`${wallet?.currency} ${formatBalance(wallet?.balance)}`}</p>
                </div>

                <div className={`${styles.field} ${styles.payoutAccounts}`}>
                    <p>Select an account to transfer funds into</p>

                    <div className={styles.payoutAccountsList}>
                        { payoutAccounts ?
                        
                        (payoutAccounts.map((account) => (
                            <div
                                key={account.id} 
                                className={styles.payoutAccountsItem}
                                onClick={() => setselectedPayoutAccount(account.id)}
                            >
                                <div className={styles.payoutAccountDetails}>

                                    <div className={styles.payoutAccountIconWrapper}>
                                        { account.payoutMethod === "GCash" ? 
                                        <GCashLogo width={1} height={1}/>
                                        :
                                            ( account.payoutMethod === "Paymaya" &&
                                            <MayaLogo width={1.3} height={1.3}/>
                                            )
                                        }
                                    </div>

                                    <p style={{ fontSize: ".7rem "}}>{account.payoutMethod} {account.number}</p>
                                </div>

                                <div className={styles.outerCircle}>
                                    { account.id === selectedPayoutAccount &&
                                        <div className={styles.innerCircle}/>
                                    }
                                </div>
                            </div>
                        )))
                        :
                        <></>
                        }
                        { supportedPayoutMethods.map((supportedPayout) => (
                            <div 
                                className={styles.payoutAccountsItem}
                                onClick={() => handleAddPayoutAccount(supportedPayout.id)}
                            >
                                <div className={styles.payoutAccountDetails}>
                                    <div 
                                        className={styles.payoutAccountIconWrapper}
                                        style={{
                                            backgroundColor: "#d1d1d1",
                                        }}
                                    >
                                        <AddIcon width={.6} height={.6} />
                                    </div>

                                    <p style={{ fontSize: ".7rem "}}>Add {supportedPayout.payoutMethod}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    className={styles.submitButton}
                    type="submit" 
                    style={{
                        fontSize: ".8rem",
                        fontFamily: "Inter"
                    }}
                    onClick={onSubmit}
                    disabled={
                        isSubmitting ||
                        !fieldValidationTracker.amountToWithdrawIsValid ||
                        !selectedPayoutAccount
                    }
                >
                    { isSubmitting ? 
                    <Loader2 
                        style={{ 
                            height: "1rem",
                            margin: 0,
                            animation: "spin 1s linear infinite",
                            width: "1rem"
                        }}
                    />
                    : 
                    <>Proceed with payout</>
                    }
                </button>
            
            </div> 

            <ExitOverlayButton
                onClick={onExit}
            />

        </div>
    );
}