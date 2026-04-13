import SideBarMenu from "../../components/SideBarMenu/SideBarMenu";
import { Outlet } from "react-router-dom";
import styles from "./LayoutPage.module.css";
import HeaderContainer from "../../components/Header/HeaderContainer";

export default function Layout() {
    return (
        <div className={styles.content}>
            <SideBarMenu />
            <div className={styles.dynamicContent}>
                <HeaderContainer />
                <Outlet />
            </div>
        </div>
    );
}