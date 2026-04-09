import { useContext } from "react";
import { AuthContext } from "../../../security/AuthContext";
import WalletDashboardOverlayView from "./WalletDashboardOverlayView";

export default function WalletDashboardOverlay({ 
    onExit,
    handleOnClickWalletDeposit,
    handleOnClickWalletWithdrawal,
    handleOnClickViewTransactions, 
}) {

    const transactions = [
        {id: 1, direction: "Debit", amount: "2,000.00", reason: "Wallet Deposit", date: "Jan 20 2026"},
        {id: 2, direction: "Debit", amount: "4,100.00", reason: "Wallet Deposit", date: "Sept 22 2025"},
        {id: 3, direction: "Debit", amount: "1,500.00", reason: "Wallet Deposit", date: "June 2 2025"}
    ]

    const { wallet } = useContext(AuthContext);

    return (
        <WalletDashboardOverlayView 
            transactions={transactions}
            wallet={wallet}
            onExit={onExit}
            handleOnClickWalletDeposit={handleOnClickWalletDeposit}
            handleOnClickWalletWithdrawal={handleOnClickWalletWithdrawal}
            handleOnClickViewTransactions={handleOnClickViewTransactions}
        />
    );
}