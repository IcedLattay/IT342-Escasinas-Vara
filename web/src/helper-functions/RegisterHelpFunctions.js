import { validateEmailUniqueness } from "../api/AuthService";

//helper functions

let debounceTimer;

export function onFirstNameInput(
    value, 
    setFieldsValidationTracker,
    setErrorMsgs
) {
    const result = registerValidationStrategies.firstname(value);

    setErrorMsgs((prev) => ({ ...prev, firstname: result.error }));
    setFieldsValidationTracker((prev) => ({
        ...prev,
        firstnameIsValid: result.isValid,
    }));
}

export function onLastNameInput(
    value, 
    setFieldsValidationTracker,
    setErrorMsgs
) {
    const result = registerValidationStrategies.lastname(value);

    setErrorMsgs((prev) => ({ ...prev, lastname: result.error }));
    setFieldsValidationTracker((prev) => ({
        ...prev,
        lastnameIsValid: result.isValid,
    }));
}

export function onEmailInput(
    value,
    setFieldsValidationTracker,
    setErrorMsgs,

) {
    const email = value;
    const formatResult = registerValidationStrategies.emailFormat(email);

    setErrorMsgs((prev) => ({ ...prev, email: formatResult.error }));
    setFieldsValidationTracker((prev) => ({
        ...prev,
        emailIsValid: false,
    }));

    if (!formatResult.isValid) return;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
        try {
            await validateEmailUniqueness(email);

            setErrorMsgs((prev) => ({ ...prev, email: "" }));
            setFieldsValidationTracker((prev) => ({
                ...prev,
                emailIsValid: true,
            }));
        } catch (err) {
            const rawError = err.response?.data?.error?.details || "Email validation failed.";
            const match = rawError.match(/"(.*)"/);
            const cleanMessage = match ? match[1] : rawError;

            setErrorMsgs((prev) => ({ ...prev, email: cleanMessage }));
            setFieldsValidationTracker((prev) => ({
                ...prev,
                emailIsValid: false,
            }));
        }
    }, 300);
}

export function onPasswordInput(
    passwordValue,
    confirmPasswordValue,
    setFieldsValidationTracker,
    setPasswordRules,
    setErrorMsgs
) {
    const result = registerValidationStrategies.password(passwordValue);

    setPasswordRules(result.rules);
    setErrorMsgs((prev) => ({ ...prev, password: result.error }));
    setFieldsValidationTracker((prev) => ({
        ...prev,
        passwordIsValid: result.isValid,
    }));

    onConfirmPasswordInput(confirmPasswordValue, passwordValue, setFieldsValidationTracker, setErrorMsgs);
}

export function onConfirmPasswordInput(
    confirmPasswordValue, 
    passwordValue,
    setFieldsValidationTracker,
    setErrorMsgs
) {
    const result = registerValidationStrategies.confirmPassword(
        confirmPasswordValue,
        passwordValue
    );

    setErrorMsgs((prev) => ({ ...prev, confirmPassword: result.error }));
    setFieldsValidationTracker((prev) => ({
        ...prev,
        confirmPasswordIsValid: result.isValid,
    }));
}

export const registerValidationStrategies = {
    firstname: (value) => ({
        isValid: value.trim() !== "",
        error: value.trim() !== "" ? "" : "First name is required.",
    }),

    lastname: (value) => ({
        isValid: value.trim() !== "",
        error: value.trim() !== "" ? "" : "Last name is required.",
    }),

    emailFormat: (value) => {
        if (value.trim() === "") {
            return { isValid: false, error: "" };
        }

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return {
            isValid,
            error: isValid ? "" : "Invalid email address.",
        };
    },

    password: (value) => {
        const rules = {
            lengthIsValid: value.length >= 8,
            hasUpperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(value),
            hasNumber: /\d/.test(value),
        };

        const isEmpty = value.length === 0;

        return {
            isValid:
                rules.lengthIsValid &&
                rules.hasUpperLower &&
                rules.hasNumber,
            error:
                isEmpty ||
                (rules.lengthIsValid && rules.hasUpperLower && rules.hasNumber)
                ? ""
                : "Input is invalid.",
            rules: isEmpty
                ? {
                    lengthIsValid: null,
                    hasUpperLower: null,
                    hasNumber: null,
                }
                : rules,
        };
    },

    confirmPassword: (confirmValue, passwordValue) => {
        if (confirmValue === "") {
        return { isValid: false, error: "" };
        }

        if (passwordValue === "") {
        return { isValid: false, error: "Please set a password first." };
        }

        if (confirmValue !== passwordValue) {
        return { isValid: false, error: "Passwords do not match." };
        }

        return { isValid: true, error: "" };
    },
};

export function clearForm({ fields, setErrorMsgs, setFieldsValidationTracker }) {
    setErrorMsgs({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    fields.forEach(field => {
        field.current.value = "";
    });
    
    setFieldsValidationTracker({
        firstnameIsValid: false,
        lastnameIsValid: false,
        emailIsValid: false,
        passwordIsValid: false,
        confirmPasswordIsValid: false,
    });
}