package com.warehouse.model.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role extends BaseEntity {
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleType name;
    
    private String description;
} 