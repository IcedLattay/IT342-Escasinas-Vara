package edu.cit.escasinas.vara.model;

import edu.cit.escasinas.vara.enums.WalletCurrency;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name="wallets")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long walletId;

    // Foreign Keys ────────────────────────────────────────────────────────────────

    @OneToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false, unique = true)
    public User owner;

    // ─────────────────────────────────────────────────────────────────────────────

    public BigDecimal balance;

    @Enumerated(EnumType.STRING)
    public WalletCurrency currency;

    public Wallet() {}

    public Wallet(WalletCurrency currency) {
        balance = BigDecimal.ZERO;
        this.currency = currency;
    }


    public Wallet(User owner, WalletCurrency currency) {
        this.owner = owner;
        balance = BigDecimal.ZERO;
        this.currency = currency;
    }
}
