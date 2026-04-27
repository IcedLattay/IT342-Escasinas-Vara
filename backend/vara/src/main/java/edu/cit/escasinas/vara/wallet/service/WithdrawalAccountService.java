package edu.cit.escasinas.vara.wallet.service;

import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.wallet.model.WithdrawalAccount;
import edu.cit.escasinas.vara.wallet.repository.WithdrawalAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WithdrawalAccountService {
    public WithdrawalAccountRepository withdrawalAccountRepository;

    public WithdrawalAccountService(WithdrawalAccountRepository withdrawalAccountRepository) {
        this.withdrawalAccountRepository = withdrawalAccountRepository;
    }

    public List<WithdrawalAccount> retrieveWithdrawalAccounts(User owner) {
        return withdrawalAccountRepository.findByOwnerOrderByCreatedAtDesc(owner);
    }
}
