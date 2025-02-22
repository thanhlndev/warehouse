package cloud.thanhln.notification.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import cloud.thanhln.notification.dto.request.EmailRequest;
import cloud.thanhln.notification.dto.request.SendEmailRequest;
import cloud.thanhln.notification.dto.request.Sender;
import cloud.thanhln.notification.dto.response.EmailResponse;
import cloud.thanhln.notification.exception.AppException;
import cloud.thanhln.notification.exception.ErrorCode;
import cloud.thanhln.notification.repositoryhttpclient.EmailClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {

    EmailClient emailClient;

    @NonFinal
    @Value("${notification.brevoKey}")
    String API_KEY;

    public EmailResponse sendEmail(SendEmailRequest request) {

        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("Nyx Inc")
                        .email("thanhln.dev@gmail.com")
                        .build())
                .to(List.of(request.getTo()))
                .subject(request.getSubject())
                .htmlContent(request.getHtmlContent())
                .build();

        try {
            return emailClient.sendEmail(API_KEY, emailRequest);
        } catch (FeignException e) {
            // TODO: handle exception
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }
}
