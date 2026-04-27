import { useContext, useState } from "react";
import AccountOverlayView from "./AccountOverlayView";
import { AuthContext } from "../../../../security/AuthContext";


export default function AccountOverlayContainer({
    setProfileOverlayIsOpen,
    setEditProfileOverlayIsOpen,
    setWalletDashboardOverlayIsOpen
}) {

    const { authenticatedUser } = useContext(AuthContext);

    // useStates
    const [editProfileIsHovered, setEditProfileIsHovered] = useState(false);

    return (
        <AccountOverlayView 
            authenticatedUser={authenticatedUser}
            editProfileIsHovered={editProfileIsHovered}
            setEditProfileIsHovered={setEditProfileIsHovered}
            setProfileOverlayIsOpen={setProfileOverlayIsOpen}
            setEditProfileOverlayIsOpen={setEditProfileOverlayIsOpen}
            setWalletDashboardOverlayIsOpen={setWalletDashboardOverlayIsOpen}
        />
    );
}