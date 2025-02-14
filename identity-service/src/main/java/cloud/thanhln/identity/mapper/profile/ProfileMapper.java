package cloud.thanhln.identity.mapper.profile;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import cloud.thanhln.identity.dto.request.ProfileCreationRequest;
import cloud.thanhln.identity.dto.request.UserCreationRequest;

@Mapper(componentModel = "spring")
public interface ProfileMapper {

    @Mapping(target = "userId", ignore = true)
    ProfileCreationRequest toProfileCreationRequest(UserCreationRequest request);
}
