package edu.cit.escasinas.vara.repository;

import edu.cit.escasinas.vara.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public Boolean existsByEmail(String email);
    public Optional<User> findByEmail(String email);
}
