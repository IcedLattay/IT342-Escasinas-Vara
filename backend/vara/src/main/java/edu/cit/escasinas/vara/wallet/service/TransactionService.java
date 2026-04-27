package edu.cit.escasinas.vara.wallet.service;

import edu.cit.escasinas.vara.wallet.dto.TransactionResponse;
import edu.cit.escasinas.vara.wallet.model.WalletTransaction;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    public TransactionResponse normaliseWalletTransaction(WalletTransaction walletTransaction) {
        TransactionResponse transaction = new TransactionResponse();

        transaction.id = walletTransaction.walletTransactionId;
        transaction.category = "WALLET";
        transaction.activity = walletTransaction.type.getDisplayName();
        transaction.amount = walletTransaction.amount.toString();
        transaction.status = walletTransaction.status.getDisplayName();
        transaction.createdAt = walletTransaction.createdAt;

        return transaction;
    }
}
