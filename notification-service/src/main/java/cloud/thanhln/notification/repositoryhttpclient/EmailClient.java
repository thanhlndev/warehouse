package cloud.thanhln.notification.repositoryhttpclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import brevoModel.SendSmtpEmail;
import cloud.thanhln.notification.dto.response.EmailResponse;

@FeignClient(name = "email-client", url = "${notification.brevoApiUrl}")
public interface EmailClient {

    //    @PostMapping(value = "/v3/smtp/email", produces = MediaType.APPLICATION_JSON_VALUE)
    //    EmailResponse sendEmail(@RequestHeader("api-key") String apiKey, @RequestBody EmailRequest request);

    @PostMapping(value = "/v3/smtp/email", produces = MediaType.APPLICATION_JSON_VALUE)
    EmailResponse sendEmail(@RequestHeader("api-key") String apiKey, @RequestBody SendSmtpEmail emailRequest);
}
