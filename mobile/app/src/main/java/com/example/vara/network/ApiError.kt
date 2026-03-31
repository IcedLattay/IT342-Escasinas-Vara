package com.example.vara.network

data class ApiError(
    val code: String,
    val message: String,
    val details: Any?
)
