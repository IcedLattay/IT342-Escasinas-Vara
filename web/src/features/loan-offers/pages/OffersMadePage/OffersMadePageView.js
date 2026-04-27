import styles from "./OffersMadePage.module.css";
import AddIcon from "../../../../shared/assets/vector-assets/AddIcon";
import OffersMadeContainer from "../../components/OfferMadeGridItem/GridItemContainer";

export default function OffersMadePageView() {
    return (
        <div 
            title="This is the loan offers made page"
            className={styles.content}
        >   
            <div className={styles.headerContainer}>
                <p className={styles.text}>Loan Offers Made</p>

                <div className={styles.createOfferButton}>
                    <AddIcon width={.55} height={.55} />
                    
                    <p style={{fontSize: ".9rem"}}>Make a loan offer</p>
                </div>
            </div>

            <div className={`${styles.gridContainer}`}>
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
                <OffersMadeContainer />
            </div>
        </div>
    );
}