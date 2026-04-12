package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.dto.TransactionResponse;
import edu.cit.escasinas.vara.model.WalletTransaction;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class TransactionService {

    public TransactionResponse normaliseWalletTransaction(WalletTransaction walletTransaction) {
        TransactionResponse transaction = new TransactionResponse();

        transaction.category = "WALLET";
        transaction.activity = walletTransaction.type.getDisplayName();
        transaction.amount = walletTransaction.amount.toString();
        transaction.status = walletTransaction.status.getDisplayName();
        transaction.createdAt = walletTransaction.createdAt;

        return transaction;
    }
}
