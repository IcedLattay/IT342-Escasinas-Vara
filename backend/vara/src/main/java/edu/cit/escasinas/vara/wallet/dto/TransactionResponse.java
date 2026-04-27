package edu.cit.escasinas.vara.wallet.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TransactionResponse {
    public Long id;
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
