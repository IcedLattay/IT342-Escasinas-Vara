

export const loginValidationStrategies = {
    email: (value) => value.trim() !== "",
    password: (value) => value.trim() !== "",
};

export function onEmailInput(e, setFieldsValidationTracker) {
    setFieldsValidationTracker(prev => ({
        ...prev,
        emailIsValid: loginValidationStrategies.email(e.target.value),
    }));
}

export function onPasswordInput(e, setFieldsValidationTracker) {
    setFieldsValidationTracker(prev => ({
        ...prev,
        passwordIsValid: loginValidationStrategies.password(e.target.value),
    }));
}


export function clearForm({ emailField, passwordField, setErrorMsg, setFieldsValidationTracker }) {
    setErrorMsg("");

    emailField.current.value = "";
    passwordField.current.value = "";
    setFieldsValidationTracker(prev => ({ ...prev, emailIsValid: false, passwordIsValid: false }));
}
