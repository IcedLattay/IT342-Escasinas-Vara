package edu.cit.escasinas.vara.user.repository;

import edu.cit.escasinas.vara.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public Boolean existsByEmail(String email);
    public Optional<User> findByEmail(String email);

    @Query("""
        SELECT u
        FROM User u
        WHERE NOT EXISTS (
            SELECT w FROM Wallet w WHERE w.owner = u
        )
    """)
    List<User> findUsersWithoutWallets();
}
