import axios from "axios";


export async function fetchMyWallet() {
    return axios.get(
        "http://localhost:8080/api/wallet/me",
        {
            withCredentials: true,
        }
    );
}