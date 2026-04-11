package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.model.WithdrawalAccount;
import edu.cit.escasinas.vara.repository.WithdrawalAccountRepository;
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
