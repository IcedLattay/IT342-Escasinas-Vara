package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.dto.LoginRequest;
import edu.cit.escasinas.vara.dto.LoginResponse;
import edu.cit.escasinas.vara.dto.RegisterRequest;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.repository.UserRepository;
import edu.cit.escasinas.vara.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public void logout(Long userId) {

    }


}
