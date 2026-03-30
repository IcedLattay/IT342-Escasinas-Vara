

export function onEmailInput(e, setFieldsValidationTracker) {
    if (e.target.value !== "") {
        setFieldsValidationTracker(prev => ({
            ...prev,
            emailIsValid: true
        }));
    } else {
        setFieldsValidationTracker(prev => ({
            ...prev,
            emailIsValid: false
        }));
    }
}

export function onPasswordInput(e, setFieldsValidationTracker) {
    if (e.target.value !== "") {
        setFieldsValidationTracker(prev => ({ ...prev, passwordIsValid: true }));
    } else {
        setFieldsValidationTracker(prev => ({ ...prev, passwordIsValid: false }));
    }
}


export function clearForm({ emailField, passwordField, setErrorMsg, setFieldsValidationTracker }) {
    setErrorMsg("");

    emailField.current.value = "";
    passwordField.current.value = "";
    setFieldsValidationTracker(prev => ({ ...prev, emailIsValid: false, passwordIsValid: false }));
}
