package edu.cit.escasinas.vara.repository;

import edu.cit.escasinas.vara.enums.PaymentMethod;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.model.WithdrawalAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WithdrawalAccountRepository extends JpaRepository<WithdrawalAccount, Long> {
    boolean existsByOwnerAndPayoutMethodAndAccountNumber(
            User owner,
            PaymentMethod payoutMethod,
            String accountNumber
    );
    List<WithdrawalAccount> findByOwnerOrderByCreatedAtDesc(User owner);
}
