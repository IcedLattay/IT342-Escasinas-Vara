import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../security/AuthContext";
import { onFirstNameInput, onLastNameInput, onEmailInput, onPasswordInput, onConfirmPasswordInput, clearForm } from "../../utils/RegisterHelpFunctions";
import { registerUser } from "../../api/AuthService";
import { fetchMyWallet } from "../../../wallet/api/WalletService";
import RegistrationPageView from "./RegistrationPageView";



export default function RegisterPageContainer() {

    // useNavigate and useContext
    const navigate = useNavigate();
    const { setUser, setUserIsAuthenticated, setWallet } = useContext(AuthContext);

    // useStates
    const [errorMsgs, setErrorMsgs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [ruleVisibility, setRuleVisibility] = useState({
        passwordRules: false
    });
    const [passwordRules, setPasswordRules] = useState({
        lengthIsValid: null,
        hasUpperLower: null,
        hasNumber: null
    });
    const [fieldValidationTracker, setFieldsValidationTracker] = useState({
        firstnameIsValid: false,
        lastnameIsValid: false,
        emailIsValid: false,
        passwordIsValid: false,
        confirmPasswordIsValid: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    //useRefs
    const firstnameField = useRef(null);
    const lastnameField = useRef(null);
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const confirmPasswordField = useRef(null);

    // JSX/Api calls
    async function handleOnSubmit(e) {
        setIsSubmitting(true);
        
        e.preventDefault();

        const registerFormData = {
            lastname: lastnameField.current.value,
            firstname: firstnameField.current.value,
            email: emailField.current.value,
            password: passwordField.current.value,
        };

        try {
            const res = await registerUser(registerFormData);

            const authenticatedUser = res.data.data.user;

            console.log("Register response:", authenticatedUser);

            setUser(authenticatedUser);
            setUserIsAuthenticated(true);

            const walletRes = await fetchMyWallet();

            const walletData = walletRes.data.data.wallet;
            setWallet(walletData);

            navigate("/home");
        } catch (err) {
            const fields = [
                firstnameField,
                lastnameField,
                emailField,
                passwordField,
                confirmPasswordField
            ];
            
            clearForm({fields, setErrorMsgs, setFieldsValidationTracker});

            const rawError = err.response?.data?.error?.details || "Registration failed."; 

            const match = rawError.match(/"(.*)"/);
            const cleanMessage = match ? match[1] : rawError;

            setErrorMsgs(prev => ({
                ...prev,
                email: cleanMessage
            }));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <RegistrationPageView
            firstnameField={firstnameField}
            lastnameField={lastnameField}
            emailField={emailField}
            passwordField={passwordField}
            confirmPasswordField={confirmPasswordField}
            errorMsgs={errorMsgs}
            passwordRules={passwordRules}
            ruleVisibility={ruleVisibility}
            fieldValidationTracker={fieldValidationTracker}
            isSubmitting={isSubmitting}
            onSubmit={handleOnSubmit}
            onFirstNameChange={(e) =>
                onFirstNameInput(e.target.value, setFieldsValidationTracker, setErrorMsgs)
            }
            onLastNameChange={(e) =>
                onLastNameInput(e.target.value, setFieldsValidationTracker, setErrorMsgs)
            }
            onEmailChange={(e) =>
                onEmailInput(e.target.value, setFieldsValidationTracker, setErrorMsgs)
            }
            onPasswordChange={(e) =>
                onPasswordInput(
                    e.target.value,
                    confirmPasswordField.current?.value || "",
                    setFieldsValidationTracker,
                    setPasswordRules,
                    setErrorMsgs
                )
            }
            onConfirmPasswordChange={(e) =>
                onConfirmPasswordInput(
                e.target.value,
                passwordField.current?.value || "",
                setFieldsValidationTracker,
                setErrorMsgs
                )
            }
            onPasswordFocus={() =>
                setRuleVisibility((prev) => ({ ...prev, passwordRules: true }))
            }
            onPasswordBlur={(e) => {
                setRuleVisibility((prev) => ({ ...prev, passwordRules: false }));
                onConfirmPasswordInput(
                    confirmPasswordField.current?.value || "",
                    e.target.value,
                    setFieldsValidationTracker,
                    setErrorMsgs
                );
            }}
        />
    );
}