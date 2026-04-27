package edu.cit.escasinas.vara.auth.service;

import edu.cit.escasinas.vara.auth.dto.AuthResponse;
import edu.cit.escasinas.vara.auth.enums.AuthProvider;

public interface AuthenticationStrategy<T> {
    AuthProvider getProvider();
    AuthResponse authenticate(T request);
}
