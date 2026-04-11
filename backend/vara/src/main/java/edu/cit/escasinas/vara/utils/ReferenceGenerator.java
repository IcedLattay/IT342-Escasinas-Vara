package edu.cit.escasinas.vara.utils;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class ReferenceGenerator {
    private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom random = new SecureRandom();
    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("yyMMdd");

    public static String generateReference(String prefix) {

        String date = LocalDate.now().format(DATE_FORMAT);

        StringBuilder ref = new StringBuilder(prefix + "-" + date + "-");

        for (int i = 0; i < 6; i++) {
            ref.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }

        return ref.toString();
    }
}
