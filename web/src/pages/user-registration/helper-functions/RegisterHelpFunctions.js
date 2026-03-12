

import axios from 'axios';


//helper functions


let debounceTimer;

export function onEmailInput({ emailField, setErrorMsgs, setFieldsValidationTracker }) {

    const email = emailField.current.value;

    async function validateEmailUniqueness() {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/validate/email-uniqueness",
                { email : email },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            console.log("Email is unique")

            setErrorMsgs(prev => ({
                ...prev,
                email: ""
            }));
            setFieldsValidationTracker(prev => ({
                ...prev,
                emailIsValid: true,
            }))
        } catch (err) {

            console.log(err)

            const rawError = err.response.data.error?.details; 

            const match = rawError.match(/"(.*)"/);
            const cleanMessage = match ? match[1] : rawError;


            setErrorMsgs(prev => ({
                ...prev,
                email: cleanMessage
            }));
            setFieldsValidationTracker(prev => ({
                ...prev,
                emailIsValid: false,
            }))
        }
    
    }

    if (email=="") {
        setErrorMsgs(prev => ({
            ...prev,
            email: "",
        }))
        setFieldsValidationTracker(prev => ({
            ...prev,
            emailIsValid: false,
        }))

        return;
    } 
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMsgs(prev => ({
            ...prev,
            email: "Invalid email address.",
        }))
        setFieldsValidationTracker(prev => ({
            ...prev,
            emailIsValid: false,
        }))

        return;
    } 
    
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        validateEmailUniqueness(email);
    }, 300);

}

export function onPasswordInput({ passwordField, setErrorMsgs, setFieldsValidationTracker, setPasswordRules }) {
    const password = passwordField.current.value;

    let rules;

    if (password.length === 0) {
        rules = {
            lengthIsValid: null,
            hasUpperLower: null,
            hasNumber: null
        };
    } else {
        rules = {
            lengthIsValid: password.length >= 8,
            hasUpperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
            hasNumber: /\d/.test(password)
        };
    }

    setPasswordRules(rules);

    const allRulesMet =
        rules.lengthIsValid &&
        rules.hasUpperLower &&
        rules.hasNumber;

    if (password === "" || allRulesMet) {
        setErrorMsgs(prev => ({
            ...prev,
            password: "",
        }));
    } else {
        setErrorMsgs(prev => ({
            ...prev,
            password: "Input is invalid.",
        }));
    }

    setFieldsValidationTracker(prev => ({
        ...prev,
        passwordIsValid: allRulesMet
    }));
}

export function onConfirmPasswordInput({ confirmPasswordField, passwordField, setErrorMsgs, setFieldsValidationTracker }) {
    if (confirmPasswordField.current.value=="") {
        setErrorMsgs(prev => ({
            ...prev,
            confirmPassword: "",
        }))
        setFieldsValidationTracker(prev => ({
            ...prev,
            confirmPasswordIsValid: false,
        }))
        return;
    }

    if (passwordField.current.value=="") {
        setErrorMsgs(prev => ({
            ...prev,
            confirmPassword: "Please set a password first.",
        }))
        setFieldsValidationTracker(prev => ({
            ...prev,
            confirmPasswordIsValid: false,
        }))
        return;
    }

    if (confirmPasswordField.current.value !== passwordField.current.value) {
        setErrorMsgs(prev => ({
            ...prev,
            confirmPassword: "Passwords do not match.",
        }))
        setFieldsValidationTracker(prev => ({
            ...prev,
            confirmPasswordIsValid: false,
        }))
    } else {
        setErrorMsgs(prev => ({
            ...prev,
            confirmPassword: "",
        }))
        setFieldsValidationTracker(prev => ({
            ...prev,
            confirmPasswordIsValid: true,
        }))
    }
}

export function clearForm({ fields, setErrorMsgs, setFieldsValidationTracker }) {
    setErrorMsgs(prev => ({
        ...prev,
        email: "",
        password: "",
        confirmPassword: "",
    }));

    fields.forEach(field => {
        field.current.value = "";
    });

    setFieldsValidationTracker(prev => ({ ...prev, emailIsValid: false, passwordIsValid: false }));
}