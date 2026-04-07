package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.dto.WalletDepositRequest;
import edu.cit.escasinas.vara.dto.WalletTransactionRetrievalRequest;
import edu.cit.escasinas.vara.enums.PaymentMethod;
import edu.cit.escasinas.vara.enums.WalletTransactionStatus;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.model.Wallet;
import edu.cit.escasinas.vara.model.WalletTransaction;
import edu.cit.escasinas.vara.repository.UserRepository;
import edu.cit.escasinas.vara.repository.WalletRepository;
import edu.cit.escasinas.vara.repository.WalletTransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WalletService {
    public WalletRepository walletRepository;
    public WalletTransactionRepository walletTransactionRepository;
    public UserRepository userRepository;

    @Value("${paymongo.secret.key}")
    private String paymongoSecretKey;

    public WalletService(
            WalletRepository walletRepository,
            WalletTransactionRepository walletTransactionRepository,
            UserRepository userRepository) {
        this.walletRepository = walletRepository;
        this.walletTransactionRepository = walletTransactionRepository;
        this.userRepository = userRepository;
    }

    public Wallet getWallet(User owner) {

        return walletRepository.findByOwner(owner)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found"));

    }

    public String createDeposit(WalletDepositRequest req, String externalRefId) {

        BigDecimal amount = req.amount;
        PaymentMethod paymentMethod = req.paymentMethod;

        try {
            int amountInCentavos = amount.multiply(new BigDecimal("100")).intValueExact();
            String method = paymentMethod.name().toLowerCase(); // gcash or paymaya

            Map<String, Object> lineItem = new HashMap<>();
            lineItem.put("currency", "PHP");
            lineItem.put("amount", amountInCentavos);
            lineItem.put("name", "Wallet Deposit");
            lineItem.put("quantity", 1);

            Map<String, Object> metadata = new HashMap<>();
            metadata.put("external_reference_id", externalRefId);

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("line_items", List.of(lineItem));
            attributes.put("payment_method_types", List.of(method));
            attributes.put("success_url", "http://localhost:3000/loading");
            attributes.put("reference_number", externalRefId);
            attributes.put("metadata", metadata);

            Map<String, Object> data = new HashMap<>();
            data.put("attributes", attributes);

            Map<String, Object> body = new HashMap<>();
            body.put("data", data);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String auth = Base64.getEncoder()
                    .encodeToString((paymongoSecretKey + ":").getBytes(StandardCharsets.UTF_8));
            headers.set("Authorization", "Basic " + auth);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<Map> response = restTemplate.exchange(
                    "https://api.paymongo.com/v1/checkout_sessions",
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            Map<String, Object> responseBody = response.getBody();
            Map<String, Object> responseData = (Map<String, Object>) responseBody.get("data");
            Map<String, Object> responseAttributes = (Map<String, Object>) responseData.get("attributes");

            return (String) responseAttributes.get("checkout_url");

        } catch (Exception e) {
            throw new RuntimeException("Failed to create PayMongo checkout session: " + e.getMessage(), e);
        }
    }

    public void createDepositTransaction(User owner, String externalRefId, WalletDepositRequest req) {
        BigDecimal amount = req.amount;
        PaymentMethod paymentMethod = req.paymentMethod;


        WalletTransaction newDepositTransaction = new WalletTransaction(
                owner,
                externalRefId,
                paymentMethod,
                amount
        );

        walletTransactionRepository.save(newDepositTransaction);
    }

    @Transactional
    public void handlePaymongoWebhook(Map<String, Object> payload) {
        Map<String, Object> data = (Map<String, Object>) payload.get("data");
        if (data == null) return;

        Map<String, Object> attributes = (Map<String, Object>) data.get("attributes");
        if (attributes == null) return;

        String eventType = (String) attributes.get("type");
        if (!"checkout_session.payment.paid".equals(eventType)) {
            return;
        }

        Map<String, Object> eventData = (Map<String, Object>) attributes.get("data");
        if (eventData == null) return;

        Map<String, Object> eventAttributes = (Map<String, Object>) eventData.get("attributes");
        if (eventAttributes == null) return;

        String externalRefId = null;

        Map<String, Object> metadata = (Map<String, Object>) eventAttributes.get("metadata");
        if (metadata != null) {
            externalRefId = (String) metadata.get("external_reference_id");
        }

        if (externalRefId == null || externalRefId.isBlank()) {
            externalRefId = (String) eventAttributes.get("reference_number");
        }

        if (externalRefId == null || externalRefId.isBlank()) {
            throw new RuntimeException("Missing external reference ID in webhook payload.");
        }

        final String finalExternalRefId = externalRefId;

        WalletTransaction transaction = walletTransactionRepository
                .findByExternalReferenceId(finalExternalRefId)
                .orElseThrow(() -> new RuntimeException(
                        "Transaction not found for external reference ID: " + finalExternalRefId
                ));

        if (transaction.status == WalletTransactionStatus.SUCCESS) {
            return;
        }

        if (transaction.status != WalletTransactionStatus.PENDING) {
            return;
        }

        Wallet wallet = transaction.owner.wallet;
        if (wallet == null) {
            throw new RuntimeException("Wallet not found for transaction owner.");
        }

        transaction.status = WalletTransactionStatus.SUCCESS;
        wallet.balance = wallet.balance.add(transaction.amount);

        walletTransactionRepository.save(transaction);
        walletRepository.save(wallet);
    }

    public WalletTransaction retrieveWalletTransaction(WalletTransactionRetrievalRequest req) {
        if (req.externalReferenceId != null) {
            return walletTransactionRepository.findByExternalReferenceId(req.externalReferenceId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found by External ID."));
        }

        if (req.walletTransactionId != null) {
            return walletTransactionRepository.findById(req.walletTransactionId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction not found by ID."));
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No identifier provided in request.");
    }
}
