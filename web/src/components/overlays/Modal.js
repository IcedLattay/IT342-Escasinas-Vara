import { createPortal } from "react-dom";

export default function Modal({
    isOpen,
    onClose,
    modalLevel=1,
    children,
    borderRadius=1
}) {
    if (!isOpen) return null;

    return createPortal(
        <>
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "#4d4d4d33",
                    zIndex: (modalLevel * 2) - 1
                }}
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />

            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#fff",
                    boxShadow: "0.2rem 0 0.75rem rgba(0, 0, 0, 0.1)",
                    border: "1px solid #cfcfcf",
                    zIndex: modalLevel * 2,
                    borderRadius: `${borderRadius}rem`,
                }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </>,
        document.body
    );
}