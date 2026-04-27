import axios from "axios";



export async function fetchCurrentUser() {
    return axios.get(
        "http://localhost:8080/api/users/me", 
        {
            withCredentials: true
        }
    );
} 