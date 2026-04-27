package edu.cit.escasinas.vara.auth.service;

import edu.cit.escasinas.vara.auth.dto.*;
import edu.cit.escasinas.vara.auth.enums.AuthProvider;
import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationStrategyFactory authenticationStrategyFactory;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationStrategyFactory authenticationStrategyFactory
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationStrategyFactory = authenticationStrategyFactory;
    }

    public User createUser(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email address is already taken."
            );
        }

        User newUser = new User();
        newUser.firstname = req.firstname;
        newUser.lastname = req.lastname;
        newUser.email = req.email;
        newUser.password = passwordEncoder.encode(req.password);

        return userRepository.save(newUser);
    }

    public AuthResponse authenticate(LoginRequest req) {
        @SuppressWarnings("unchecked")
        AuthenticationStrategy<LoginRequest> strategy =
                (AuthenticationStrategy<LoginRequest>) authenticationStrategyFactory.getStrategy(AuthProvider.EMAIL);

        return strategy.authenticate(req);
    }

    public AuthResponse loginWithGoogle(String email, String firstname, String lastname) {
        GoogleAuthCommand command = new GoogleAuthCommand(email, firstname, lastname);

        @SuppressWarnings("unchecked")
        AuthenticationStrategy<GoogleAuthCommand> strategy =
                (AuthenticationStrategy<GoogleAuthCommand>) authenticationStrategyFactory.getStrategy(AuthProvider.GOOGLE);

        return strategy.authenticate(command);
    }

    public AuthResponse authenticateWithGoogleOAuth2User(OAuth2User oauth2User) {
        String email = stringAttr(oauth2User, "email");

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

        return loginWithGoogle(email, firstname, lastname);
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
}