package edu.cit.escasinas.vara.shared.dto;

public class ApiError {
    public String code;
    public String message;
    public Object details;

    public ApiError(String code, String message, Object details) {
        this.code = code;
        this.message = message;
        this.details = details;
    }
}
