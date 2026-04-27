import { createPortal } from "react-dom";

export default function AnchoredOverlay({
    isOpen,
    onClose,
    children,
    profileButtonRef,
    overlayLevel = 1
}) {
    if (!isOpen) return null;

    const rect = profileButtonRef.current.getBoundingClientRect();

    const panelStyle = {
        left: rect.left,
        bottom: window.innerHeight - rect.top + 4,
    };

    return createPortal(
        <>
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "#ffffff43",
                    zIndex: (overlayLevel * 2) - 1
                }}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />

            <div
                style={{
                    position: "fixed",
                    background: "#fff",
                    boxShadow: "0.2rem 0 0.75rem rgba(0, 0, 0, 0.1)",
                    border: "1px solid #cfcfcf",
                    zIndex: overlayLevel * 2,
                    borderRadius: `1rem`,
                    overflow: "hidden",
                    ...panelStyle
                }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </>,
        document.body
    );
}