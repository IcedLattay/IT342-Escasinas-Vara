package edu.cit.escasinas.vara.shared.dto;

public class ApiResponse<T> {
    public boolean success;
    public T data;
    public ApiError error;
    public String timestamp;

    public ApiResponse(boolean success, T data, ApiError error, String timestamp) {
        this.success = success;
        this.data = data;
        this.error = error;
        this.timestamp = timestamp;
    }
}
