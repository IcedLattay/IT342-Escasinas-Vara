package edu.cit.escasinas.vara.wallet.repository;

import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.wallet.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    Optional<WalletTransaction> findByExternalReferenceId(String externalReferenceId);
    boolean existsByExternalReferenceId(String externalReferenceId);
    List<WalletTransaction> findTop3ByOwnerOrderByCreatedAtDesc(User owner);
}
