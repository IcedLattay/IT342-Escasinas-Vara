package edu.cit.escasinas.vara.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PaymentMethod {
    GCASH("GCash"),
    PAYMAYA("Paymaya");

    @JsonCreator
    public static PaymentMethod from(String value) {
        return PaymentMethod.valueOf(value.toUpperCase());
    }

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
