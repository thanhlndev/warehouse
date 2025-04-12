package cloud.thanhln.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cloud.thanhln.product.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {}
