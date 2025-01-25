package cloud.thanhln.identity.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cloud.thanhln.identity.dto.request.RoleRequest;
import cloud.thanhln.identity.dto.response.ApiResponse;
import cloud.thanhln.identity.dto.response.RoleResponse;
import cloud.thanhln.identity.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/roles")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoleController {
    RoleService roleService;

    @PostMapping
    ApiResponse<RoleResponse> createRole(@RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<RoleResponse>> fetchAllPermission() {
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getAll())
                .build();
    }

    @DeleteMapping("/{role}")
    ApiResponse<String> deletePermission(@PathVariable String role) {
        RoleResponse currentRole = roleService.getRole(role);
        if (currentRole == null) {
            return ApiResponse.<String>builder()
                    .result("Role " + role + " not exist")
                    .build();

        } else {
            roleService.delete(role);
            return ApiResponse.<String>builder()
                    .result("Role " + role + " has been deleted")
                    .build();
        }
    }
}
