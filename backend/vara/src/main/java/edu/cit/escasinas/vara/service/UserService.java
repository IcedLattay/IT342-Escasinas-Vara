package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.repository.UserRepository;
import edu.cit.escasinas.vara.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    public UserRepository userRepository;
    public JwtProvider tokenProvider;

    public UserService(
            UserRepository userRepository,
            JwtProvider tokenProvider) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("No user is currently logged in!");
        }
        String email = (String) authentication.getPrincipal();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
    }
}
