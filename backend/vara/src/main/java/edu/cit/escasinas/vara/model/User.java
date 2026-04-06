package edu.cit.escasinas.vara.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long userId;

    @Column(name = "first_name")
    public String firstname;

    @Column(name = "last_name")
    public String lastname;

    @Column(name = "email", unique = true)
    public String email;

    public String password;

    @Column(name = "is_active")
    public Boolean isActive;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    public LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    public LocalDateTime updatedAt;

    public User(){}

    public User(
            String firstname,
            String lastname,
            String email,
            String password
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    @OneToMany(mappedBy = "owner")
    public List<WalletTransaction> walletTransactions = new ArrayList<>();

    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL)
    public Wallet wallet;
}
