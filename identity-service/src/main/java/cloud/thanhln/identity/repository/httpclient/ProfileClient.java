package cloud.thanhln.identity.repository.httpclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import cloud.thanhln.identity.dto.request.ProfileCreationRequest;

import org.springframework.http.MediaType;

@FeignClient(name = "profile-service", url = "${app.services.profile}")
public interface ProfileClient {

	@PostMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE )
	Object createProfile (@RequestBody ProfileCreationRequest request);
	
}
