import { useLocation, useNavigate } from "react-router-dom";
import SideBarMenuView from "./SideBarMenuView";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../security/AuthContext";


export default function SideBarMenuContainer({
    walletDashboardOverlayIsOpen, 
    setWalletDashboardOverlayIsOpen
}) {

    // useNavigate and useContext
    const navigate = useNavigate();
    const { setUser, setUserIsAuthenticated, authenticatedUser } = useContext(AuthContext);
    const location = useLocation();



    // useStates
    const [activeMenuButton, setActiveMenuButton] = useState("home");
    const [receiptData, setReceiptData] = useState(null) 
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [profileOverlayIsOpen, setProfileOverlayIsOpen] = useState(false);
    const [editProfileOverlayIsOpen, setEditProfileOverlayIsOpen] = useState(false);
    const [savedPayoutAccounts, setSavedPayoutAccounts] = useState([]);
    const [walletDepositOverlayIsOpen, setWalletDepositOverlayIsOpen] = useState(false);
    const [walletWithdrawalOverlayIsOpen, setWalletWithdrawalOverlayIsOpen] = useState(false);
    const [selectedPayoutAccount, setSelectedPayoutAccount] = useState(null);
    const [addPayoutAccountOverlayIsOpen, setAddPayoutAccountOverlayIsOpen] = useState(false);
    const [payoutMethodToAdd, setPayoutMethodToAdd] = useState(null);
    const [receiptOverlayIsOpen, setReceiptOverlayIsOpen] = useState(false);
    const [transaction, setTransaction] = useState(null);

    // useRefs
    const profileButtonRef = useRef(null);

    // useEffects
    useEffect(() => {
        const receiptData = location.state?.receiptData;

        if (receiptData) {
            setReceiptData(receiptData);
            setSidebarVisible(true);
            setWalletDashboardOverlayIsOpen(true);
            setReceiptOverlayIsOpen(true);

            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {

        console.log("Transaction data:", receiptData);

        if (transaction) {
            
            switch (transaction.type) {
                case "Deposit":
                    setSidebarVisible(true);
                    setWalletDashboardOverlayIsOpen(true);
                    setReceiptOverlayIsOpen(true);

                    break;
                case "Withdrawal":
                    setWalletWithdrawalOverlayIsOpen(false);
                    setReceiptOverlayIsOpen(true);
                    setSelectedPayoutAccount(null);

                    break;
                default:
                    break;
            }
        }
    }, [transaction]);


    useEffect(() => {
        if (!receiptOverlayIsOpen) {
            setTransaction(null);
        }
    }, [receiptOverlayIsOpen])



    // helper functions
    function onSideBarClick() {
        setSidebarVisible(!sidebarVisible);
    }

    function goTo(pageKey, path) {
        setActiveMenuButton(pageKey);
        navigate(path);
    }




    // JSX/Api calls
    async function logout() {
        try {
            
            const token = localStorage.getItem("token")
            
            const response = await fetch("http://localhost:8080/logout", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.ok) {
                console.log("Logout successful");

                localStorage.removeItem("token");

                setUser(null);
                setUserIsAuthenticated(null);

                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }

    }

    return (
        <SideBarMenuView
            sidebar={{
                menuButton: {
                    activeButton: activeMenuButton,
                    goTo
                },
                isVisible: sidebarVisible,
                onToggle: onSideBarClick,
            }}
            profile={{
                buttonRef: profileButtonRef,
                isOpen: profileOverlayIsOpen,
                setIsOpen: setProfileOverlayIsOpen,
            }}
            user={{
                authenticatedUser,
            }}
            overlays={{
                editProfile: {
                    isOpen: editProfileOverlayIsOpen,
                    setIsOpen: setEditProfileOverlayIsOpen
                },
                walletDashboard: {
                    isOpen: walletDashboardOverlayIsOpen,
                    setIsOpen: setWalletDashboardOverlayIsOpen,
                },
                walletDeposit: {
                    isOpen: walletDepositOverlayIsOpen,
                    setIsOpen: setWalletDepositOverlayIsOpen,
                },
                walletWithdrawal: {
                    isOpen: walletWithdrawalOverlayIsOpen,
                    setIsOpen: setWalletWithdrawalOverlayIsOpen,
                },
                addPayoutAccount: {
                    isOpen: addPayoutAccountOverlayIsOpen,
                    setIsOpen: setAddPayoutAccountOverlayIsOpen,
                },
                receipt: {
                    isOpen: receiptOverlayIsOpen,
                    setIsOpen: setReceiptOverlayIsOpen,
                },
            }}
            payoutAccounts={{
                saved: savedPayoutAccounts,
                setSaved: setSavedPayoutAccounts,
                selected: selectedPayoutAccount,
                setSelected: setSelectedPayoutAccount,
                methodToAdd: payoutMethodToAdd,
                setMethodToAdd: setPayoutMethodToAdd,
            }}
            transaction={{
                data: transaction,
                setData: setTransaction,
            }}
        />
    );
    
}