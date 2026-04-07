package edu.cit.escasinas.vara.controller;

import edu.cit.escasinas.vara.dto.ApiError;
import edu.cit.escasinas.vara.dto.ApiResponse;
import edu.cit.escasinas.vara.dto.UserResponse;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    public UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal String email) {
        try {
            User authenticatedUser = userService.getCurrentUser(email);

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                            "message", "Authenticated user: " + authenticatedUser.firstname + " " + authenticatedUser.lastname,
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
                    .body(res);
        } catch (Exception e) {
            ApiResponse res = new ApiResponse(
                    false,
                    null,
                    new ApiError(
                            "DB-001",
                            "Resource not found",
                            e.getMessage()
                    ),
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }

    }
}

