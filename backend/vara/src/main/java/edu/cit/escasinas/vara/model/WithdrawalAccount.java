package edu.cit.escasinas.vara.model;

import jakarta.persistence.*;

@Entity
@Table(name="withdrawal_accounts")
public class WithdrawalAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long walletTransactionId;
}
