package edu.cit.escasinas.vara.auth.dto;

public class GoogleAuthCommand {
    private final String email;
    private final String firstname;
    private final String lastname;

    public GoogleAuthCommand(String email, String firstname, String lastname) {
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }
}
