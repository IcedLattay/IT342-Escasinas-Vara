package edu.cit.escasinas.vara.controller;

import edu.cit.escasinas.vara.dto.*;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.model.Wallet;
import edu.cit.escasinas.vara.model.WalletTransaction;
import edu.cit.escasinas.vara.model.WithdrawalAccount;
import edu.cit.escasinas.vara.service.UserService;
import edu.cit.escasinas.vara.service.WalletService;
import edu.cit.escasinas.vara.service.WithdrawalAccountService;
import edu.cit.escasinas.vara.utils.ReferenceGenerator;
import jakarta.transaction.Transactional;
import org.checkerframework.checker.units.qual.A;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/wallet")
public class WalletController {
    public WalletService walletService;
    public UserService userService;
    public WithdrawalAccountService withdrawalAccountService;

    public WalletController(
            WalletService walletService,
            UserService userService,
            WithdrawalAccountService withdrawalAccountService
    ) {
        this.walletService = walletService;
        this.userService = userService;
        this.withdrawalAccountService = withdrawalAccountService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getWallet(@AuthenticationPrincipal String email) {
        try {
            User owner = userService.getCurrentUser(email);
            Wallet wallet = walletService.getWallet(owner);

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                            "wallet", Map.of(
                                    "balance", wallet.balance.toString(),
                                    "currency", wallet.currency.name()
                            )
                    ),
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.ok(res);

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
    };

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(
            @RequestBody WalletDepositRequest req,
            @AuthenticationPrincipal String email
    ) {

        String externalReferenceId = UUID.randomUUID().toString();

        String checkoutUrl = walletService.createDeposit(req, externalReferenceId);

        walletService.createDepositTransaction(
                userService.getCurrentUser(email),
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

    @GetMapping("/withdrawal-accounts/me")
    public ResponseEntity<?> retrieveWithdrawalAccounts(@AuthenticationPrincipal String email) {
        try {
            User owner = userService.getCurrentUser(email);
            List<WithdrawalAccount> withdrawalAccounts = withdrawalAccountService.retrieveWithdrawalAccounts(owner);

            List<Map<String, Object>> payoutAccounts = withdrawalAccounts.stream()
                    .map(acc -> Map.<String, Object>of(
                            "id", acc.withdrawalAccountId,
                            "payoutMethod", acc.payoutMethod.getDisplayName(),
                            "number", acc.accountNumber
                    ))
                    .toList();

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of("payoutAccounts", payoutAccounts),
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.ok(res);
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

    @PostMapping("/withdrawal-account")
    public ResponseEntity<?> saveWithdrawalAccount(
            @RequestBody WithdrawalAccountSaveRequest req,
            @AuthenticationPrincipal String email
    ) {

        try {
            User owner = userService.getCurrentUser(email);

            WithdrawalAccount newAccount = walletService.createWithdrawalAccount(
                    owner,
                    req
            );

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                            "payoutAccount", Map.of(
                                    "id", newAccount.withdrawalAccountId,
                                    "payoutMethod", newAccount.payoutMethod.getDisplayName(),
                                    "number", (newAccount.accountNumber != null && newAccount.accountNumber.startsWith("0"))
                                            ? "63-" + newAccount.accountNumber.substring(1, 2) + "****" + newAccount.accountNumber.substring(newAccount.accountNumber.length() - 5)
                                            : newAccount.accountNumber
                            )
                    ),
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(res);
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
        walletTransactionData.put("amount", walletTransaction.amount.toString());
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

    @Transactional
    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(
            @RequestBody WalletWithdrawalRequest req,
            @AuthenticationPrincipal String email
    ) {

        try {
            User owner = userService.getCurrentUser(email);

            String externalReferenceId = walletService.generateReferenceId("WD");

            WalletTransaction newWalletTransaction = walletService.createWithdrawal(
                    owner,
                    externalReferenceId,
                    req
            );

            Wallet wallet = walletService.getWallet(owner);

            walletService.deductWalletBalance(
                    wallet,
                    req.amount
            );

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy");

            ApiResponse res = new ApiResponse(
                    true,
                    Map.of(
                            "type", newWalletTransaction.type.getDisplayName(),
                            "walletTransaction", Map.of(
                                    "payoutAccount", Map.of(
                                            "payoutMethod", newWalletTransaction.withdrawalAccount.payoutMethod.getDisplayName(),
                                            "number", newWalletTransaction.withdrawalAccount.accountNumber
                                    ),
                                    "amount", newWalletTransaction.amount.toString(),
                                    "transactionId", newWalletTransaction.externalReferenceId,
                                    "createdAt", newWalletTransaction.createdAt.format(formatter)
                            )
                    ),
                    null,
                    java.time.Instant.now().toString()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(res);
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

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
