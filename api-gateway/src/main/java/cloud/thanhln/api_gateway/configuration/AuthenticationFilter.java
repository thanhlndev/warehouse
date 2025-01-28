package cloud.thanhln.api_gateway.configuration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;

import java.util.Arrays;
import java.util.List;

import org.springframework.util.CollectionUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cloud.thanhln.api_gateway.dto.response.ApiResponse;
import cloud.thanhln.api_gateway.service.IdentityService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE, makeFinal = true)
@Slf4j
public class AuthenticationFilter implements GlobalFilter, Ordered{

	IdentityService identityService;
	ObjectMapper objectMapper;
	
	@NonFinal
	private String[] PUBLIC_ENDPOINTS = {
			"/identity/auth/.*",
			"/identity/users/registration",};
	
	@NonFinal
	@Value("${app.api-prefix}")
	private String apiPrefix;

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		// TODO Auto-generated method stub
		log.info("Enter authentication filter...");
		if (isPublicEnpoint(exchange.getRequest())) {
            return chain.filter(exchange);}
		//get token from authorization(identity-service)
		List<String> authHeaders = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);
		if (CollectionUtils.isEmpty(authHeaders)) 
			return unauthenticated(exchange.getResponse());
		String token = authHeaders.getFirst().replace("Bearer", "");
		log.info("Token: {}", token);
		
		return identityService.introspect(token)
		        .flatMap(t -> {
		            if (t.getResult().isValid()) {
		                log.info("Result: true");
		                return chain.filter(exchange); // Token is valid, proceed with the request
		            } else {
		                log.info("Result: false");
		                return unauthenticated(exchange.getResponse()); // Token is invalid
		            }
		        })
		        .onErrorResume(e -> {
		            log.error("Error during token introspection: {}", e.getMessage(), e);
		            return unauthenticated(exchange.getResponse()); // Handle introspection errors
		        });
	}
	
	@Override
	public int getOrder() {
		// TODO Auto-generated method stub
		return -1;
	}
	
	private boolean isPublicEnpoint(ServerHttpRequest request) {
		return Arrays.stream(PUBLIC_ENDPOINTS).anyMatch(s -> request.getURI().getPath().matches(apiPrefix + s));
		
	}
	 Mono<Void> unauthenticated(ServerHttpResponse response){
	        ApiResponse<?> apiResponse = ApiResponse.builder()
	                .code(1401)
	                .message("Unauthenticated")
	                .build();

	        String body = null;
	        try {
	            body = objectMapper.writeValueAsString(apiResponse);
	        } catch (JsonProcessingException e) {
	            throw new RuntimeException(e);
	        }

	        response.setStatusCode(HttpStatus.UNAUTHORIZED);
	        response.getHeaders().add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

	        return response.writeWith(
	                Mono.just(response.bufferFactory().wrap(body.getBytes())));
	    }

}
