package edu.cit.escasinas.vara.dto;

import edu.cit.escasinas.vara.enums.PaymentMethod;

public class WithdrawalAccountSaveRequest {
    public PaymentMethod payoutMethod;
    public String accountNumber;

    public WithdrawalAccountSaveRequest() {}
}
