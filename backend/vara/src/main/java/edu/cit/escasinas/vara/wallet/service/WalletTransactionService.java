package edu.cit.escasinas.vara.wallet.service;

import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.wallet.model.WalletTransaction;
import edu.cit.escasinas.vara.wallet.repository.WalletTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WalletTransactionService {
    private WalletTransactionRepository walletTransactionRepository;

    public WalletTransactionService (WalletTransactionRepository walletTransactionRepository) {
        this.walletTransactionRepository = walletTransactionRepository;
    }

    public List<WalletTransaction> retrieve3RecentWalletTransactions(User owner) {
        return walletTransactionRepository.findTop3ByOwnerOrderByCreatedAtDesc(owner);
    }
}
