import { useContext, useState, useEffect, useRef } from "react";
import "./SideBarMenu.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../security/AuthContext";
import VaraIcon from "../vector-assets/VaraIcon"
import OverlayBackdrop from "../OverlayBackdrop/OverlayBackdrop";
import WalletDashboardOverlay from "../overlays/WalletDashboardOverlay/WalletDashboardOverlay";
import EditProfileOverlay from "../overlays/EditProfileOverlay/EditProfileOverlay";
import WalletDepositOverlay from "../overlays/WalletDepositOverlay/WalletDepositOverlay";
import WalletWithdrawalOverlay from "../overlays/WalletWithdrawalOverlay/WalletWithdrawalOverlay";
import AddPayoutAccountOverlay from "../overlays/AddPayoutAccountOverlay/AddPayoutAccountOverlay";
import ReceiptOverlay from "../overlays/ReceiptOverlay/ReceiptOverlay";
import Modal from "../overlays/Modal";

export default function SideBarMenu() {
    
    // useNavigate and useContext
    const navigate = useNavigate();
    const { setUser, setUserIsAuthenticated, authenticatedUser } = useContext(AuthContext);
    const location = useLocation();



    // useStates
    const [receiptData, setReceiptData] = useState(null) 
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [profileOverlayIsOpen, setProfileOverlayIsOpen] = useState(false);
    const [editProfileIsHovered, setEditProfileIsHovered] = useState(false);
    const [editProfileOverlayIsOpen, setEditProfileOverlayIsOpen] = useState(false);
    const [walletDashboardOverlayIsOpen, setWalletDashboardOverlayIsOpen] = useState(false);
    const [savedPayoutAccounts, setSavedPayoutAccounts] = useState([]);
    const [walletDepositOverlayIsOpen, setWalletDepositOverlayIsOpen] = useState(false);
    const [walletWithdrawalOverlayIsOpen, setWalletWithdrawalOverlayIsOpen] = useState(false);
    const [selectedPayoutAccount, setSelectedPayoutAccount] = useState(null);
    const [addPayoutAccountOverlayIsOpen, setAddPayoutAccountOverlayIsOpen] = useState(false);
    const [payoutMethodToAdd, setPayoutMethodToAdd] = useState(null);
    const [receiptOverlayIsOpen, setReceiptOverlayIsOpen] = useState(true);
    const [transaction, setTransaction] = useState(null);

    // useRefs
    const fetched = useRef(false);

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
        if (fetched.current) return;

        console.log("Transaction data:", receiptData);

        if (transaction) {

            fetched.current = true;
            
            switch (transaction.type) {
                case "Deposit":
                    setSidebarVisible(true);
                    setWalletDashboardOverlayIsOpen(true);
                    setReceiptOverlayIsOpen(true);

                    break;
                case "Withdrawal":
                    setWalletWithdrawalOverlayIsOpen(false);
                    setReceiptOverlayIsOpen(true);

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
        <div className={`sidebar-menu ${sidebarVisible ? 'shown' : ''}`}>

            <div className="header" style={{
                // border: "1px solid red"
            }}>
                <div id="sidebar-vara">
                    <div>
                        <VaraIcon width={1.2} height={1.2}/>
                    </div>

                    <p style={{
                        // border: "1px solid blue",
                        fontSize: "1.25rem",
                        fontWeight: "700"
                    }}>Vara</p>
                </div>
                
                <div className="sidebar-menu-button-container">
                    <div className="sidebar-menu-button" onClick={onSideBarClick}>
                        { sidebarVisible ? 
                        <svg style={{ width: "1.25rem", height: "1.25rem" }} viewBox="0 0 2600 2512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1781.37 0.00390625C2185.11 1.28236 2512 328.966 2512 733V1779L2512 1781.37C2510.72 2184.32 2184.32 2510.72 1781.37 2512L1779 2512H733C328.966 2512 1.28236 2185.11 0.00390625 1781.37L0 1779V733C4.64121e-06 328.175 328.175 4.63896e-06 733 0H1779L1781.37 0.00390625ZM733 169C421.511 169 169 421.511 169 733V1779C169 2090.49 421.511 2343 733 2343H1779C2090.49 2343 2343 2090.49 2343 1779V733C2343 421.511 2090.49 169 1779 169H733ZM882 2342H713V171H882V2342ZM1636.66 865.5C1659.07 865.5 1680.56 874.403 1696.41 890.249C1712.25 906.096 1721.16 927.589 1721.16 950C1721.16 972.411 1712.25 993.903 1696.41 1009.75L1450.5 1255.66C1522.28 1327.44 1594.06 1399.22 1665.84 1471L1696.41 1501.56C1712.25 1517.41 1721.16 1538.9 1721.16 1561.31C1721.16 1583.72 1712.25 1605.22 1696.41 1621.06C1680.56 1636.91 1659.07 1645.81 1636.66 1645.81C1614.25 1645.81 1592.75 1636.91 1576.91 1621.06L1546.34 1590.5C1454.64 1498.8 1362.95 1407.1 1271.25 1315.41C1237.45 1281.61 1237.45 1229.71 1271.25 1195.91L1576.91 890.249C1592.75 874.402 1614.25 865.5 1636.66 865.5Z" 
                            fill="black"/>
                        </svg>
                        :
                        <svg style={{ width: "1.25rem", height: "1.25rem" }} viewBox="0 0 2600 2512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1781.37 0.00390625C2185.11 1.28236 2512 328.966 2512 733V1779L2512 1781.37C2510.72 2184.32 2184.32 2510.72 1781.37 2512L1779 2512H733C328.966 2512 1.28236 2185.11 0.00390625 1781.37L0 1779V733C4.64121e-06 328.175 328.175 4.63896e-06 733 0H1779L1781.37 0.00390625ZM733 169C421.511 169 169 421.511 169 733V1779C169 2090.49 421.511 2343 733 2343H1779C2090.49 2343 2343 2090.49 2343 1779V733C2343 421.511 2090.49 169 1779 169H733ZM882 2342H713V171H882V2342ZM1332.66 865.5C1355.07 865.5 1376.56 874.402 1392.41 890.249L1422.97 920.815L1698.06 1195.91C1731.86 1229.71 1731.86 1281.61 1698.06 1315.41L1392.41 1621.06C1376.56 1636.91 1355.07 1645.81 1332.66 1645.81C1310.24 1645.81 1288.75 1636.91 1272.91 1621.06C1257.06 1605.22 1248.16 1583.72 1248.16 1561.31C1248.16 1538.9 1257.06 1517.41 1272.91 1501.56L1518.81 1255.66C1447.03 1183.88 1375.25 1112.1 1303.47 1040.32L1272.91 1009.75C1257.06 993.903 1248.16 972.411 1248.16 950C1248.16 927.589 1257.06 906.096 1272.91 890.249C1288.75 874.403 1310.25 865.5 1332.66 865.5Z" 
                            fill="black"/>
                        </svg>
                        }
                    </div> 
                </div>
            </div>
            
                
            <div className="sidebar-menu-content">

                <div className="menu-buttons">

                    <div className="top">
                        
                        <div className="general">

                            <button className="menu-button">
                                    <p className=""
                                        style={{
                                            padding: "0",
                                        }}>Home</p>
                            </button>
                            
                            <button className="menu-button">
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>My Loans</p>
                            </button>
                            
                            <button className="menu-button">
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Loan Requests</p>
                            </button>
                            
                            <button className="menu-button">
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Notifications</p>
                            </button>

                            <button className="menu-button">
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Messages</p>
                            </button>

                        </div>

                        <div
                            style={{
                                borderBottom: "1px solid #C3C3C3",
                                margin: ".75rem 0"
                            }}
                        />

                        <div className="for-lending">
                            
                            <p
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: ".7rem",
                                    // border: "1px solid red",
                                    paddingLeft: "1rem",
                                    color: "#868686",
                                    height: "1.5rem",
                                }}
                            >For Lending</p>

                            <button className="menu-button">
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Offers Made</p>
                            </button>

                            <button className="menu-button">
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Issued Loans</p>
                            </button>

                        </div>
                        
                    </div>

                    <div className="bottom">
                        <div id="profile">

                                <div id="hitbox" className={ profileOverlayIsOpen ? "active" : "" }
                                    onClick={() => {
                                        setProfileOverlayIsOpen(true);
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "100rem",
                                            overflow: "hidden"
                                        }}>
                                        <img src="https://i.pinimg.com/736x/a4/2a/57/a42a571ae6268294ff6931e6b41d06cf.jpg" 
                                            style={{
                                                objectFit: "cover",
                                                width: "1.2rem",
                                                height: "1.2rem",
                                            }}
                                        />
                                    </div>
                                    
                                    <p
                                        style={{
                                            // border: "1px solid red",
                                            overflow: "hidden",
                                        }}>{ authenticatedUser?.firstName && authenticatedUser?.lastName ? `${authenticatedUser?.firstName} ${authenticatedUser?.lastName}` : "No name available" }</p>

                                </div>
                                
                                { profileOverlayIsOpen &&

                                    <>
                                        <OverlayBackdrop 
                                            background={"#ffffff43"}
                                            onClick={() => {
                                                setProfileOverlayIsOpen(false)
                                            }}
                                        />

                                        <div className="overlay profile-overlay">
                                            <div id="top">

                                                <div id="edit-profile"
                                                    style={{
                                                        position: "relative",
                                                        cursor: "pointer",
                                                    }}
                                                    onMouseEnter={ () => setEditProfileIsHovered(true) }
                                                    onMouseLeave={ () => setEditProfileIsHovered(false) }
                                                    onClick={ () => {
                                                        setProfileOverlayIsOpen(false);
                                                        setEditProfileOverlayIsOpen(true);
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: "100rem",
                                                            overflow: "hidden",
                                                        }}
                                                    >

                                                        <img 
                                                            src="https://i.pinimg.com/736x/a4/2a/57/a42a571ae6268294ff6931e6b41d06cf.jpg"
                                                            style={{
                                                                objectFit: "cover",
                                                                width: "2.5rem",
                                                                height: "2.5rem",
                                                            }}
                                                        />

                                                    </div>

                                                    <div id="icon">

                                                        <svg width=".55rem" height=".55rem" viewBox="0 0 2767 2767" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1880.98 502.542L1107.02 1276.51C1050.41 1333.11 984.719 1551.85 914.136 1761.5C893.718 1822.15 907.497 1861.79 924.269 1878.56C941.041 1895.33 980.677 1909.11 1041.32 1888.69C1250.98 1818.11 1469.71 1752.42 1526.32 1695.81L2300.29 921.846M1880.98 502.542L2101.47 282.058C2202.8 180.726 2306.23 194.703 2382.05 270.527L2532.3 420.778C2608.13 496.602 2622.1 600.03 2520.77 701.362L2300.29 921.846M1880.98 502.542L2300.29 921.846M1140.56 1242.96L1559.86 1662.27" stroke="black" stroke-width="169"/>
                                                            <path d="M963.671 449.789H572.301C319.787 449.788 175 609.895 175 861.42L175 2232.21C175 2484.72 335.106 2629.51 586.631 2629.51L2082.44 2630C2334.95 2630 2479.74 2469.89 2479.74 2218.37V1850.22" stroke="black" stroke-width="169" stroke-linecap="round"/>
                                                        </svg>

                                                    </div>

                                                </div>

                                                <p
                                                    style={{
                                                        padding: "0",
                                                        marginTop: ".5rem"
                                                    }}
                                                >
                                                    
                                                    { authenticatedUser?.firstName && authenticatedUser?.lastName ? `${authenticatedUser?.firstName} ${authenticatedUser?.lastName}` : "No name available" }
                                                </p>

                                                <p
                                                    style={{
                                                        padding: "0",
                                                        marginTop: ".2rem",
                                                        fontSize: ".6rem",
                                                        color: "#999999"
                                                    }}
                                                >
                                                    { editProfileIsHovered ? "Edit Profile" : (authenticatedUser?.email || "No email available") }
                                                    
                                                </p>

                                                
                                            </div>

                                            <div id="middle">
                                                <button className="button"
                                                    onClick={() => {
                                                        setProfileOverlayIsOpen(false)
                                                        setWalletDashboardOverlayIsOpen(true)
                                                    }}
                                                >
                                                    Manage Wallet
                                                </button>
                                                
                                                <button className="button">
                                                    Privacy Policy
                                                </button>
                                                
                                                <button className="button">
                                                    Settings
                                                </button>
                                            </div>

                                            <div id="bottom">
                                                <button className="button" id="logout-button">
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                }   

                                {/* { (editProfileOverlayIsOpen || walletDashboardOverlayIsOpen) && 
                                    <OverlayBackdrop 
                                        background={"#4d4d4d33"}
                                        onClick={() => {
                                            setEditProfileOverlayIsOpen(false)
                                            setWalletDashboardOverlayIsOpen(false)
                                        }} 
                                    />
                                }

                                { editProfileOverlayIsOpen &&
                                            
                                    <EditProfileOverlay 
                                        onExit={() => setEditProfileOverlayIsOpen(false)}
                                        authenticatedUser={authenticatedUser}
                                    />

                                } */}


                                <Modal
                                    isOpen={walletDashboardOverlayIsOpen}
                                    onClose={() => setWalletDashboardOverlayIsOpen(false)}
                                    modalLevel={1}
                                >
                                    <WalletDashboardOverlay 
                                        onExit={() => setWalletDashboardOverlayIsOpen(false)}
                                        setSavedPayoutAccounts={setSavedPayoutAccounts}
                                        handleOnClickWalletDeposit={() => setWalletDepositOverlayIsOpen(true)}
                                        handleOnClickWalletWithdrawal={() => setWalletWithdrawalOverlayIsOpen(true)}
                                        // handleOnClickWalletWithdrawal={() => setReceiptOverlayIsOpen(true)}
                                    />
                                </Modal> 

                                <Modal
                                    isOpen={walletDepositOverlayIsOpen}
                                    onClose={() => setWalletDepositOverlayIsOpen(false)}
                                    modalLevel={2}
                                >
                                    <WalletDepositOverlay
                                        onExit={() => setWalletDepositOverlayIsOpen(false)}
                                    />
                                </Modal>


                                <Modal
                                    isOpen={walletWithdrawalOverlayIsOpen}
                                    onClose={() => setWalletWithdrawalOverlayIsOpen(false)}
                                    modalLevel={2}
                                >
                                    <WalletWithdrawalOverlay
                                        onExit={() => setWalletWithdrawalOverlayIsOpen(false)}
                                        savedPayoutAccounts={savedPayoutAccounts}
                                        setAddPayoutAccountOverlayIsOpen={setAddPayoutAccountOverlayIsOpen}
                                        setPayoutMethodToAdd={setPayoutMethodToAdd}
                                        selectedPayoutAccount={selectedPayoutAccount}
                                        setSelectedPayoutAccount={setSelectedPayoutAccount}
                                        setTransaction={setTransaction}
                                    />
                                </Modal>

                                <Modal
                                    isOpen={receiptOverlayIsOpen}
                                    onClose={() => setReceiptOverlayIsOpen(false)}
                                    modalLevel={3}  
                                >
                                    <ReceiptOverlay 
                                        setTransaction={setTransaction}
                                        transaction={transaction}
                                        onExit={() => setReceiptOverlayIsOpen(false)}
                                    />
                                </Modal>

                                <Modal
                                    isOpen={addPayoutAccountOverlayIsOpen}
                                    onClose={() => setAddPayoutAccountOverlayIsOpen(false)}
                                    modalLevel={3}
                                >
                                    <AddPayoutAccountOverlay
                                        onExit={() => setAddPayoutAccountOverlayIsOpen(false)}
                                        payoutMethodToAdd={payoutMethodToAdd}
                                        setSavedPayoutAccounts={setSavedPayoutAccounts}
                                        setAddPayoutAccountOverlayIsOpen={setAddPayoutAccountOverlayIsOpen}
                                        setSelectedPayoutAccount={setSelectedPayoutAccount}
                                    />
                                </Modal>
                                    
                        </div>
                    </div>

                    

                        
                </div>


            </div>


            {/* DEBUGGING AREA */}

            <div
                style={{
                    position: "fixed",
                    top: "1rem",
                    right: "1rem",
                    zIndex: 99999,
                    background: "white",
                    border: "1px solid black",
                    padding: ".5rem",
                    fontSize: ".75rem",
                    visibility: "hidden"
                }}
                >
                <div>profileOverlayIsOpen: {String(profileOverlayIsOpen)}</div>
                <div>editProfileOverlayIsOpen: {String(editProfileOverlayIsOpen)}</div>
                <div>walletDashboardOverlayIsOpen: {String(walletDashboardOverlayIsOpen)}</div>
            </div>

        </div>
    )
}