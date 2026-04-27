package edu.cit.escasinas.vara.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import edu.cit.escasinas.vara.enums.PaymentMethod;

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
