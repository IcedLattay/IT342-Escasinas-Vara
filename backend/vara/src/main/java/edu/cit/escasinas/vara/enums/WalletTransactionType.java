package edu.cit.escasinas.vara.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum WalletTransactionType {
    DEPOSIT("Deposit"),
    WITHDRAWAL("Withdrawal");

    private final String displayName;

    WalletTransactionType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
