import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../security/AuthContext";
import WalletDashboardOverlayView from "./WalletDashboardOverlayView";
import { fetchMyPayoutAccounts, fetchMyRecentTransactions } from "../../../api/WalletService";

export default function WalletDashboardOverlay({ 
    onExit,
    setSavedPayoutAccounts,
    handleOnClickWalletDeposit,
    handleOnClickWalletWithdrawal,
    handleOnClickViewTransactions, 
}) {

    const { wallet, recentTransactions, refreshRecentTransactions } = useContext(AuthContext);
    
    const fetched = useRef(false);

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

        refreshRecentTransactions();
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