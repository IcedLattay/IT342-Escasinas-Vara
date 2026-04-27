import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../security/AuthContext";
import LoginPageView from "./LoginPageView";
import { onEmailInput, onPasswordInput, clearForm } from "../../utils/LoginHelpFunctions";
import { login } from "../../api/AuthService";
import { fetchMyWallet } from "../../../wallet/api/WalletService";



export default function LoginPageContainer() {
    
    // useNavigate and useContext
    const navigate = useNavigate();
    const { setUser, setUserIsAuthenticated, setWallet } = useContext(AuthContext);

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

    // JSX/Api calls
    async function handleOnSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        const loginFormData = {
            email: emailField.current.value,
            password: passwordField.current.value,
        };

        try {
            const res = await login(loginFormData);

            const authenticatedUser = res.data.data.user;
            setUser(authenticatedUser);
            setUserIsAuthenticated(true);

            const walletRes = await fetchMyWallet();

            setWallet(walletRes.data.data.wallet);
            navigate("/home");
        } catch (err) {
            clearForm({ emailField, passwordField, setErrorMsg, setFieldsValidationTracker });

            const rawError = err.response?.data?.error?.details || "Login failed.";
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
        <LoginPageView
            emailField={emailField}
            passwordField={passwordField}
            errorMsg={errorMsg}
            isSubmitting={isSubmitting}
            fieldValidationTracker={fieldValidationTracker}
            onEmailChange={(e) => onEmailInput(e, setFieldsValidationTracker)}
            onPasswordChange={(e) => onPasswordInput(e, setFieldsValidationTracker)}
            onSubmit={handleOnSubmit}
            onGoogleLogin={handleGoogleLogin}
        />
    );
}