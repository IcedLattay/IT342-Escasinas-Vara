package edu.cit.escasinas.vara.controller;

import edu.cit.escasinas.vara.dto.ApiResponse;
import edu.cit.escasinas.vara.dto.WalletDepositRequest;
import edu.cit.escasinas.vara.dto.WalletTransactionRetrievalRequest;
import edu.cit.escasinas.vara.model.WalletTransaction;
import edu.cit.escasinas.vara.service.UserService;
import edu.cit.escasinas.vara.service.WalletService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    public WalletService walletService;
    public UserService userService;

    public WalletController(WalletService walletService, UserService userService) {
        this.walletService = walletService;
        this.userService = userService;
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody WalletDepositRequest req) {

        String externalReferenceId = UUID.randomUUID().toString();

        String checkoutUrl = walletService.createDeposit(req, externalReferenceId);

        walletService.createDepositTransaction(
                userService.getCurrentUser(),
                externalReferenceId,
                req
        );

        Map<String, String> data = new HashMap<>();
        data.put("checkoutUrl", checkoutUrl);
        data.put("externalReferenceId", externalReferenceId);

        ApiResponse res = new ApiResponse(
                true,
                data,
                null,
                java.time.Instant.now().toString()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/transaction")
    public ResponseEntity<?> retrieveWalletTransaction(
            @RequestParam(required = false) String externalReferenceId,
            @RequestParam(required = false) Long walletTransactionId
    ) {
        System.out.println("Java.time: " + LocalDateTime.now());
        System.out.println("Controller auth: " + SecurityContextHolder.getContext().getAuthentication());
        System.out.println("REQ externalReferenceId: " + externalReferenceId);
        System.out.println("REQ walletTransactionId: " + walletTransactionId);

        WalletTransactionRetrievalRequest req = new WalletTransactionRetrievalRequest();
        req.externalReferenceId = externalReferenceId;
        req.walletTransactionId = walletTransactionId;

        WalletTransaction walletTransaction = walletService.retrieveWalletTransaction(req);

        System.out.println("wallet transaction retrieved.");

        Map<String, Object> walletTransactionData = new HashMap<>();
        walletTransactionData.put("type", walletTransaction.type.getDisplayName());
        walletTransactionData.put("amount", walletTransaction.amount);
        walletTransactionData.put("externalReferenceId", walletTransaction.externalReferenceId);
        walletTransactionData.put("paymentMethod", walletTransaction.paymentMethod.getDisplayName());
        walletTransactionData.put("status", walletTransaction.status.getDisplayName());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy");
        walletTransactionData.put("createdAt", walletTransaction.createdAt.format(formatter));

        Map<String, Object> data = new HashMap<>();
        data.put("walletTransaction", walletTransactionData);

        ApiResponse res = new ApiResponse(
                true,
                data,
                null,
                java.time.Instant.now().toString()
        );

        System.out.println("Sending wallet transaction...");

        return ResponseEntity.ok(res);
    }
}
