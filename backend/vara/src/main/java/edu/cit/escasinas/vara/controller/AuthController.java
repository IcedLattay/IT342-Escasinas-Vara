package edu.cit.escasinas.vara.controller;

import edu.cit.escasinas.vara.dto.*;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.security.JwtProvider;
import edu.cit.escasinas.vara.service.AuthService;
import edu.cit.escasinas.vara.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    public AuthService authService;
    public UserService userService;
    public JwtProvider tokenProvider;

    public AuthController(
            AuthService authService,
            UserService userService,
            JwtProvider tokenProvider
    ) {
        this.authService = authService;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User newUser = authService.createUser(request);

            String token = tokenProvider.generateToken(newUser);

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Strict")
                    .build();

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                            "user", Map.of(
                                    "email", newUser.email,
                                    "firstname", newUser.firstname,
                                    "lastname", newUser.lastname
                            )
                    ),
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.CREATED)
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(res);

        } catch (Exception e) {
            ApiResponse res = new ApiResponse(
                    false,
                    null,
                    new ApiError(
                    "DB-002",
                    "Duplicate entry",
                    e.getMessage()
                ),
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
        }
    }

    @PostMapping("/validate/email-uniqueness")
    public ResponseEntity<?> validateEmailUniqueness(@RequestBody EmailUniquessValidationRequest request) {

        try {
            authService.validateEmailUniqueness(request);

            ApiResponse res = new ApiResponse(
                    true,
                    null,
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.ok().body(res);

        } catch (Exception e) {
            ApiResponse res = new ApiResponse(
                    false,
                    null,
                    new ApiError(
                            "DB-002",
                            "Duplicate entry",
                            e.getMessage()
                    ),
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User authenticateUser = authService.authenticate(request);

            String token = tokenProvider.generateToken(authenticateUser);

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Strict")
                    .build();

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                      "user", Map.of(
                                    "email", authenticateUser.email,
                                    "firstname", authenticateUser.firstname,
                                    "lastname", authenticateUser.lastname
                            )
                    ),
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(res);

        } catch (Exception e) {
            ApiResponse res = new ApiResponse(
                    false,
                    null,
                    new ApiError(
                            "AUTH_001",
                            "Invalid credentials.",
                            e.getMessage()
                    ),
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok().build();
    }
}
