package edu.cit.escasinas.vara.repository;

import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByOwner(User owner);
}
