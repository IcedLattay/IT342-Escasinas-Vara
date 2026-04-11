import axios from "axios";


export async function fetchMyWallet() {
    return axios.get(
        "http://localhost:8080/api/wallet/me",
        {
            withCredentials: true,
        }
    );
}


export async function deposit(walletDepositData) {
    return axios.post(
        "http://localhost:8080/api/wallet/deposit",
        walletDepositData,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );
}


export async function savePayoutAccount(payoutAccountData) {
    return axios.post(
        "http://localhost:8080/api/wallet/withdrawal-account",
        payoutAccountData,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        }
    );
}


export async function fetchMyPayoutAccounts() {
    return axios.get(
        "http://localhost:8080/api/wallet/withdrawal-accounts/me",
        {
            withCredentials: true,
        }
    );
}