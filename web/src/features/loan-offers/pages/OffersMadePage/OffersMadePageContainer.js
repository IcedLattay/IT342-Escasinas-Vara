import { useState } from "react";
import OffersMadePageView from "./OffersMadePageView";

export default function OffersMadePageContainer() {

    const [loanOffersMade, setLoanOffersMade] = useState({});
    


    
    
    return (
        <OffersMadePageView />
    );
}