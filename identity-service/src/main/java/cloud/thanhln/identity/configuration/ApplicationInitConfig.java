package cloud.thanhln.identity.configuration;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import cloud.thanhln.identity.constant.PredefinePermission;
import cloud.thanhln.identity.constant.PredefinedRole;
import cloud.thanhln.identity.domain.Permission;
import cloud.thanhln.identity.domain.Role;
import cloud.thanhln.identity.domain.User;
import cloud.thanhln.identity.repository.PermissionRepository;
import cloud.thanhln.identity.repository.RoleRepository;
import cloud.thanhln.identity.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;
    //    ProfileClient profileClient;
    //    ProfileMapper profileMapper;
    // @Bean
    // ApplicationRunner applicationRunner(UserRepository userRepository) {
    // return args -> {
    // if (userRepository.findByUsername("admin").isEmpty()) {
    // // var roles = new HashSet<String>();
    // var roles = new HashSet<>();
    // roles.add(Role.ADMIN.name());
    // User admin = User.builder()
    // .username("admin")
    // // .roles(roles)
    // .password(passwordEncoder.encode("admin"))
    // .fullName("Admin")
    // .build();
    // userRepository.save(admin);
    // log.warn("Admin account created with username: admin and password: admin");
    // }
    // };
    // }
    @NonFinal
    @Value("${admin-account.username}")
    protected String ADMIN_USERNAME;

    @NonFinal
    @Value("${admin-account.password}")
    protected String ADMIN_PASSWORD;

    @NonFinal
    @Value("${admin-account.fullname}")
    protected String ADMIN_FULLNAME;

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(
            UserRepository userRepository, RoleRepository roleRepository, PermissionRepository permissionRepository) {
        log.info("Initializing application.....");
        return args -> {
            if (userRepository.findByUsername(ADMIN_USERNAME).isEmpty()) {
                // Create role
                roleRepository.save(Role.builder()
                        .name(PredefinedRole.USER_ROLE)
                        .description("User role")
                        .build());

                Role adminRole = roleRepository.save(Role.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());
                // Create Permission
                permissionRepository.save(Permission.builder()
                        .name(PredefinePermission.WAREHOUSE_MANAGER)
                        .description("Quản lý kho hàng")
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinePermission.INVENTORY_CONTROLLER)
                        .description("Kiểm kê kho hàng")
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinePermission.WAREHOUSE_OPERATOR)
                        .description("Nhân viên kho hàng")
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinePermission.ORDER_FULFILLMENT)
                        .description("Nhân viên xử lý đơn hàng")
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinePermission.SUPPLIER)
                        .description("Nhà cung cấp")
                        .build());

                // Create admin account
                HashSet<Role> roles = new HashSet<>();
                roles.add(adminRole);
                // Tạo permission
                permissionRepository.save(Permission.builder()
                        .name(PredefinedRole.WAREHOUSE_MANAGER)
                        .description(PredefinedRole.des_WM)
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinedRole.INVENTORY_CONTROLLER)
                        .description(PredefinedRole.des_IC)
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinedRole.WAREHOUSE_OPERATOR)
                        .description(PredefinedRole.des_WO)
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinedRole.ORDER_FULFILLMENT)
                        .description(PredefinedRole.des_OF)
                        .build());
                permissionRepository.save(Permission.builder()
                        .name(PredefinedRole.SUPPLIER)
                        .description(PredefinedRole.des_SUPPLIER)
                        .build());
                log.warn("Permissions has been created!");
                // Tạo user ADMIN
                User user = User.builder()
                        .username(ADMIN_USERNAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(roles)
                        .build();
                userRepository.save(user);

                //                ProfileCreationRequest profileCreationRequest =
                // profileMapper.toProfileCreationRequest(user);
                //                profileCreationRequest.setFullName(ADMIN_FULLNAME);
                //                profileClient.createProfile(profileCreationRequest);

                log.warn("admin user has been created with default password: admin, please change it");
            }
            log.info("Application initialization completed .....");
        };
    }
}
