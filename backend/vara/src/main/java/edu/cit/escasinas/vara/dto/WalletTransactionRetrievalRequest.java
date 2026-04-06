package edu.cit.escasinas.vara.dto;

public class WalletTransactionRetrievalRequest {
    public String externalReferenceId;
    public Long walletTransactionId;

    public WalletTransactionRetrievalRequest() {}

    public WalletTransactionRetrievalRequest(
            String externalReferenceId,
            Long walletTransactionId
    ) {
        this.externalReferenceId = externalReferenceId;
        this.walletTransactionId = walletTransactionId;
    }
}
