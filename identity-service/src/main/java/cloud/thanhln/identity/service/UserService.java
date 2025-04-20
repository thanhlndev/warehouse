package cloud.thanhln.identity.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    //    KafkaTemplate<String, String> kafkaTemplate;

    //    @Transactional
    public UserResponse createUserRequest(UserCreationRequest request) {
        log.info("Service: createUserRequest, username={}", request.getUsername());

        // Kiểm tra tính duy nhất
        if (userRepository.existsByUsername(request.getUsername())) {
            log.warn("Username {} already exists", request.getUsername());
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("Email {} already exists", request.getEmail());
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        // Tạo đối tượng User
        User user = userMapper.toUser(request);
        if (user.getUsername() == null || user.getUsername().isBlank()) {
            log.error("Invalid username: {}", request);
            throw new AppException(ErrorCode.USERNAME_INVALID);
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmailVerified(false);
        HashSet<Role> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);

        log.info(
                "User before save: id={}, username={}, email={}, roles={}",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRoles());

        // Lưu user và tạo profile
        try {
            if (user.getId() != null) {
                throw new IllegalArgumentException("Cannot create user with existing ID: " + user.getId());
            }
            user = userRepository.save(user);

            // Tạo profile
            ProfileCreationRequest profileCreationRequest = profileMapper.toProfileCreationRequest(request);
            profileCreationRequest.setUserId(user.getId());
            profileCreationRequest.setFullName(request.getFullName());
            profileCreationRequest.setAddress(request.getAddress());
            profileCreationRequest.setPhone(request.getPhone());

            try {
                Object profileResponse = profileClient.createProfile(profileCreationRequest);
                log.info("Profile response: {}", profileResponse);
            } catch (feign.RetryableException e) {
                log.warn("Profile service unavailable, proceeding without profile creation: {}", e.getMessage());
                // Tiếp tục mà không tạo profile, hoặc ném ngoại lệ tùy thuộc vào yêu cầu
                // throw new AppException(ErrorCode.PROFILE_CREATION_FAILED, "Profile service unavailable: " +
                // e.getMessage());
            }
        } catch (DataIntegrityViolationException e) {
            log.error("Data integrity violation while creating user: {}", user.getUsername(), e);
            throw new RuntimeException("Failed to create user due to database constraint: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error while creating user: {}", user.getUsername(), e);
            throw new RuntimeException("Unexpected error: " + e.getMessage());
        }

        // Trả về response
        return userMapper.toUserResponse(user);
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Page<UserResponse> fetchAllUsersPaged(int page, int size) {
        log.info("In method fetchAllUsersPaged, page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(userMapper::toUserResponse);
    }

    public UserResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse fetchUserById(UUID id) {
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

    public UserResponse updateUser(UUID id, UserUpdateRequest request) {
        Optional<User> userOptional = Optional.ofNullable(this.userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id)));
        User currentUser = userOptional.get();
        userMapper.updateUser(currentUser, request);
        currentUser.setPassword(passwordEncoder.encode(request.getPassword()));
        List<Role> roles = roleRepository.findAllById(request.getRoles());
        currentUser.setRoles(new HashSet<>(roles));
        return userMapper.toUserResponse(userRepository.save(currentUser));
    }

    public void deleteUser(UUID id) {
        this.userRepository.deleteById(id);
        this.profileClient.deleteProfileByUserId(id);
    }
}
