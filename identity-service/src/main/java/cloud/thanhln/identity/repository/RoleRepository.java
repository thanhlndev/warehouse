package cloud.thanhln.identity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cloud.thanhln.identity.domain.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {}
