import styles from "./HomePage.module.css";
import Envelope from "../../../../shared/assets/vector-assets/Envelope";
import LoanOfferContainer from "../../components/LoanOfferGridItem/GridItemContainer";

export default function HomePageView() {

    return (
        <div 
            title="This is the home page"
            className={styles.content}
        >   
            <p className={styles.header}>Discover Offers</p>
            <div className={`${styles.gridContainer}`}>
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
                <LoanOfferContainer />
            </div>
        </div>
    );
}