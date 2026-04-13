import { useContext } from "react";
import { AuthContext } from "../../security/AuthContext";
import HeaderView from "./HeaderView";



export default function HeaderContainer() {
    
    const { wallet } = useContext(AuthContext);

    return (
        <HeaderView 
            wallet={wallet}
        />
    );
}