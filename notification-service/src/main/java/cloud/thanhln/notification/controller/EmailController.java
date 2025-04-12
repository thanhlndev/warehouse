package cloud.thanhln.notification.controller;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cloud.thanhln.notification.dto.request.SendEmailRequest;
import cloud.thanhln.notification.dto.response.ApiResponse;
import cloud.thanhln.notification.dto.response.EmailResponse;
import cloud.thanhln.notification.service.EmailService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class EmailController {

    EmailService emailService;

    @PostMapping("/email/send")
    ApiResponse<EmailResponse> sendEmail(@RequestBody SendEmailRequest request) {
        emailService.sendEmail(request);
        return ApiResponse.<EmailResponse>builder()
                .result(emailService.sendEmail(request))
                .build();
    }

    @KafkaListener(topics = "onboard-successful")
    public void listen(String message) {
        log.info("Message received: {}", message);
    }
}
