package edu.cit.escasinas.vara.wallet.model;

import edu.cit.escasinas.vara.wallet.enums.PaymentMethod;
import edu.cit.escasinas.vara.user.model.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name="withdrawal_accounts",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = {"owner_id", "payout_method", "account_number"})
        }
)
public class WithdrawalAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long withdrawalAccountId;

    // Foreign Keys ────────────────────────────────────────────────────────────────

    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    public User owner;

    // ─────────────────────────────────────────────────────────────────────────────

    @Enumerated(EnumType.STRING)
    @Column(name = "payout_method")
    public PaymentMethod payoutMethod;

    @Column(name = "account_number")
    public String accountNumber;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    public LocalDateTime createdAt;

    public WithdrawalAccount() {}

    public WithdrawalAccount(
            User owner,
            PaymentMethod payoutMethod,
            String accountNumber
    ) {
        this.owner = owner;
        this.payoutMethod = payoutMethod;
        this.accountNumber = accountNumber;
    }

    @OneToMany(mappedBy = "withdrawalAccount")
    public List<WalletTransaction> walletTransactions = new ArrayList<>();
}
