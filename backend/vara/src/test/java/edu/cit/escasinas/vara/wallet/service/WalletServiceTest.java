package edu.cit.escasinas.vara.wallet.service;

import edu.cit.escasinas.vara.user.model.User;
import edu.cit.escasinas.vara.user.repository.UserRepository;
import edu.cit.escasinas.vara.wallet.dto.WalletTransactionRetrievalRequest;
import edu.cit.escasinas.vara.wallet.dto.WithdrawalAccountSaveRequest;
import edu.cit.escasinas.vara.wallet.enums.PaymentMethod;
import edu.cit.escasinas.vara.wallet.model.Wallet;
import edu.cit.escasinas.vara.wallet.repository.WalletRepository;
import edu.cit.escasinas.vara.wallet.repository.WalletTransactionRepository;
import edu.cit.escasinas.vara.wallet.repository.WithdrawalAccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WalletServiceTest {

    @Mock WalletRepository walletRepository;
    @Mock WalletTransactionRepository walletTransactionRepository;
    @Mock UserRepository userRepository;
    @Mock WithdrawalAccountRepository withdrawalAccountRepository;

    @InjectMocks
    WalletService walletService;

    @Test
    void createWithdrawalAccountShouldSaveWhenUnique() {
        User user = new User();

        WithdrawalAccountSaveRequest req = new WithdrawalAccountSaveRequest();
        req.payoutMethod = PaymentMethod.GCASH;
        req.accountNumber = "09123456789";

        when(withdrawalAccountRepository
                .existsByOwnerAndPayoutMethodAndAccountNumber(user, PaymentMethod.GCASH, "09123456789"))
                .thenReturn(false);

        assertDoesNotThrow(() -> walletService.createWithdrawalAccount(user, req));

        verify(withdrawalAccountRepository).save(any());
    }

    @Test
    void createWithdrawalAccountShouldThrowWhenDuplicate() {
        User user = new User();

        WithdrawalAccountSaveRequest req = new WithdrawalAccountSaveRequest();
        req.payoutMethod = PaymentMethod.GCASH;
        req.accountNumber = "09123456789";

        when(withdrawalAccountRepository
                .existsByOwnerAndPayoutMethodAndAccountNumber(user, PaymentMethod.GCASH, "09123456789"))
                .thenReturn(true);

        assertThrows(ResponseStatusException.class,
                () -> walletService.createWithdrawalAccount(user, req));
    }

    @Test
    void deductWalletBalanceShouldSubtractAmount() {
        Wallet wallet = new Wallet();
        wallet.balance = new BigDecimal("1000.00");

        walletService.deductWalletBalance(wallet, new BigDecimal("250.00"));

        assertEquals(new BigDecimal("750.00"), wallet.balance);
        verify(walletRepository).save(wallet);
    }

    @Test
    void retrieveWalletTransactionShouldThrowWhenNoIdentifierProvided() {
        WalletTransactionRetrievalRequest req = new WalletTransactionRetrievalRequest();

        assertThrows(ResponseStatusException.class,
                () -> walletService.retrieveWalletTransaction(req));
    }
}