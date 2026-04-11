package edu.cit.escasinas.vara.repository;

import edu.cit.escasinas.vara.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    Optional<WalletTransaction> findByExternalReferenceId(String externalReferenceId);
    boolean existsByExternalReferenceId(String externalReferenceId);
}
