package edu.cit.escasinas.vara.auth.service;

import edu.cit.escasinas.vara.auth.dto.LoginRequest;
import edu.cit.escasinas.vara.auth.dto.RegisterRequest;
import edu.cit.escasinas.vara.auth.enums.AuthProvider;
import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    AuthenticationStrategyFactory authenticationStrategyFactory;

    @InjectMocks
    AuthService authService;

    @Test
    void createUserShouldSaveUserWhenEmailIsUnique() {
        RegisterRequest req = new RegisterRequest();
        req.firstname = "John";
        req.lastname = "Doe";
        req.email = "john@test.com";
        req.password = "Password123!";

        when(userRepository.existsByEmail(req.email)).thenReturn(false);
        when(passwordEncoder.encode(req.password)).thenReturn("hashedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        User result = authService.createUser(req);

        assertEquals("John", result.firstname);
        assertEquals("Doe", result.lastname);
        assertEquals("john@test.com", result.email);
        assertEquals("hashedPassword", result.password);

        verify(userRepository).save(any(User.class));
    }

    @Test
    void createUserShouldThrowWhenEmailAlreadyExists() {
        RegisterRequest req = new RegisterRequest();
        req.email = "taken@test.com";

        when(userRepository.existsByEmail(req.email)).thenReturn(true);

        assertThrows(ResponseStatusException.class, () ->
                authService.createUser(req)
        );
    }

    @Test
    void validateEmailUniquenessShouldThrowWhenEmailExists() {
        var req = new edu.cit.escasinas.vara.auth.dto.EmailUniquessValidationRequest("taken@test.com");

        when(userRepository.existsByEmail(req.email)).thenReturn(true);

        assertThrows(ResponseStatusException.class, () ->
                authService.validateEmailUniqueness(req)
        );
    }

    @Test
    @SuppressWarnings({"unchecked", "rawtypes"})
    void authenticateShouldUseEmailStrategy() {
        LoginRequest req = new LoginRequest();

        AuthenticationStrategy strategy = mock(AuthenticationStrategy.class);

        when(authenticationStrategyFactory.getStrategy(AuthProvider.EMAIL))
                .thenReturn(strategy);

        authService.authenticate(req);

        verify(authenticationStrategyFactory).getStrategy(AuthProvider.EMAIL);
        verify(strategy).authenticate(req);
    }
}