package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.dto.*;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.repository.UserRepository;
import edu.cit.escasinas.vara.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    public UserRepository userRepository;
    public PasswordEncoder passwordEncoder;
    public JwtProvider tokenProvider;


    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public User createUser(RegisterRequest req) {

        if (userRepository.existsByEmail(req.email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email address is already taken."
            );
        }

        User newUser = new User();

        System.out.println("Email from req: " + req.email);
        newUser.firstname = req.firstname;
        newUser.lastname = req.lastname;
        newUser.email = req.email;
        newUser.password = passwordEncoder.encode(req.password);

        return userRepository.save(newUser);
    }

    public User authenticate(LoginRequest req) {
        User user = userRepository.findByEmail(req.email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Incorrect username or password.")
                );

        if (!passwordEncoder.matches(req.password, user.password)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Incorrect username or password."
            );
        }

        return user;
    }

    public AuthResponse loginWithGoogle(OAuth2User oauth2User) {
        String email = stringAttr(oauth2User, "email");

        if (email == null || email.isBlank()) {
            throw new RuntimeException("Google account email is not available");
        }

        String firstname = stringAttr(oauth2User, "given_name");
        String lastname = stringAttr(oauth2User, "family_name");
        if ((firstname == null || firstname.isBlank()) && (lastname == null || lastname.isBlank())) {
            String name = stringAttr(oauth2User, "name");
            if (name != null && !name.isBlank()) {
                String[] parts = name.trim().split("\\s+", 2);
                firstname = parts[0];
                lastname = parts.length > 1 ? parts[1] : "User";
            } else {
                firstname = "Google";
                lastname = "User";
            }
        }

        final String resolvedFirstname = (firstname == null || firstname.isBlank()) ? "Google" : firstname;
        final String resolvedLastname = (lastname == null || lastname.isBlank()) ? "User" : lastname;

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

    public AuthResponse authenticateWithGoogleOAuth2User(OAuth2User oauth2User) {
        return loginWithGoogle(oauth2User);
    }

    private static String stringAttr(OAuth2User oauth2User, String key) {
        Object v = oauth2User.getAttributes().get(key);
        return v == null ? null : String.valueOf(v);
    }

    public void validateEmailUniqueness(EmailUniquessValidationRequest req) {

        if (userRepository.existsByEmail(req.email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email address is already taken."
            );
        }
    }

    public void logout(Long userId) {

    }


}
