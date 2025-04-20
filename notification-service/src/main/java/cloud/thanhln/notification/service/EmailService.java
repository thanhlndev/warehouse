package cloud.thanhln.notification.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import brevoModel.*;
import cloud.thanhln.notification.dto.request.Recipient;
import cloud.thanhln.notification.dto.request.SendEmailRequest;
import cloud.thanhln.notification.dto.response.EmailResponse;
import cloud.thanhln.notification.exception.AppException;
import cloud.thanhln.notification.exception.ErrorCode;
import cloud.thanhln.notification.repositoryhttpclient.EmailClient;
import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class EmailService {

    EmailClient emailClient;

    @NonFinal
    @Value("${notification.brevoKey}")
    String API_KEY;

    //    public EmailResponse sendEmail(SendEmailRequest request) {
    //        log.info("_______________________________");
    //        log.info("Service: sendEmail Response");
    //        log.info("Sending email to: {}", request.getTo());
    //        EmailRequest emailRequest = EmailRequest.builder()
    //                .sender(Sender.builder()
    //                        .name("Nyx Inc")
    //                        .email("thanhln.dev@gmail.com")
    //                        .build())
    //                .to(request.getTo().stream()
    //                        .map(recipient -> Recipient.builder()
    //                                .name(recipient.getName())
    //                                .email(recipient.getEmail())
    //                                .build())
    //                        .collect(Collectors.toList()))
    //                .subject(request.getSubject())
    //                .htmlContent(request.getHtmlContent())
    //                .build();
    //
    //        try {
    //            return emailClient.sendEmail(API_KEY, emailRequest);
    //        } catch (FeignException e) {
    //            // TODO: handle exception
    //            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
    //        }
    //    }

    public List<EmailResponse> sendEmail(SendEmailRequest request) {
        log.info("_______________________________");
        log.info("Service: sendEmail1 Response");
        log.info("Sending email to: {}", request.getTo());
        List<EmailResponse> responses = new ArrayList<>();

        // Map recipients to Brevo's SendSmtpEmailTo
        //        List<SendSmtpEmailTo> recipients = request.getTo().stream()
        //                .map(recipient ->
        //                        new SendSmtpEmailTo().email(recipient.getEmail()).name(recipient.getName()))
        //                .collect(Collectors.toList());
        //
        //        // Build Brevo email request
        //        SendSmtpEmail emailRequest1 = new SendSmtpEmail();
        //        emailRequest1.setSender(new SendSmtpEmailSender().name("Nyx Inc").email("thanhln.dev@gmail.com"));
        //        emailRequest1.setTo(recipients);
        //        emailRequest1.setSubject(request.getSubject());
        //        emailRequest1.setHtmlContent(request.getHtmlContent().replace("@name", "{{name}}"));
        //
        //        try {
        //            EmailResponse response = emailClient.sendEmail1(API_KEY, emailRequest1);
        //            log.info("Email sent successfully to: {}", request.getTo());
        //            responses.add(response);
        //        } catch (FeignException e) {
        //            log.error("Failed to send email: {}", e.getMessage(), e);
        //            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        //        }
        for (Recipient recipient : request.getTo()) {
            SendSmtpEmail emailRequest = new SendSmtpEmail();
            emailRequest.setSender(new SendSmtpEmailSender().name("Nyx Inc").email("thanhln.dev@gmail.com"));

            // Set recipient
            emailRequest.setTo(Collections.singletonList(
                    new SendSmtpEmailTo().email(recipient.getEmail()).name(recipient.getName())));

            // Replace placeholder with actual name
            String personalizedHtml = request.getHtmlContent().replace("@name", recipient.getName());
            emailRequest.setHtmlContent(personalizedHtml);
            emailRequest.setSubject(request.getSubject());

            try {
                EmailResponse response = emailClient.sendEmail1(API_KEY, emailRequest);
                log.info("Email sent to: {}", recipient.getEmail());
                responses.add(response);
            } catch (FeignException e) {
                log.error("Failed to send email to {}: {}", recipient.getEmail(), e.getMessage(), e);
                throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
            }
        }
        return responses;
    }
}
