package cloud.thanhln.profile.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import cloud.thanhln.profile.domain.UserProfile;
import cloud.thanhln.profile.dto.request.ProfileCreationRequest;
import cloud.thanhln.profile.dto.response.UserProfileResponse;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {

    @Mapping(target = "id", ignore = true)
    UserProfile toUserProfile(ProfileCreationRequest request);

    UserProfileResponse toUserProfileResponse(UserProfile entity);
}
