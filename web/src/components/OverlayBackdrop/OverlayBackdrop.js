

export default function OverlayBackdrop({ background, onClick, zIndex=1 }) {
    return (
        <div className="overlay-backdrop" style={{
            position: "fixed",
            inset: "0",
            zIndex: `${zIndex}`,
            background: `${background}`
        }}
            onClick={ onClick }
        />
    );
}