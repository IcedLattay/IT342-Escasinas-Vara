package edu.cit.escasinas.vara.security;

import edu.cit.escasinas.vara.dto.AuthResponse;
import edu.cit.escasinas.vara.model.User;
import edu.cit.escasinas.vara.service.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final AuthService authService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    public OAuth2LoginSuccessHandler(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof OAuth2User oauth2User)) {
            response.sendRedirect(frontendUrl + "/home?error=" + urlEncode("Invalid OAuth2 principal"));
            return;
        }

        try {
            AuthResponse authResponse = authService.authenticateWithGoogleOAuth2User(oauth2User);
            String token = authResponse.getToken();

            String cookieHeader = String.format(
                    "token=%s; Path=/; HttpOnly; Max-Age=%d; SameSite=Lax",
                    token,
                    24 * 60 * 60
            );

            response.addHeader("Set-Cookie", cookieHeader);

            response.sendRedirect(frontendUrl + "/home");

        } catch (RuntimeException e) {
            response.sendRedirect(frontendUrl + "/home?error=" + urlEncode(e.getMessage()));
        }
    }

    private String urlEncode(String value) {
        return URLEncoder.encode(value == null ? "" : value, StandardCharsets.UTF_8);
    }
}
