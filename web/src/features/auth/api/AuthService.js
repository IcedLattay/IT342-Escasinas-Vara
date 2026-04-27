import axios from "axios";



export async function login(loginFormData) {
    return axios.post(
        "http://localhost:8080/api/auth/login",
        loginFormData,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
    );
}


export async function registerUser(registerFormData) {
    return axios.post(
        "http://localhost:8080/api/auth/register",
        registerFormData,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
    );
}

export async function validateEmailUniqueness(email) {
    return axios.post(
        "http://localhost:8080/api/auth/validate/email-uniqueness",
        { email : email },
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
    );
}