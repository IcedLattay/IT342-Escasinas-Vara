package edu.cit.escasinas.vara.wallet.dto;

import java.math.BigDecimal;

public class WalletWithdrawalRequest {
    public BigDecimal amount;
    public Long payoutAccountId;

    public WalletWithdrawalRequest() {}

    public WalletWithdrawalRequest(
            BigDecimal amount,
            Long payoutAccountId
    ) {
        this.amount = amount;
        this.payoutAccountId = payoutAccountId;
    }
}
