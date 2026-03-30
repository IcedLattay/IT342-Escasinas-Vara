import { useRef, useState, useEffect, useContext } from "react";
import "./LoginPage.css";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../security/AuthContext"
import { Link } from "react-router-dom";
import { onEmailInput, onPasswordInput, clearForm } from "../helper-functions/LoginHelpFunctions";




export default function LoginPage() {

    // useNavigate and useContext
    const navigate = useNavigate();
    const { setUser, setUserIsAuthenticated, authenticatedUser, userIsAuthenticated } = useContext(AuthContext);

    // useStates
    const [errorMsg, setErrorMsg] = useState("");

    const [fieldValidationTracker, setFieldsValidationTracker] = useState({
        emailIsValid: false,
        passwordIsValid: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);



    // useRefs
    const emailField = useRef(null);
    const passwordField = useRef(null);
    


    // useEffects
    useEffect(() => {
        console.log(userIsAuthenticated);
        console.log(authenticatedUser);
    }, []);




    // JSX/Api calls
    async function handleOnSubmit(e) {
        setIsSubmitting(true);

        e.preventDefault();

        const loginFormData = {
            email: emailField.current.value,
            password: passwordField.current.value,
        };

        try {

            console.log("Submitting login form with data:", loginFormData);

            const res = await axios.post(
                "http://localhost:8080/api/auth/login",
                loginFormData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const authenticatedUser = res.data.data.user;

            console.log("Login response:", authenticatedUser);

            setUser(authenticatedUser);
            setUserIsAuthenticated(true);

            navigate("/home");
        } catch (err) {
            clearForm({emailField, passwordField, setErrorMsg, setFieldsValidationTracker});

            const rawError = err.response.data.error?.details; 

            const match = rawError.match(/"(.*)"/);
            const cleanMessage = match ? match[1] : rawError;

            setErrorMsg(cleanMessage);

        } finally {
            setIsSubmitting(false);
        }
    
    }



    function handleGoogleLogin() {
        window.location.href = "http://localhost:8080/api/oauth2/authorization/google";
    }





    return (
        <div className="login-page">

            <div className="login-form-container">

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

                            <p style={{
                                fontSize: "1.2rem",
                                fontWeight: "700",
                                marginBottom: "1.3rem",
                            }}>Login to your account</p>

                            <form className="form" >

                                <div className="input-group">
                                    <p style={{fontSize: ".8rem"}}>Email</p>
                                    <input ref={emailField} type="text" placeholder="Enter your email address"
                                        style={ 
                                            errorMsg !="" ? {boxShadow: "inset 0 0 0 1px #D32F2F"} : {}
                                        }
                                        onChange={(e) => onEmailInput(e, setFieldsValidationTracker)}
                                    />
                                </div> 

                                <div className="input-group" style={{
                                    marginTop: ".5rem"
                                }}>
                                    <p style={{fontSize: ".8rem"}}>Password</p>
                                    <input ref={passwordField} type="password" placeholder="Enter your password"
                                        style={ 
                                            errorMsg !="" ? {boxShadow: "inset 0 0 0 1px #D32F2F"} : {}
                                        }
                                        onChange={(e) => onPasswordInput(e, setFieldsValidationTracker)}
                                    />
                                </div> 

                                <p style={{marginTop: ".5rem"}} className="error-message">{errorMsg}</p>


                                <p style={{ 
                                    marginTop: "0.5rem",
                                    fontFamily: "Inter",
                                    fontSize: ".7em",
                                    fontWeight: "bold",
                                }}>Forgot Password?</p>

                                <button className="submit-button" type="submit" 
                                style={{
                                    fontSize: ".8rem",
                                    fontFamily: "Inter"
                                }}
                                disabled={
                                    isSubmitting ||
                                    !(
                                        fieldValidationTracker.emailIsValid &&
                                        fieldValidationTracker.passwordIsValid
                                    )}
                                onClick={handleOnSubmit}>
                                    { isSubmitting ? 
                                        <Loader2 
                                            style={{ 
                                                height: "1rem",
                                                margin: 0,
                                                animation: "spin 1s linear infinite",
                                                width: "1rem"
                                            }}/>
                                    : 
                                        <>Sign in</>
                                    }
                                </button>

                                <button 
                                    className="continue-with-google" 
                                    type="button"
                                    onClick={handleGoogleLogin}
                                >
                                    <svg width="17" height="17" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
                                    <p style={{ 
                                        fontFamily: "Inter",
                                        fontSize: ".8rem",
                                    }}>Continue with Google</p>
                                </button>

                                <Link to={"/register"}>
                                    <p style={{
                                        marginTop: "1.5rem",
                                        fontSize: ".7rem",
                                        fontWeight: "bold",
                                        fontFamily: "Inter",
                                        width: "100%",
                                        textAlign: "center",
                                    }}>Don't have an account?</p>
                                </Link>
                            </form>


                        </div>
                        
                    </div>


                </div>
            </div>
                

        </div>
    );
}