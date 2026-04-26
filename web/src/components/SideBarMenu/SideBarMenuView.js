import styles from "./SideBarMenu.module.css";
import VaraIcon from "../vector-assets/VaraIcon"
import WalletDashboardOverlay from "../overlays/WalletDashboardOverlay/WalletDashboardOverlay";
import EditProfileOverlay from "../overlays/EditProfileOverlay/EditProfileOverlay";
import WalletDepositOverlay from "../overlays/WalletDepositOverlay/WalletDepositOverlay";
import WalletWithdrawalOverlay from "../overlays/WalletWithdrawalOverlay/WalletWithdrawalOverlay";
import AddPayoutAccountOverlay from "../overlays/AddPayoutAccountOverlay/AddPayoutAccountOverlay";
import ReceiptOverlay from "../overlays/ReceiptOverlay/ReceiptOverlay";
import Modal from "../overlays/Modal";
import AccountOverlayContainer from "../overlays/AccountOverlay/AccountOverlayContainer";
import AnchoredOverlay from "../overlays/AnchoredOverlay";

export default function SideBarMenu({
    sidebar,
    profile,
    user,
    overlays,
    payoutAccounts,
    transaction,
}) {

    return (
        <div className={`${styles.sidebarMenu} ${sidebar.isVisible ? styles.shown : ''}`}>

            <div className={styles.header} style={{
                // border: "1px solid red"
            }}>
                <div className={styles.logo}>
                    <div>
                        <VaraIcon width={1.2} height={1.2}/>
                    </div>

                    <p style={{
                        // border: "1px solid blue",
                        fontSize: "1.25rem",
                        fontWeight: "700"
                    }}>Vara</p>
                </div>
                
                <div className={styles.buttonContainer}>
                    <div className={styles.menuButton} onClick={sidebar.onToggle}>
                        { sidebar.isVisible ? 
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
            
                
            <div className={styles.content}>

                <div className={styles.menuButtons}>

                    <div className={styles.top}>
                        
                        <div className={styles.general}>

                            <button 
                                className={`${styles.menuButton} ${sidebar.menuButton.activeButton === "home" ? styles.menuButtonActive : ""}`}
                                onClick={() => sidebar.menuButton.setTo("home")}
                            >
                                    <p className=""
                                        style={{
                                            padding: "0",
                                        }}>Home</p>
                            </button>
                            
                            <button 
                                className={`${styles.menuButton} ${sidebar.menuButton.activeButton === "my_loans" ? styles.menuButtonActive : ""}`}
                                onClick={() => sidebar.menuButton.setTo("my_loans")}
                            >
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>My Loans</p>
                            </button>
                            
                            <button 
                                className={`${styles.menuButton} ${sidebar.menuButton.activeButton === "loan_reqs" ? styles.menuButtonActive : ""}`}
                                onClick={() => sidebar.menuButton.setTo("loan_reqs")}
                            >
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Loan Requests</p>
                            </button>
                            
                            <button 
                                className={`${styles.menuButton} ${sidebar.menuButton.activeButton === "notifs" ? styles.menuButtonActive : ""}`}
                                onClick={() => sidebar.menuButton.setTo("notifs")}
                            >
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Notifications</p>
                            </button>

                            <button 
                                className={`${styles.menuButton} ${sidebar.menuButton.activeButton === "msgs" ? styles.menuButtonActive : ""}`}
                                onClick={() => sidebar.menuButton.setTo("msgs")}
                            >
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

                        <div className={styles.forLending}>
                            
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

                            <button 
                                className={`${styles.menuButton} ${sidebar.menuButton.activeButton === "offers_made" ? styles.menuButtonActive : ""}`}
                                onClick={() => sidebar.menuButton.setTo("offers_made")}
                            >
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Offers Made</p>
                            </button>

                            <button 
                                className={`${styles.menuButton} ${sidebar.menuButton.activeButton === "issued_loans" ? styles.menuButtonActive : ""}`}
                                onClick={() => sidebar.menuButton.setTo("issued_loans")}
                            >
                                    <p
                                        style={{
                                            padding: "0",
                                        }}>Issued Loans</p>
                            </button>

                        </div>
                        
                    </div>

                    <div className={styles.bottom}>
                        <div 
                            className={styles.profile}
                            ref={profile.buttonRef}
                        >

                                <div className={` ${styles.hitbox} ${profile.isOpen ? styles.hitboxActive : ""} `}
                                    onClick={() => {
                                        profile.setIsOpen(true);
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
                                        }}>{ user.authenticatedUser?.firstName && user.authenticatedUser?.lastName ? `${user.authenticatedUser?.firstName} ${user.authenticatedUser?.lastName}` : "No name available" }</p>

                                </div>

                                <AnchoredOverlay
                                    isOpen={profile.isOpen}
                                    onClose={() => profile.setIsOpen(false)}
                                    profileButtonRef={profile.buttonRef}
                                    overlayLevel={11}
                                >
                                    <AccountOverlayContainer 
                                        setProfileOverlayIsOpen={profile.setIsOpen}
                                        setEditProfileOverlayIsOpen={overlays.editProfile.setIsOpen}
                                        setWalletDashboardOverlayIsOpen={overlays.walletDashboard.setIsOpen}
                                    />
                                </AnchoredOverlay>

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
                                    isOpen={overlays.walletDashboard.isOpen}
                                    onClose={() => overlays.walletDashboard.setIsOpen(false)}
                                    modalLevel={11}
                                >
                                    <WalletDashboardOverlay 
                                        onExit={() => overlays.walletDashboard.setIsOpen(false)}
                                        setSavedPayoutAccounts={payoutAccounts.setSaved}
                                        handleOnClickWalletDeposit={() => overlays.walletDeposit.setIsOpen(true)}
                                        handleOnClickWalletWithdrawal={() => overlays.walletWithdrawal.setIsOpen(true)}
                                        // handleOnClickWalletWithdrawal={() => setReceiptOverlayIsOpen(true)}
                                    />
                                </Modal> 

                                <Modal
                                    isOpen={overlays.walletDeposit.isOpen}
                                    onClose={() => overlays.walletDeposit.setIsOpen(false)}
                                    modalLevel={12}
                                >
                                    <WalletDepositOverlay
                                        onExit={() => overlays.walletDeposit.setIsOpen(false)}
                                    />
                                </Modal>


                                <Modal
                                    isOpen={overlays.walletWithdrawal.isOpen}
                                    onClose={() => {
                                        overlays.walletWithdrawal.setIsOpen(false);
                                        payoutAccounts.setSelected(null);
                                    }}
                                    modalLevel={12}
                                >
                                    <WalletWithdrawalOverlay
                                        onExit={() => {
                                            overlays.walletWithdrawal.setIsOpen(false);
                                            payoutAccounts.setSelected(null);
                                        }}
                                        savedPayoutAccounts={payoutAccounts.saved}
                                        setAddPayoutAccountOverlayIsOpen={overlays.addPayoutAccount.setIsOpen}
                                        setPayoutMethodToAdd={payoutAccounts.setMethodToAdd}
                                        selectedPayoutAccount={payoutAccounts.selected}
                                        setSelectedPayoutAccount={payoutAccounts.setSelected}
                                        setTransaction={transaction.setData}
                                    />
                                </Modal>

                                <Modal
                                    isOpen={overlays.receipt.isOpen}
                                    onClose={() => overlays.receipt.setIsOpen(false)}
                                    modalLevel={13}  
                                >
                                    <ReceiptOverlay 
                                        setTransaction={transaction.setData}
                                        transaction={transaction.data}
                                        onExit={() => overlays.receipt.setIsOpen(false)}
                                    />
                                </Modal>

                                <Modal
                                    isOpen={overlays.addPayoutAccount.isOpen}
                                    onClose={() => overlays.addPayoutAccount.setIsOpen(false)}
                                    modalLevel={13}
                                >
                                    <AddPayoutAccountOverlay
                                        onExit={() => overlays.addPayoutAccount.setIsOpen(false)}
                                        payoutMethodToAdd={payoutAccounts.methodToAdd}
                                        setSavedPayoutAccounts={payoutAccounts.setSaved}
                                        setAddPayoutAccountOverlayIsOpen={overlays.addPayoutAccount.setIsOpen}
                                        setSelectedPayoutAccount={payoutAccounts.setSelected}
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
                    background: "white",
                    border: "1px solid black",
                    padding: ".5rem",
                    fontSize: ".75rem",
                    visibility: "hidden"
                }}
                >
                <div>profileOverlayIsOpen: {String(profile.isOpen)}</div>
                <div>editProfileOverlayIsOpen: {String(overlays.editProfile.isOpen)}</div>
                <div>walletDashboardOverlayIsOpen: {String(overlays.walletDashboard.isOpen)}</div>
            </div>

        </div>
    )
}