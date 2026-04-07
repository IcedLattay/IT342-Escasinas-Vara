package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.enums.WalletCurrency;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.model.Wallet;
import edu.cit.escasinas.vara.repository.UserRepository;
import edu.cit.escasinas.vara.repository.WalletRepository;
import edu.cit.escasinas.vara.security.JwtProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

@Service
public class UserService {
    public UserRepository userRepository;
    public JwtProvider tokenProvider;
    public WalletRepository walletRepository;

    public UserService(
            UserRepository userRepository,
            JwtProvider tokenProvider,
            WalletRepository walletRepository) {
        this.userRepository = userRepository;
        this.tokenProvider = tokenProvider;
        this.walletRepository = walletRepository;
    }

    public User getCurrentUser(String email) {

        if (email == null) {
            throw new RuntimeException("No user is currently logged in!");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));
    }

    @Transactional
    public void backfillWallets() {
        List<User> usersWithoutWallets = userRepository.findUsersWithoutWallets();

        for (User user : usersWithoutWallets) {
            Wallet wallet = new Wallet(
                    user,
                    WalletCurrency.PHP
            );

            walletRepository.save(wallet);
        }
    }
}
