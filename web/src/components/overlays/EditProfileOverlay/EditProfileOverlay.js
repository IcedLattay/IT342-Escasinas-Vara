import "./EditProfileOverlay.css"
import ExitOverlayButton from "../../ExitOverlayButton/ExitOverlayButton";

export default function EditProfileOverlay({ onExit, authenticatedUser }) {
    return (
        <div className="overlay" id="edit-profile">
            <ExitOverlayButton onClick={onExit}/>
                                                    
                <div style={{
                    // border: "1px solid red",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: ".5rem",
                }}>
                    <div style={{
                        overflow: "hidden",
                        borderRadius: "100rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <img src="https://i.pinimg.com/736x/a4/2a/57/a42a571ae6268294ff6931e6b41d06cf.jpg"
                            style={{
                                objectFit: "cover",
                                width: "7rem",
                                height: "7rem",
                            }}
                        />
                    </div>

                    <p id="change-photo-button">Edit</p>
                </div>

                <div style={{
                    width: "23rem",
                    // border: "1px solid red",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                }}>

                    <div className="edit-section">
                        
                        <p className="header-label">Name</p>

                        <p>{ authenticatedUser?.firstName && authenticatedUser?.lastName ? `${authenticatedUser?.firstName} ${authenticatedUser?.lastName}` : "No name available" }</p>

                        <p className="edit-button">Change name</p>

                    </div>

                    <div className="edit-section">

                        <p className="header-label">Email</p>

                        <p>{ authenticatedUser?.email || "No email available" }</p>

                        <p className="edit-button">Change email</p>

                    </div>

                    <div style={{
                        margin: ".5rem 0",
                        borderBottom: "1px solid #C3C3C3",
                    }}/>

                    <div className="edit-section">

                        <p className="header-label">Language</p>

                        <p>English</p>

                        <p className="edit-button">Change language</p>

                    </div>

                </div>
        </div>
    );
}