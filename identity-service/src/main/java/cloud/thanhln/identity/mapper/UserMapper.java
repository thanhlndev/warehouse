package cloud.thanhln.identity.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import cloud.thanhln.identity.domain.User;
import cloud.thanhln.identity.dto.request.UserCreationRequest;
import cloud.thanhln.identity.dto.request.UserUpdateRequest;
import cloud.thanhln.identity.dto.response.UserResponse;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "emailVerified", ignore = true)
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "emailVerified", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
