package com.atahf.IntraLink.mailSender;

import com.atahf.IntraLink.user.ConfirmationToken.ConfirmationTokenDto.ConfirmationTokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@ConfigurationProperties(prefix = "application.mail")
public class MailService {

    private String email;

    private final JavaMailSender mailSender;


    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSignupConfirmation(ConfirmationTokenDto confirmationMail){
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(email);
        mailMessage.setTo(confirmationMail.getMail());
        mailMessage.setSubject("Intralink Registration Confirmation");
        mailMessage.setText("Activate your account by clicking this link: " + confirmationMail.getLink() +
                            "\nActivation link is only valid for 15 minutes, please do not forget to activate your account!\n" +
                            "\nYour temporary password is " + confirmationMail.getTmpPass() +
                            "\nThis password is valid for 1 week, please after logging in change your password!");
        mailSender.send(mailMessage);
    }
}
