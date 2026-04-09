import "./WalletWithdrawalOverlay.css"
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
        <div className="overlay" id="wallet-withdrawal">
            <div className="overlay-header wallet-withdrawal">
                <p
                    style={{
                        fontSize: "1.1rem"
                    }}
                >Withdraw from wallet</p>
            </div>

            <div className="overlay-body wallet-withdrawal">
                <div className="field amount wallet-withdrawal">
                    <p>Enter amount</p>

                    <div className="input-field">
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
                    <p style={{
                        fontSize: ".7rem",
                        color: "#a51111"
                    }}>Insufficient balance</p>
                    }

                    <p style={{
                        fontSize: ".7rem",
                        color: "#626262"
                    }}>Wallet Balance: {`${wallet?.currency} ${formatBalance(wallet?.balance)}`}</p>
                </div>

                <div className="field account wallet-withdrawal">
                    <p>Select an account to transfer funds into</p>

                    <div className="payout-accounts">
                        { payoutAccounts ?
                        
                        (payoutAccounts.map((account) => (
                            <div
                                key={account.id} 
                                className="payout-account"
                                onClick={() => setselectedPayoutAccount(account.id)}
                            >
                                <div className="details">

                                    <div className="icon-container">
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

                                <div className="outer-circle wallet-withdrawal">
                                    { account.id === selectedPayoutAccount &&
                                        <div className="inner-circle wallet-withdrawal" />
                                    }
                                </div>
                            </div>
                        )))
                        :
                        <></>
                        }
                        { supportedPayoutMethods.map((supportedPayout) => (
                            <div 
                                className="payout-account"
                                onClick={() => handleAddPayoutAccount(supportedPayout.id)}
                            >
                                <div className="details">
                                    <div 
                                        className="icon-container"
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
                    className="submit-button"
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