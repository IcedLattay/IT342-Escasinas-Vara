package edu.cit.escasinas.vara.auth.dto;

public class RegisterRequest {
    public String firstname;
    public String lastname;
    public String email;
    public String password;

    public RegisterRequest() {}

    public RegisterRequest(
            String firstname,
            String lastname,
            String email,
            String password
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}
