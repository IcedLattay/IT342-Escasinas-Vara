package edu.cit.escasinas.vara.admin.controller;

import edu.cit.escasinas.vara.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    public UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/backfill-wallets")
    public ResponseEntity<String> backfillWallets() {
        userService.backfillWallets();
        return ResponseEntity.ok("Wallet backfill complete");
    }
}
