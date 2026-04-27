
import "./TransactionItem.css"

export default function TransactionItem({ direction, amount, reason, date, isLast=false }) {
    return (
        <div className="transaction-item"
            style={{
                borderBottom: isLast ? "none" : "1px solid #C3C3C3"
            }}
        >
            <div className="details transaction">

                <div className="payment transaction">
                    <p>{ direction }</p>
                    <p style={{fontSize: "1.1rem", marginTop: ".5rem"}}>{ direction=="Debit" ? "- Php" : "Php" } {amount}</p>
                    <p style={{color: "#616161"}}>{reason}</p>
                </div>
                
                <p style={{ marginLeft: "auto"}}>{date}</p>

            </div>
            
        </div>
    );
}