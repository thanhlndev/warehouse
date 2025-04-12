package cloud.thanhln.identity.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cloud.thanhln.identity.constant.PredefinedRole;
import cloud.thanhln.identity.domain.Role;
import cloud.thanhln.identity.domain.User;
import cloud.thanhln.identity.dto.request.ProfileCreationRequest;
import cloud.thanhln.identity.dto.request.UserCreationRequest;
import cloud.thanhln.identity.dto.request.UserUpdateRequest;
import cloud.thanhln.identity.dto.response.UserResponse;
import cloud.thanhln.identity.exception.AppException;
import cloud.thanhln.identity.exception.ErrorCode;
import cloud.thanhln.identity.mapper.UserMapper;
import cloud.thanhln.identity.mapper.profile.ProfileMapper;
import cloud.thanhln.identity.repository.RoleRepository;
import cloud.thanhln.identity.repository.UserRepository;
import cloud.thanhln.identity.repository.httpclient.ProfileClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {

    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    ProfileClient profileClient;
    ProfileMapper profileMapper;

    public UserResponse createUserRequest(UserCreationRequest request) {
        log.info("Service: createUserRequest, username={}", request.getUsername());

        if (userRepository.existsByUsername(request.getUsername())) {
            log.warn("Username {} already exists", request.getUsername());
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userMapper.toUser(request);
        if (user.getUsername() == null || user.getUsername().isBlank()) {
            log.error("Invalid username: {}", request);
            throw new AppException(ErrorCode.USERNAME_INVALID);
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        HashSet<Role> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);

        log.info(
                "User before save: id={}, username={}, email={}, roles={}",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles());

        try {
            user = userRepository.save(user);
            ProfileCreationRequest profileCreationRequest = profileMapper.toProfileCreationRequest(user);
            profileCreationRequest.setFullName(request.getFullName());
            profileCreationRequest.setAddress(request.getAddress());
            profileCreationRequest.setPhone(request.getPhone());

            try {
                Object profileResponse = profileClient.createProfile(profileCreationRequest);
                log.info("Profile response: {}", profileResponse);
            } catch (Throwable e) {
                log.error("Profile creation failed: {}", e.getMessage(), e);
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        } catch (DataIntegrityViolationException e) {
            log.error(
                    "Data integrity violation: constraint={}, message={}", e.getMessage(), e.getMostSpecificCause(), e);
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserResponse> fetchAllUser() {
        log.info("In method fetchAllUser");
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toUserResponse).collect(Collectors.toList());
    }

    public UserResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse fetchUserById(String id) {
        log.info("In method fetchUserById");
        Optional<User> userOptional = this.userRepository.findById(id);
        User user = new User();
        if (userOptional.isPresent()) {
            user = userOptional.get();
            return userMapper.toUserResponse(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public UserResponse updateUser(String id, UserUpdateRequest request) {
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with id: " + id);
        }
        User currentUser = userOptional.get();
        userMapper.updateUser(currentUser, request);
        currentUser.setPassword(passwordEncoder.encode(request.getPassword()));
        List<Role> roles = roleRepository.findAllById(request.getRoles());
        currentUser.setRoles(new HashSet<>(roles));
        return userMapper.toUserResponse(userRepository.save(currentUser));
    }

    public void deleteUser(String id) {
        this.userRepository.deleteById(id);
        this.profileClient.deleteProfileByUserId(id);
    }
}
