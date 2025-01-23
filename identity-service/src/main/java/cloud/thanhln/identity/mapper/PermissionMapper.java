package cloud.thanhln.identity.mapper;

import org.mapstruct.Mapper;

import cloud.thanhln.identity.domain.Permission;
import cloud.thanhln.identity.dto.request.PermissionRequest;
import cloud.thanhln.identity.dto.response.PermissionResponse;

// @Component
@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
