import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../security/AuthContext";


export default function HomePage() {

    
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
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page! This page is protected and can only be accessed by authenticated users.</p>
            
            <button
                onClick={() => {
                    handleLogout();
                }}
            >
                Click here to logout
            </button>
        </div>

    );
}