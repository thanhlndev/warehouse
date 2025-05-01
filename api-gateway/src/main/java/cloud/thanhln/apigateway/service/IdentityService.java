package cloud.thanhln.api_gateway.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.service.annotation.PostExchange;

import cloud.thanhln.api_gateway.dto.request.IntrospectTokenRequest;
import cloud.thanhln.api_gateway.dto.response.ApiResponse;
import cloud.thanhln.api_gateway.dto.response.IntrospectTokenResponse;
import cloud.thanhln.api_gateway.repository.IdentityClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IdentityService {
IdentityClient identityClient;
	
	@PostExchange(url = "/auth/introspect", contentType = MediaType.APPLICATION_JSON_VALUE)
	public Mono <ApiResponse<IntrospectTokenResponse>> introspect(String token){
		return identityClient.introspect(
				IntrospectTokenRequest.builder()
				.token(token)
				.build());
	}
}
