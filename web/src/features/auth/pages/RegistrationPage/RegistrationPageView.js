import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./RegistrationPage.css"



export default function RegisterPageView({
    firstnameField,
    lastnameField,
    emailField,
    passwordField,
    confirmPasswordField,
    errorMsgs,
    passwordRules,
    ruleVisibility,
    fieldValidationTracker,
    isSubmitting,
    onSubmit,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onPasswordFocus,
    onPasswordBlur,
}) {
    return (
        <div className="registration-page">
        
            <div className="registration-form-container">

                <div className="card">  

                    <div className="card-left">

                        <div className="vara">
                            <div className="logo-container">

                                <svg width="25" height="25" viewBox="0 0 329 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M82.25 60.3577H41.125C19.74 60.3577 0 76.5315 0 100.792V343.399C0 364.029 18.4643 383.834 41.125 383.834H164.5V315.904L116.541 208.421C141 212.665 152.031 212.665 164.5 212.665V196.633C101.329 176.851 84.7736 137.538 82.25 60.3577Z" fill="url(#paint0_radial_159_24)"/>
                                <path d="M246.75 60.3578L164.5 315.904V383.834L287.875 383.834C310.536 383.834 329 364.029 329 343.4V100.792C329 76.5316 309.26 60.3578 287.875 60.3578H246.75Z" fill="url(#paint1_radial_159_24)"/>
                                <path d="M82.4917 26.8778C82.4917 41.7219 70.2527 53.7555 55.155 53.7555C40.0573 53.7555 27.8183 41.7219 27.8183 26.8778C27.8183 12.0336 40.0573 0 55.155 0C70.2527 0 82.4917 12.0336 82.4917 26.8778Z" fill="#D4D952"/>
                                <path d="M301.182 26.8778C301.182 41.7219 288.943 53.7555 273.846 53.7555C258.748 53.7555 246.509 41.7219 246.509 26.8778C246.509 12.0336 258.748 0 273.846 0C288.943 0 301.182 12.0336 301.182 26.8778Z" fill="#E3F188"/>
                                <defs>
                                <radialGradient id="paint0_radial_159_24" cx="0" cy="0" r="1" gradientTransform="matrix(-100.714 443.703 -650.406 -50.2363 164.98 60.9882)" gradientUnits="userSpaceOnUse">
                                <stop offset="0.228481" stop-color="#D4D952"/>
                                <stop offset="0.542098" stop-color="#B5BA3E"/>
                                <stop offset="0.770717" stop-color="#8B8F23"/>
                                <stop offset="1" stop-color="#7A7D18"/>
                                </radialGradient>
                                <radialGradient id="paint1_radial_159_24" cx="0" cy="0" r="1" gradientTransform="matrix(71.9388 458.81 406.598 -86.774 236.439 64.9049)" gradientUnits="userSpaceOnUse">
                                <stop offset="0.164251" stop-color="#E3F188"/>
                                <stop offset="0.49692" stop-color="#C8D767"/>
                                <stop offset="0.759359" stop-color="#97A82B"/>
                                <stop offset="1" stop-color="#879918"/>
                                </radialGradient>
                                </defs>
                                </svg>

                            </div>
                            <p style={{
                                fontSize: "1.75rem",
                                fontWeight: "700",
                                color: "#ffffff",
                            }}>Vara</p>
                        </div>

                        <p style={{
                            color: "white",
                            marginTop: "0.5rem",
                        }}>Your reliable peer-to-peer lending platform.</p>

                    </div>

                    <div className="container-content">
                        
                        <div className="content">

                            <p 
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: "700",
                                    marginBottom: "1.3rem",
                            }}
                            >Create an account</p>

                            <form className="form" >

                                <div className="input-group">
                                    <p style={{fontSize: ".8rem"}}>First Name</p>
                                    <input 
                                        ref={firstnameField} type="text" 
                                        placeholder="Enter your first name"
                                        style={ 
                                            errorMsgs.firstname!="" ? {boxShadow: "inset 0 0 0 1px #D32F2F"} : {}
                                        }
                                        onChange={onFirstNameChange}
                                    />
                                </div> 

                                
                                <div 
                                    className="input-group" 
                                    style={{
                                        marginTop: ".5rem"
                                    }}
                                >
                                    <p style={{fontSize: ".8rem"}}>Last Name</p>
                                    <input 
                                        ref={lastnameField} 
                                        type="text" 
                                        placeholder="Enter your last name"
                                        style={ 
                                            errorMsgs.lastname!="" ? {boxShadow: "inset 0 0 0 1px #D32F2F"} : {}
                                        }
                                        onChange={onLastNameChange}
                                    />
                                </div> 

                                <div 
                                    className="input-group"
                                    style={{
                                        marginTop: ".5rem"
                                    }}
                                >
                                    <p style={{fontSize: ".8rem"}}>Email</p>
                                    <input 
                                        ref={emailField} 
                                        type="text" 
                                        placeholder="Enter your email address"
                                        style={ 
                                            errorMsgs.email!="" ? {boxShadow: "inset 0 0 0 1px #D32F2F"} : {}
                                        }
                                        onChange={onEmailChange}
                                    />
                                    { errorMsgs.email && 
                                    <p className="error-message">{errorMsgs.email}</p>
                                    }
                                    
                                </div> 

                                <div   
                                    className="input-group" 
                                    style={{ marginTop: ".5rem" }}
                                >
                                    <p style={{ fontSize: ".8rem" }}>Password</p>
                                    <input
                                        ref={passwordField}
                                        style={ 
                                            errorMsgs.password!="" ? {boxShadow: "inset 0 0 0 1px #D32F2F"} : {}
                                        }
                                        type="password"
                                        placeholder="Enter your password"
                                        onFocus={onPasswordFocus}
                                        onBlur={onPasswordBlur}
                                        onChange={onPasswordChange}
                                    />
                                    
                                    <div className="password">
                                        <p className={"error-message " + (errorMsgs.password && !ruleVisibility.passwordRules ? "visible" : "")}>
                                            {errorMsgs.password}
                                        </p>

                                        <div className={"rules" + (ruleVisibility.passwordRules ? " visible" : "")}>
                                            <p className="rule" style={{ color: passwordRules.lengthIsValid === null ? "#9ca3af" : passwordRules.lengthIsValid ? "black" : "#D32F2F" }}>
                                                <span className={ "check " + (passwordRules.lengthIsValid ? "show" : "")}>✓</span> 
                                                <span>At least 8 characters</span>
                                            </p>
                                            <p className="rule" style={{ color: passwordRules.hasUpperLower === null ? "#9ca3af" : passwordRules.hasUpperLower ? "black" : "#D32F2F" }}>
                                                <span className={ "check " + (passwordRules.hasUpperLower ? "show" : "")}>✓</span> 
                                                <span>Uppercase and lowercase letter</span>
                                            </p>
                                            <p className="rule" style={{ color: passwordRules.hasNumber === null ? "#9ca3af" : passwordRules.hasNumber ? "black" : "#D32F2F" }}>
                                                <span className={ "check " + (passwordRules.hasNumber ? "show" : "")}>✓</span> 
                                                <span>Contains a number</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div 
                                    className="input-group" 
                                    style={{
                                        marginTop: ".5rem"
                                    }}
                                >
                                    <p style={{fontSize: ".8rem"}}>Confirm Password</p>
                                    <input 
                                        ref={confirmPasswordField} 
                                        type="password" 
                                        placeholder="Confirm your password"
                                        style={ 
                                            errorMsgs.confirmPassword!="" ? {boxShadow: "inset 0 0 0 1px #D32F2F"} : {}
                                        }
                                        onChange={onConfirmPasswordChange}
                                    />
                                    {errorMsgs.confirmPassword && (
                                    <p className="error-message">{errorMsgs.confirmPassword}</p>
                                    )}
                                </div>

                                <button 
                                    className="submit-button" 
                                    type="submit" 
                                    style={{
                                        fontSize: ".8rem",
                                        fontFamily: "Inter"
                                    }}
                                    disabled={
                                        isSubmitting ||
                                        !(fieldValidationTracker.firstnameIsValid &&
                                                fieldValidationTracker.lastnameIsValid &&
                                                fieldValidationTracker.emailIsValid &&
                                                fieldValidationTracker.passwordIsValid && 
                                                fieldValidationTracker.confirmPasswordIsValid
                                    )}
                                    onClick={onSubmit}
                                >

                                    { isSubmitting ? 
                                    <Loader2 
                                        style={{ 
                                            height: "1rem",
                                            margin: 0,
                                            animation: "spin 1s linear infinite",
                                            width: "1rem"
                                        }}/>
                                    : 
                                    <>Create account</>
                                    }
                                </button>
    
                                <Link to={"/login"}>
                                    <p 
                                        style={{
                                            marginTop: "1.5rem",
                                            fontSize: ".7rem",
                                            fontWeight: "bold",
                                            fontFamily: "Inter",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >Already have an account?</p>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}