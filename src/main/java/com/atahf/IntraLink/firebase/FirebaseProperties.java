package com.atahf.IntraLink.firebase;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@AllArgsConstructor
@Component
@ConfigurationProperties(prefix = "application.firebase")
public class FirebaseProperties {
    private String credentials;
}
