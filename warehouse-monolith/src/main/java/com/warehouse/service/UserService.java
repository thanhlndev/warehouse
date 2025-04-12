package com.warehouse.service;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserDTO createUser(CreateUserDTO createUserDTO);
    UserDTO getUserById(UUID id);
    UserDTO getUserByUsername(String username);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(UUID id, CreateUserDTO updateUserDTO);
    void deleteUser(UUID id);
    AuthResponseDTO login(LoginDTO loginDTO);
    User getCurrentUser();
} 