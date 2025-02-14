package cloud.thanhln.notification.controller;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import cloud.thanhln.event.dto.NotificationEvent;
import cloud.thanhln.notification.dto.request.Recipient;
import cloud.thanhln.notification.dto.request.SendEmailRequest;
import cloud.thanhln.notification.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NotificationController {

    EmailService emailService;

    @KafkaListener(topics = "notification-delivery")
    public void listionNotificationDelivery(NotificationEvent notificationEvent) {
        log.info("Message kafka: {}", notificationEvent);

        emailService.sendEmail(SendEmailRequest.builder()
                .to(Recipient.builder().email(notificationEvent.getRecipient()).build())
                .subject(notificationEvent.getSubject())
                .htmlContent(notificationEvent.getBody())
                .build());
    }
}
