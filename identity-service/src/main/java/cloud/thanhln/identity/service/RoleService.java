package cloud.thanhln.identity.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Service;

import cloud.thanhln.identity.domain.Permission;
import cloud.thanhln.identity.domain.Role;
import cloud.thanhln.identity.dto.request.RoleRequest;
import cloud.thanhln.identity.dto.response.RoleResponse;
import cloud.thanhln.identity.exception.AppException;
import cloud.thanhln.identity.exception.ErrorCode;
import cloud.thanhln.identity.mapper.RoleMapper;
import cloud.thanhln.identity.repository.PermissionRepository;
import cloud.thanhln.identity.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        if (roleRepository.existsById(request.getName())) {
            throw new AppException(ErrorCode.ROLE_EXISTED);
        }
        List<Permission> permissions = permissionRepository.findAllById(request.getPermissions());
        Role role = roleMapper.toRole(request);
        role.setPermissions(new HashSet<>(permissions));
        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public RoleResponse getRole(String role) {
        return roleMapper.toRoleResponse(roleRepository.findById(role).orElse(null));
    }

    public void delete(String role) {
        roleRepository.deleteById(role);
    }
}
