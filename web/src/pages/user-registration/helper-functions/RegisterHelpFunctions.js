



//helper functions

export function onEmailInput({ emailField, setErrorMsgs, setFieldsValidationTracker }) {
    if (emailField.current.value=="") {
        setErrorMsgs(prev => ({
            ...prev,
            email: "",
        }))
        setFieldsValidationTracker(prev => ({
            ...prev,
            emailIsValid: false,
        }))
    } else {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.current.value)) {
            setErrorMsgs(prev => ({
                ...prev,
                email: "Invalid email address.",
            }))
            setFieldsValidationTracker(prev => ({
                ...prev,
                emailIsValid: false,
            }))
        } else {
            setErrorMsgs(prev => ({
                ...prev,
                email: "",
            }))
            setFieldsValidationTracker(prev => ({
                ...prev,
                emailIsValid: true,
            }))
        }
    }
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