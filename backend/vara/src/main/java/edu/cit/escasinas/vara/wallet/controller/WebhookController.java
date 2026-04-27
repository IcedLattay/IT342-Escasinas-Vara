package edu.cit.escasinas.vara.wallet.controller;

import edu.cit.escasinas.vara.wallet.service.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/webhooks")
public class WebhookController {

    private final WalletService walletService;

    public WebhookController(WalletService walletService) {
        this.walletService = walletService;
    }

    @PostMapping("/wallet-transaction")
    public ResponseEntity<Void> handleWebhook(@RequestBody Map<String, Object> payload) {
        walletService.handlePaymongoWebhook(payload);

        return ResponseEntity.ok().build();
    }
}
