package edu.cit.escasinas.vara.repository;

import edu.cit.escasinas.vara.model.WithdrawalAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawalAccountRepository extends JpaRepository<WithdrawalAccount, Long> {

}
