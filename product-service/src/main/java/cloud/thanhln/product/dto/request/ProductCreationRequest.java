package cloud.thanhln.product.dto.request;

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
public class ProductCreationRequest {
    String name;

    @Column(name = "price", columnDefinition = "decimal(18,3)")
    Integer price;

    String description;
    String manufacturer;
}
