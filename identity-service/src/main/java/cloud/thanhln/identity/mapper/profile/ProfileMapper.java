package cloud.thanhln.identity.mapper.profile;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import cloud.thanhln.identity.domain.User;
import cloud.thanhln.identity.dto.request.ProfileCreationRequest;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
	@Mapping(target="userId", source = "id")
	@Mapping(target="fullName", ignore = true)
	@Mapping(target="address", ignore = true)
	@Mapping(target="phone", ignore = true)
	ProfileCreationRequest toProfileCreationRequest(User user);
}
