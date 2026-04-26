import SideBarMenuContainer from "../../components/SideBarMenu/SideBarMenuContainer";
import { Outlet } from "react-router-dom";
import styles from "./LayoutPage.module.css";
import { useState } from "react";
import HeaderContainer from "../../components/Header/HeaderContainer";

export default function Layout() {

    const [walletDashboardOverlayIsOpen, setWalletDashboardOverlayIsOpen] = useState(false);

    return (
        <div className={styles.content}>
            <SideBarMenuContainer
                walletDashboardOverlayIsOpen={walletDashboardOverlayIsOpen}
                setWalletDashboardOverlayIsOpen={setWalletDashboardOverlayIsOpen}
            />
            <div className={styles.dynamicContent}>
                <HeaderContainer 
                    setWalletDashboardOverlayIsOpen={setWalletDashboardOverlayIsOpen}
                />
                <Outlet />
            </div>
        </div>
    );
}