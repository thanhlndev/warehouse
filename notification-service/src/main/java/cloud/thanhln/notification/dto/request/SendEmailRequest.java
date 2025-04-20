package cloud.thanhln.notification.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SendEmailRequest {
    @NotEmpty
    @Valid
    List<Recipient> to;

    @NotBlank
    String subject;

    @NotBlank
    @Pattern(regexp = ".*@name.*|.*\\{\\{name\\}\\}.*", message = "htmlContent must contain @name or {{name}}")
    String htmlContent;
}
