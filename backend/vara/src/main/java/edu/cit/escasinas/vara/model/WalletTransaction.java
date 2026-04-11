package edu.cit.escasinas.vara.model;

import edu.cit.escasinas.vara.enums.PaymentMethod;
import edu.cit.escasinas.vara.enums.WalletTransactionStatus;
import edu.cit.escasinas.vara.enums.WalletTransactionType;
import edu.cit.escasinas.vara.service.UserService;
import edu.cit.escasinas.vara.utils.ReferenceGenerator;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="wallet_transactions")
public class WalletTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long walletTransactionId;

    // Foreign Keys ────────────────────────────────────────────────────────────────

    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    public User owner;

    @ManyToOne(optional = true)
    @JoinColumn(name = "withdrawal_account_id", nullable = true)
    public WithdrawalAccount withdrawalAccount;

    // ─────────────────────────────────────────────────────────────────────────────

    @Enumerated(EnumType.STRING)
    public WalletTransactionType type;

    @Column(name = "external_reference_id", unique = true)
    public String externalReferenceId;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = true)
    public PaymentMethod paymentMethod;

    public BigDecimal amount;

    @Enumerated(EnumType.STRING)
    public WalletTransactionStatus status;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    public LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    public LocalDateTime updatedAt;

    public WalletTransaction() {}

    public WalletTransaction(
        User owner,
        String externalReferenceId,
        PaymentMethod paymentMethod,
        BigDecimal amount
    ) {
        this.owner = owner;
        type = WalletTransactionType.DEPOSIT;
        this.externalReferenceId = externalReferenceId;
        this.paymentMethod = paymentMethod;
        this.amount = amount;
        status = WalletTransactionStatus.PENDING;
    }

    public WalletTransaction(
        User owner,
        String externalReferenceId,
        WithdrawalAccount withdrawalAccount,
        BigDecimal amount
    ) {
        this.owner = owner;
        type = WalletTransactionType.WITHDRAWAL;
        this.externalReferenceId = externalReferenceId;
        this.withdrawalAccount = withdrawalAccount;
        this.amount = amount;
        status = WalletTransactionStatus.PENDING;
    }
}
