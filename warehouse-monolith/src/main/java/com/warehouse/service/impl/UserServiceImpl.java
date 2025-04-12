package com.warehouse.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public UserDTO createUser(CreateUserDTO createUserDTO) {
        if (userRepository.existsByUsername(createUserDTO.getUsername())) {
            throw new BusinessException("Username is already taken");
        }
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new BusinessException("Email is already in use");
        }

        User user = new User();
        user.setUsername(createUserDTO.getUsername());
        user.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        user.setEmail(createUserDTO.getEmail());
        user.setFirstName(createUserDTO.getFirstName());
        user.setLastName(createUserDTO.getLastName());

        Set<Role> roles = new HashSet<>();
        if (createUserDTO.getRoles() != null) {
            createUserDTO.getRoles().forEach(roleType -> {
                Role role = roleRepository.findByName(roleType)
                    .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleType));
                roles.add(role);
            });
        } else {
            Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", RoleType.ROLE_USER));
            roles.add(userRole);
        }
        user.setRoles(roles);

        return convertToDTO(userRepository.save(user));
    }

    @Override
    public UserDTO getUserById(UUID id) {
        return userRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .map(this::convertToDTO)
            .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserDTO updateUser(UUID id, CreateUserDTO updateUserDTO) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        if (!user.getUsername().equals(updateUserDTO.getUsername()) &&
            userRepository.existsByUsername(updateUserDTO.getUsername())) {
            throw new BusinessException("Username is already taken");
        }

        if (!user.getEmail().equals(updateUserDTO.getEmail()) &&
            userRepository.existsByEmail(updateUserDTO.getEmail())) {
            throw new BusinessException("Email is already in use");
        }

        user.setUsername(updateUserDTO.getUsername());
        if (updateUserDTO.getPassword() != null && !updateUserDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updateUserDTO.getPassword()));
        }
        user.setEmail(updateUserDTO.getEmail());
        user.setFirstName(updateUserDTO.getFirstName());
        user.setLastName(updateUserDTO.getLastName());

        if (updateUserDTO.getRoles() != null) {
            Set<Role> roles = new HashSet<>();
            updateUserDTO.getRoles().forEach(roleType -> {
                Role role = roleRepository.findByName(roleType)
                    .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleType));
                roles.add(role);
            });
            user.setRoles(roles);
        }

        return convertToDTO(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public AuthResponseDTO login(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(loginDTO.getUsername())
            .orElseThrow(() -> new ResourceNotFoundException("User", "username", loginDTO.getUsername()));

        return new AuthResponseDTO(jwt, "Bearer", convertToDTO(user));
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEnabled(user.isEnabled());
        dto.setRoles(user.getRoles().stream()
            .map(role -> role.getName())
            .collect(Collectors.toSet()));
        return dto;
    }
} 