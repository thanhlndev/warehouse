package com.warehouse.model.user.dto;

import java.util.Set;
import java.util.UUID;

import lombok.Data;

@Data
public class UserDTO {
    private UUID id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private boolean enabled;
    private Set<RoleType> roles;
} 