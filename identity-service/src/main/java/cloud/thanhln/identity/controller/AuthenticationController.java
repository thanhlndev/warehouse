package cloud.thanhln.identity.controller;

import java.text.ParseException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.jose.JOSEException;

import cloud.thanhln.identity.dto.request.ApiResponse;
import cloud.thanhln.identity.dto.request.AuthenticationRequest;
import cloud.thanhln.identity.dto.request.IntrospectTokenRequest;
import cloud.thanhln.identity.dto.request.LogoutRequest;
import cloud.thanhln.identity.dto.request.RefreshRequest;
import cloud.thanhln.identity.dto.response.AuthenticationResponse;
import cloud.thanhln.identity.dto.response.IntrospectTokenResponse;
import cloud.thanhln.identity.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectTokenResponse> authentication(@RequestBody IntrospectTokenRequest request)
            throws ParseException, JOSEException {
        IntrospectTokenResponse result = authenticationService.introspectTokenResponse(request);
        return ApiResponse.<IntrospectTokenResponse>builder().result(result).build();
    }

    @PostMapping("/logout")
    ApiResponse<String> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<String>builder().result("Logout successfully").build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        AuthenticationResponse result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }
}
