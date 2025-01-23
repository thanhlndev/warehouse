package cloud.thanhln.identity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cloud.thanhln.identity.domain.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {
}
