import "./WalletDashboardOverlay.css"
import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";
import RightArrow from "../../vector-assets/RightArrow";
import TransactionItem from "../../TransactionItem/TransactionItem";

export default function WalletDashboardOverlay({ 
        onExit,
        handleOnClickWalletDeposit,
        handleOnClickWalletWithdrawal,
        handleOnClickViewTransactions, 
    }) {
    return (
        <div className="overlay" id="wallet-dashboard">
            <ExitOverlayButton onClick={onExit}/>
            
            <div className="section wallet-balance">
                <div className="display wallet-balance">
                    <p>Wallet Balance</p>
                    <p
                        style={{
                            fontSize: "1.25rem"
                        }}
                    >PHP 70,500.00</p>
                </div>
                <div className="buttons wallet-balance">
                    <p className="small-button"
                        onClick={handleOnClickWalletDeposit}
                    >Deposit to wallet</p>
                    <p className="small-button">Withdraw from wallet</p>
                </div>
            </div>

            <div className="section transaction-history">
                <div className="small-button more">
                    <p>Transaction History</p>

                    <RightArrow width={.6} height={.6}/>
                </div>

                <div style={{borderBottom: "1.5px solid #C3C3C3", width: "100%"}} />
                
                <div className="list transaction-history">     
                    
                    <TransactionItem
                        direction={"Debit"}
                        amount={"2,000.00"}
                        reason={"Wallet Withdrawal"}
                        date={"Jan 20 2026"}
                    />
                    <TransactionItem
                        direction={"Debit"}
                        amount={"2,000.00"}
                        reason={"Wallet Withdrawal"}
                        date={"Jan 20 2026"}
                    />
                    <TransactionItem
                        direction={"Debit"}
                        amount={"9,620.00"}
                        reason={"Loan Disbursment to Shirley Bugan"}
                        date={"Nov 22 2025"}
                        isLast={true}
                    />
                </div>
            </div>
        </div>
    );
}