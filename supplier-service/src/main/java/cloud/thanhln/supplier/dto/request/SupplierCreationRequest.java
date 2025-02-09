package cloud.thanhln.supplier.dto.request;

import jakarta.persistence.Column;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SupplierCreationRequest {

    @Column(nullable = false, unique = true)
    String name;

    String email;
    String phone;
    String address;
}
