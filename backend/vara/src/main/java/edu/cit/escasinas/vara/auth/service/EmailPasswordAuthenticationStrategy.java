package edu.cit.escasinas.vara.auth.service;

import edu.cit.escasinas.vara.auth.dto.AuthResponse;
import edu.cit.escasinas.vara.auth.dto.LoginRequest;
import edu.cit.escasinas.vara.auth.enums.AuthProvider;
import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.user.repository.UserRepository;
import edu.cit.escasinas.vara.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class EmailPasswordAuthenticationStrategy implements AuthenticationStrategy<LoginRequest> {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider tokenProvider;

    public EmailPasswordAuthenticationStrategy(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtProvider tokenProvider
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public AuthProvider getProvider() {
        return AuthProvider.EMAIL;
    }

    @Override
    public AuthResponse authenticate(LoginRequest req) {
        User user = userRepository.findByEmail(req.email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Incorrect username or password."
                ));

        if (!passwordEncoder.matches(req.password, user.password)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Incorrect username or password."
            );
        }

        String token = tokenProvider.generateToken(user);
        return new AuthResponse(token, user);
    }
}
