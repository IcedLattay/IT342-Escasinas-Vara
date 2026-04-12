import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../security/AuthContext";
import WalletDashboardOverlayView from "./WalletDashboardOverlayView";
import { fetchMyPayoutAccounts } from "../../../api/WalletService";

export default function WalletDashboardOverlay({ 
    onExit,
    setSavedPayoutAccounts,
    handleOnClickWalletDeposit,
    handleOnClickWalletWithdrawal,
    handleOnClickViewTransactions, 
}) {

    const { wallet } = useContext(AuthContext);

    const transactions = [
        {id: 1, direction: "Debit", amount: "2,000.00", reason: "Wallet Deposit", date: "Jan 20 2026"},
        {id: 2, direction: "Debit", amount: "4,100.00", reason: "Wallet Deposit", date: "Sept 22 2025"},
        {id: 3, direction: "Debit", amount: "1,500.00", reason: "Wallet Deposit", date: "June 2 2025"}
    ]
    
    const fetched = useRef(false);

    // useStates
    const [recentTransactions, setRecentTransactions] = useState(null);

    // useEffects
    useEffect(() => {
        if (fetched.current) return;

        console.log("hi");

        fetched.current = true;

        async function fetchMyPayoutAccountsOnMount() {
            try {
                
                const res = await fetchMyPayoutAccounts();

                const retrievedPayoutAccounts = res.data.data.payoutAccounts;

                console.log("Retrieved payout accounts:", retrievedPayoutAccounts);

                setSavedPayoutAccounts(retrievedPayoutAccounts);
            } catch (err) {

            }
        }

        async function fetchMyRecentTransactionsOnMount() {
            try {
                const res = await fetchMyRecentTransactionsOnMount();

                const retrievedRecentTransactions = res.data.data.recentTransactions;

                console.log("Retrieved recent transactions:", retrievedRecentTransactions);

                setRecentTransactions(retrievedRecentTransactions);
            } catch (err) {
                console.log("Something went wrong.", err);
            }
        }

        fetchMyRecentTransactionsOnMount();
        fetchMyPayoutAccountsOnMount();
    }, []);

    return (
        <WalletDashboardOverlayView 
            recentTransactions={recentTransactions}
            wallet={wallet}
            onExit={onExit}
            handleOnClickWalletDeposit={handleOnClickWalletDeposit}
            handleOnClickWalletWithdrawal={handleOnClickWalletWithdrawal}
            handleOnClickViewTransactions={handleOnClickViewTransactions}
        />
    );
}