package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.enums.AuthProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class AuthenticationStrategyFactory {

    private final Map<AuthProvider, AuthenticationStrategy<?>> strategies;

    public AuthenticationStrategyFactory(List<AuthenticationStrategy<?>> strategyList) {
        this.strategies = strategyList.stream()
                .collect(Collectors.toMap(
                        AuthenticationStrategy::getProvider,
                        Function.identity()
                ));
    }

    public AuthenticationStrategy<?> getStrategy(AuthProvider provider) {
        AuthenticationStrategy<?> strategy = strategies.get(provider);

        if (strategy == null) {
            throw new RuntimeException("Unsupported auth provider: " + provider);
        }

        return strategy;
    }
}
