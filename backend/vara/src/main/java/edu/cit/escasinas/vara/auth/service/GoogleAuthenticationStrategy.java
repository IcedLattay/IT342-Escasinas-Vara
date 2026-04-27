package edu.cit.escasinas.vara.auth.service;

import edu.cit.escasinas.vara.auth.dto.AuthResponse;
import edu.cit.escasinas.vara.auth.dto.GoogleAuthCommand;
import edu.cit.escasinas.vara.auth.enums.AuthProvider;
import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.user.repository.UserRepository;
import edu.cit.escasinas.vara.security.JwtProvider;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class GoogleAuthenticationStrategy implements AuthenticationStrategy<GoogleAuthCommand> {
    private final UserRepository userRepository;
    private final JwtProvider tokenProvider;

    public GoogleAuthenticationStrategy(
            UserRepository userRepository,
            JwtProvider tokenProvider
    ) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public AuthProvider getProvider() {
        return AuthProvider.GOOGLE;
    }

    @Override
    public AuthResponse authenticate(GoogleAuthCommand command) {
        String email = command.getEmail();
        String firstname = command.getFirstname();
        String lastname = command.getLastname();

        if (email == null || email.isBlank()) {
            throw new RuntimeException("Google account email is not available");
        }

        final String resolvedFirstname =
                (firstname == null || firstname.isBlank()) ? "Google" : firstname;
        final String resolvedLastname =
                (lastname == null || lastname.isBlank()) ? "User" : lastname;

        Optional<User> existing = userRepository.findByEmail(email);
        User user = existing.orElseGet(() -> userRepository.save(new User(
                resolvedFirstname,
                resolvedLastname,
                email,
                UUID.randomUUID().toString()
        )));

        String token = tokenProvider.generateToken(user);
        return new AuthResponse(token, user);
    }
}
