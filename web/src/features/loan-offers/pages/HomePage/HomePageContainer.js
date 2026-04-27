import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../security/AuthContext";
import Modal from "../../../../shared/components/overlays/Modal";
import HomePageView from "./HomePageView";


export default function HomePageContainer() {

    const { setUser, setUserIsAuthenticated } = useContext(AuthContext);

    async function handleLogout() {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/logout", 
                {}, 
                { 
                    withCredentials: true 
                }
            );

            setUserIsAuthenticated(false);
            setUser(null);

        } catch (err) {
            console.error("Logout failed:", err);
        }
    }

    return (
        <HomePageView />
    );
}