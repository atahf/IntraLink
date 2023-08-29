package com.atahf.IntraLink.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    private static String credentials = System.getenv("FIREBASE_CREDENTIALS");

    @Bean
    public FirebaseApp initializeFirebaseApp() throws IOException {
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(
                        new ByteArrayInputStream(credentials.getBytes(StandardCharsets.UTF_8))))
                .setStorageBucket("intralink-94cfb.appspot.com")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}
