package cloud.thanhln.identity.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cloud.thanhln.identity.domain.Permission;
import cloud.thanhln.identity.dto.request.PermissionRequest;
import cloud.thanhln.identity.dto.response.PermissionResponse;
import cloud.thanhln.identity.exception.AppException;
import cloud.thanhln.identity.exception.ErrorCode;
import cloud.thanhln.identity.mapper.PermissionMapper;
import cloud.thanhln.identity.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    public PermissionResponse createPermission(PermissionRequest request) {
        if (permissionRepository.existsById(request.getName())) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }
        Permission permission = permissionMapper.toPermission(request);
        permission = permissionRepository.save(permission);
        return permissionMapper.toPermissionResponse(permission);
    }

    public List<PermissionResponse> getAll() {
        List<Permission> permissions = permissionRepository.findAll();
        return permissions.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    public PermissionResponse getPermission(String permission) {
        Permission currentPermission = permissionRepository.findById(permission).orElse(null);
        return permissionMapper.toPermissionResponse(currentPermission);
    }

    public void delete(String pemission) {
        permissionRepository.deleteById(pemission);
    }
}
