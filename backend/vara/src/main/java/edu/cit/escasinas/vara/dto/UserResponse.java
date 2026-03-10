package edu.cit.escasinas.vara.dto;

public class UserResponse {
    public Long id;
    public String username;
    public String emailAddress;

    public UserResponse() {}

    public UserResponse(
            Long id,
            String username,
            String emailAddress
    ) {
        this.id = id;
        this.username = username;
        this.emailAddress = emailAddress;
    }
}
