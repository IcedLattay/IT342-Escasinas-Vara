package edu.cit.escasinas.vara.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import edu.cit.escasinas.vara.dto.*;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.security.JwtProvider;
import edu.cit.escasinas.vara.service.AuthService;
import edu.cit.escasinas.vara.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    public AuthService authService;
    public UserService userService;
    public JwtProvider tokenProvider;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleWebClientId;

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
                    .secure(false)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                            "token", token,
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
            AuthResponse authResponse = authService.authenticate(request);
            String token = authResponse.getToken();
            User authenticatedUser = authResponse.getUser();

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                        "token", token,
                        "user", Map.of(
                                    "email", authenticatedUser.email,
                                    "firstname", authenticatedUser.firstname,
                                    "lastname", authenticatedUser.lastname
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

    @PostMapping("/google/mobile")
    public ResponseEntity<?> googleMobileLogin(@RequestBody GoogleLoginRequest request) {
        try {
            if (request == null || request.idToken == null || request.idToken.isBlank()) {
                return ResponseEntity.badRequest().body("Missing Google ID token");
            }

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    GsonFactory.getDefaultInstance()
            )
                    .setAudience(Collections.singletonList(googleWebClientId))
                    .build();

            GoogleIdToken googleIdToken = verifier.verify(request.idToken);

            if (googleIdToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google ID token");
            }

            GoogleIdToken.Payload payload = googleIdToken.getPayload();

            String email = payload.getEmail();
            String firstname = (String) payload.get("given_name");
            String lastname = (String) payload.get("family_name");

            AuthResponse authResponse = authService.loginWithGoogle(email, firstname, lastname);

            ApiResponse res = new ApiResponse(
                    true,
                    authResponse,
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.ok().body(res);

        } catch (Exception e) {

            ApiResponse res = new ApiResponse(
                    false,
                    null,
                    new ApiError(
                            "AUTH_001",
                            "Google authentication failed",
                            e.getMessage()
                    ),
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok().build();
    }
}
