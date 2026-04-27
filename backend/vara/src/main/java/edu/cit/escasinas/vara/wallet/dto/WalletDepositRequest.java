package edu.cit.escasinas.vara.wallet.dto;

import edu.cit.escasinas.vara.wallet.enums.PaymentMethod;

import java.math.BigDecimal;

public class WalletDepositRequest {
    public BigDecimal amount;
    public PaymentMethod paymentMethod;

    public WalletDepositRequest() {}

    public WalletDepositRequest(
            BigDecimal amount,
            PaymentMethod paymentMethod
    ) {
        this.amount = amount;
        this.paymentMethod = paymentMethod;
    }
}
