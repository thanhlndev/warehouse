package cloud.thanhln.supplier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cloud.thanhln.supplier.domain.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, String> {
    Optional<Supplier> findByName(String name);
}
