package cloud.thanhln.supplier.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import cloud.thanhln.supplier.domain.Supplier;
import cloud.thanhln.supplier.dto.request.SupplierCreationRequest;
import cloud.thanhln.supplier.dto.request.SupplierUpdateRequest;
import cloud.thanhln.supplier.dto.response.SupplierResponse;

@Mapper(componentModel = "spring")
public interface SupplierMapper {

    @Mapping(target = "id", ignore = true)
    Supplier toSupplier(SupplierCreationRequest request);

    SupplierResponse toSupplierResponse(Supplier supplier);

    @Mapping(target = "id", ignore = true)
    void updateSupplier(@MappingTarget Supplier supplier, SupplierUpdateRequest request);
}
