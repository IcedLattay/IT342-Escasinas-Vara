package edu.cit.escasinas.vara.enums;

public enum WalletCurrency {
    PHP("Philippine Peso"),
    IDR("Indonesian Rupiah"),
    MYR("Malaysian Ringgit"),
    THB("Thai Baht");

    private final String displayName;

    WalletCurrency(String displayName) { this.displayName = displayName; }

    public String getDisplayName() {
        return displayName;
    }
}
