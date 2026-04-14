import styles from "./AccountOverlay.module.css";



export default function AccountOverlayView({
    authenticatedUser,
    editProfileIsHovered,
    setEditProfileIsHovered,
    setProfileOverlayIsOpen,
    setEditProfileOverlayIsOpen,
    setWalletDashboardOverlayIsOpen
}) {
    return (
        <div className={styles.content}>
            <div className={styles.top}>
                <div className={styles.editProfileButton}
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

                    <div className={styles.icon}>

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

            <div className={styles.middle} >
                <button className={styles.buttonBase}
                    onClick={() => {
                        setProfileOverlayIsOpen(false)
                        setWalletDashboardOverlayIsOpen(true)
                    }}
                >
                    Manage Wallet
                </button>
                
                <button className={styles.buttonBase}>
                    Privacy Policy
                </button>
                
                <button className={styles.buttonBase}>
                    Settings
                </button>
            </div>

            <div className={styles.bottom}>
                <button className={styles.logoutButton}>
                    Logout
                </button>
            </div>
        </div>
    );
}