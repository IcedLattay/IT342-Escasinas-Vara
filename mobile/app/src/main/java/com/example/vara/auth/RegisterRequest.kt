package com.example.vara.auth

data class RegisterRequest(
    val firstname: String,
    val lastname: String,
    val email: String,
    val password: String
)
