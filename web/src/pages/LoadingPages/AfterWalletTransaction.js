import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AfterWalletTransaction() {

    const navigate = useNavigate();
    
    useEffect(() => {
        const externalReferenceId = sessionStorage.getItem("externalReferenceId");

        if (!externalReferenceId) {
            navigate("/");
            return;
        }

        let cancelled = false;
        let attempts = 0;
        const maxAttempts = 20;

        async function checkStatus() {
            if (cancelled) return;

            try {
                console.log("HELLO1")
                console.log("externalReferenceId:", externalReferenceId);

                const res = await axios.get(
                    "http://localhost:8080/api/wallet/transaction",
                    {
                        params: { externalReferenceId },
                        withCredentials: true,
                    }
                );

                console.log("HELLO2")

                const walletTransaction = res.data.data.walletTransaction;

                console.log("STATUS:", walletTransaction?.status);
                console.log("ATTEMPT:", attempts);

                if (walletTransaction.status === "Success") {
                    sessionStorage.setItem(
                        "receiptData",
                        JSON.stringify(walletTransaction)
                    );
                    navigate("/home");
                    return;
                }

                attempts += 1;

                if (attempts >= maxAttempts) {
                    navigate("/");
                    return;
                }

                setTimeout(checkStatus, 2000);
            } catch (err) {
                console.error(
                    "Failed to verify deposit:",
                    err.response?.status,
                    err.response?.data,
                    err
                );

                attempts += 1;

                if (attempts >= maxAttempts) {
                    navigate("/");
                    return;
                }

                // setTimeout(checkStatus, 2000);
            }
        }

        checkStatus();

        return () => {
            cancelled = true;
        };
    }, [navigate]);

    

    return (
        <div className="after-wallet-transaction-page"
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#ffffff"
            }}
        >
            
        </div>
    );
}