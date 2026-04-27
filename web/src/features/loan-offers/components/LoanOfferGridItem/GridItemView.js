import sharedStyles from "../../../../shared/components/GridItem/GridItem.module.css";
import styles from "./GridItem.module.css";

export default function GridItemView({
    loanTerm="24 months",
    loanAmount="50k",
    loanerName="Cecilia Rezorta"
}) {
    return (
        <div className={`${sharedStyles.content} ${styles.content}`}>
            <div className={sharedStyles.background}/>

            <div className={sharedStyles.envelope}>
                <div 
                    style={{
                        height: "100%",
                        position: "relative"
                    }}
                >
                    <svg height="100%" viewBox="0 0 3497 3099" fill="none" xmlns="http://w3.org" style={{ overflow: 'visible' }}>
                        <g style={{ filter: "drop-shadow(0px 40px 50px rgba(0, 0, 0, 0.25))" }}>
                            <path 
                            d="M1750.42 0H142.268C81.6115 -1.1709e-05 41.5084 23.5 13.4362 82.5C-12.9658 138 7.43219 215.668 63.5777 248L1686.75 1195C1710.19 1208.5 1733.37 1213.5 1750.42 1213.5C1767.42 1213.5 1790.54 1208.5 1813.92 1195L3432.92 248C3488.92 215.668 3509.26 138 3482.93 82.5C3454.93 23.5 3414.93 -1.1709e-05 3354.43 0H1750.42Z" 
                            fill="#ECE9DD"
                            />
                            <path 
                            d="M1753 1242.5C1770 1242.5 1793.12 1237.5 1816.51 1224L3496.79 241.611L3496.79 2969.5C3496.79 3050 3433.59 3098.5 3366.59 3098.5L1748.39 3098.5L130.202 3098.5C63.2019 3098.5 0 3050 0 2969.5L0.000732422 241.61L1680.29 1224C1703.67 1237.5 1726.79 1242.5 1743.79 1242.5L1748.4 1242.5L1753 1242.5Z" 
                            fill="#ECE9DD"
                            />
                        </g>
                    </svg>

                    <p 
                        style={{
                            position: "absolute",
                            top: "55%",
                            left: "50%",
                            translate: "-50% -50%",
                            fontSize: "1.9rem"
                        }}
                    >{loanAmount}</p>

                    <p 
                        style={{ 
                            position: "absolute", 
                            bottom: "10%", 
                            left: "50%", 
                            translate: "-50% 0", 
                            fontSize: "1rem",
                            whiteSpace: "nowrap", /* Prevents text from wrapping if the container is small */
                            margin: 0 
                        }}
                    >
                    for {loanTerm}
                    </p>
                </div>
            </div>

            <div className={sharedStyles.details}>
                <div className={styles.loaner}>
                    <p style={{ marginRight: ".5rem" }}>offer by</p>
                    <div className={styles.loanerProfile}>
                        <img
                            className={styles.loanerPfp}
                            src=""
                        />
                        <p>{loanerName}</p>
                    </div>
                </div>

                <div className={styles.interestRates}>
                    <p style={{ marginBottom: ".5rem"}}>Interest Rates</p>

                    <div className={styles.irOptions}>
                        <p className={styles.option}>
                            Monthly %
                        </p>
                        <p className={styles.option}>
                            Quarterly %
                        </p>
                        <p className={styles.option}>
                            Annually
                        </p>
                    </div>

                </div>
            </div>

            
        </div>
    );
}