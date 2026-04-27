package edu.cit.escasinas.vara.dto;

public class LoginResponse {
    public String firstname;
    public String lastname;
    public String email;

    public LoginResponse() {}

    public LoginResponse(
            String firstname,
            String lastname,
            String email
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}
