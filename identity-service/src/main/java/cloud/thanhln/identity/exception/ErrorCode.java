package cloud.thanhln.identity.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    // error of system
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid key", HttpStatus.BAD_REQUEST),
    // error of user
    USER_NOT_EXISTED(1002, "User not existed", HttpStatus.NOT_FOUND),
    USER_EXISTED(1003, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTED(1004, "Username existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1005, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1006, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    FULLNAME_INVALID(1007, "Fullname must be at least {min} characters", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1008, "Email invalid", HttpStatus.BAD_REQUEST),
    // error for authentication
    AUTHENTICATED(1009, "Authenticated", HttpStatus.OK),
    AUTHENTICATED_FAILED(1010, "Authenticated failed", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(1011, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1012, "You do not have permission", HttpStatus.FORBIDDEN),
    TOKEN_INVALID(1013, "Token invalid", HttpStatus.UNAUTHORIZED),
    // error for permission and role
    PERMISSION_EXISTED(1014, "Permission existed", HttpStatus.BAD_REQUEST),
    ROLE_EXISTED(1015, "Role existed", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1016, "Email Existed", HttpStatus.BAD_REQUEST),
    ;

    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
