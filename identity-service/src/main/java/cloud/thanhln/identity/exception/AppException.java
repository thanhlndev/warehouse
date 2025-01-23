package cloud.thanhln.identity.exception;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;

@Getter
@Setter
public class AppException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;
    private ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
