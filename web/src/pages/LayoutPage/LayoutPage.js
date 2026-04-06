import SideBarMenu from "../../components/SideBarMenu/SideBarMenu";
import { Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
    return (
        <div className="layout-page">
            <SideBarMenu />
            <div className="layout-page-main">
                <Outlet />
            </div>
        </div>
    );
}