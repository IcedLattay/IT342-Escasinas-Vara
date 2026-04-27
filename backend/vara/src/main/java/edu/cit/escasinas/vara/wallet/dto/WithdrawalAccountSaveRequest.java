package edu.cit.escasinas.vara.wallet.dto;

import edu.cit.escasinas.vara.wallet.enums.PaymentMethod;

public class WithdrawalAccountSaveRequest {
    public PaymentMethod payoutMethod;
    public String accountNumber;

    public WithdrawalAccountSaveRequest() {}
}
