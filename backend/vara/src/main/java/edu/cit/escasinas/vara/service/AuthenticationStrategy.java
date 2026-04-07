package edu.cit.escasinas.vara.service;

import edu.cit.escasinas.vara.dto.AuthResponse;
import edu.cit.escasinas.vara.enums.AuthProvider;

public interface AuthenticationStrategy<T> {
    AuthProvider getProvider();
    AuthResponse authenticate(T request);
}
