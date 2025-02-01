package cloud.thanhln.identity.repository.httpclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import cloud.thanhln.identity.configuration.AuthenticationRequestInterceptor;
import cloud.thanhln.identity.dto.request.ProfileCreationRequest;
import cloud.thanhln.identity.dto.response.ApiResponse;
import cloud.thanhln.identity.dto.response.UserProfileResponse;

@FeignClient(
        name = "profile-service",
        url = "${app.services.profile}",
        configuration = {AuthenticationRequestInterceptor.class})
public interface ProfileClient {

    @PostMapping(value = "/internal/users", produces = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<UserProfileResponse> createProfile(@RequestBody ProfileCreationRequest request);
    //	Object createProfile (@RequestBody ProfileCreationRequest request);

    @DeleteMapping(value = "/users/delete/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    void deleteProfileByUserId(String userId);
}
