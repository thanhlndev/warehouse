package cloud.thanhln.apigateway.repository;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;

import cloud.thanhln.apigateway.dto.request.IntrospectTokenRequest;
import cloud.thanhln.apigateway.dto.response.ApiResponse;
import cloud.thanhln.apigateway.dto.response.IntrospectTokenResponse;
import reactor.core.publisher.Mono;

public interface IdentityClient {
	
	@PostExchange(url = "/auth/introspect", contentType = MediaType.APPLICATION_JSON_VALUE)
	Mono <ApiResponse<IntrospectTokenResponse>> introspect(@RequestBody IntrospectTokenRequest request);

}
