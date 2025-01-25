package cloud.thanhln.api_gateway.repository;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;

import cloud.thanhln.api_gateway.dto.request.IntrospectTokenRequest;
import cloud.thanhln.api_gateway.dto.response.ApiResponse;
import cloud.thanhln.api_gateway.dto.response.IntrospectTokenResponse;
import reactor.core.publisher.Mono;

public interface IdentityClient {
	
	@PostExchange(url = "/auth/introspect", contentType = MediaType.APPLICATION_JSON_VALUE)
	Mono <ApiResponse<IntrospectTokenResponse>> introspect(@RequestBody IntrospectTokenRequest request);

}
