import "./ExitOverlayButton.css";

export default function ExitOverlayButton({ onClick }) {
    return (
        
        <div className="exit-overlay-button"
            onClick={onClick}
        >
            <svg width=".75rem" height=".75rem" viewBox="0 0 1176 1176" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M84.5 1091.5L588 588M1091.5 84.5L588 588M588 588L84.5 84.5M588 588L1091.5 1091.5" stroke="black" stroke-width="169" stroke-linecap="round"/>
            </svg>

        </div>
    );
}