import { createContext, useState, useEffect, use } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    
    // useStates
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);



    // useEffects
    useEffect(() => {

        async function fetchUser() {
            setIsLoading(true);
            try {
                const res = await axios.get(
                    "http://localhost:8080/api/users/me", 
                    { 
                        withCredentials: true,
                    });

                const userData = res.data.data.user;
                setUser(userData);
                setUserIsAuthenticated(true);

                const walletRes = await axios.get(
                    "http://localhost:8080/api/wallet/me",
                    {
                        withCredentials: true,
                    });

                const walletData = walletRes.data.data.wallet;

                console.log("Wallet data", walletData);

                setWallet(walletData);
            } catch (err) {
                setUserIsAuthenticated(false);
                setUser(null)
                setWallet(null)
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
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
            isLoading, setIsLoading }}>
        {children}
        </AuthContext.Provider>
    );
}
