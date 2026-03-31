package com.example.vara.network


import com.example.vara.auth.EmailUniquenessRequest
import com.example.vara.auth.LoginRequest
import com.example.vara.auth.RegisterData
import com.example.vara.auth.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST("/api/auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<ApiResponse<RegisterData>>

    @POST("/api/auth/register")
    suspend fun register(
        @Body request: RegisterRequest
    ): Response<ApiResponse<RegisterData>>

    @POST("/api/auth/validate/email-uniqueness")
    suspend fun validateEmailUniqueness(
        @Body request: EmailUniquenessRequest
    ): Response<ApiResponse<Any>>

    @POST("/api/auth/logout")
    suspend fun logout(): Response<Void>
}