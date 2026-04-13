import { createContext, useState, useEffect } from "react";
import { fetchMyWallet, fetchMyRecentTransactions } from "../api/WalletService";
import { fetchCurrentUser } from "../api/UserService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    
    // useStates
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [recentTransactions, setRecentTransactions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function refreshUserData() {
        setIsLoading(true);
        try {
            const res = await fetchCurrentUser();

            const data = res.data.data.user;
            
            setUser(data);
            setUserIsAuthenticated(true);
        } catch (err) {
            setUserIsAuthenticated(false);
            setUser(null)
        } finally {
            setIsLoading(false);
        }
    }

    async function refreshWalletData() {
        try {
            const res = await fetchMyWallet();

            const data = res.data.data.wallet;

            setWallet(data);
        } catch (err) {
            setWallet(null);
        }
    }

    async function refreshRecentTransactions() {
        try {
            const res = await fetchMyRecentTransactions();
            
            const data = res.data.data.recentTransactions;

            setRecentTransactions(data);
        } catch (err) {
            setRecentTransactions(null);
        }
    }

    // useEffects
    useEffect(() => {
        refreshUserData();
        refreshWalletData();
        refreshRecentTransactions();
    }, []);

    useEffect(() => {
        console.log("Auth Status changed:", userIsAuthenticated);
        console.log("User Data changed:", user);
    }, [userIsAuthenticated, user]);

    return (
        <AuthContext.Provider value={{ 
            userIsAuthenticated, setUserIsAuthenticated, 
            user, setUser, 
            wallet, setWallet,
            recentTransactions, setRecentTransactions,
            isLoading, setIsLoading, 
            refreshWalletData, refreshRecentTransactions
        }}>
        {children}
        </AuthContext.Provider>
    );
}
