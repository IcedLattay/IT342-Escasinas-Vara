package edu.cit.escasinas.vara.dto;

import edu.cit.escasinas.vara.enums.WalletTransactionStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TransactionResponse {
    public String category;
    public String activity;
    public String amount;
    public String status;
    public LocalDateTime createdAt;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getFormattedCreatedAt() {
        if (createdAt == null) return null;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMM yyyy");
        return createdAt.format(formatter);
    }
}
