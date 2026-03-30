package com.example.vara

data class ApiError(
    val code: String,
    val message: String,
    val details: Any?
)
