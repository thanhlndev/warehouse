package cloud.thanhln.identity.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import cloud.thanhln.identity.domain.Role;
import cloud.thanhln.identity.dto.request.RoleRequest;
import cloud.thanhln.identity.dto.response.RoleResponse;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
