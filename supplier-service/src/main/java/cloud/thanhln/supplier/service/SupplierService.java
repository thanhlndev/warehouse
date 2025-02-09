package cloud.thanhln.supplier.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import cloud.thanhln.supplier.domain.Supplier;
import cloud.thanhln.supplier.dto.request.SupplierCreationRequest;
import cloud.thanhln.supplier.dto.request.SupplierUpdateRequest;
import cloud.thanhln.supplier.dto.response.SupplierResponse;
import cloud.thanhln.supplier.mapper.SupplierMapper;
import cloud.thanhln.supplier.repository.SupplierRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SupplierService {

    SupplierRepository supplierRespository;
    SupplierMapper supplierMapper;

    @PreAuthorize(
            "hasAuthority(T(cloud.thanhln.identity.constant.PredefinedPermission).SUPPLIER) or hasRole(T(cloud.thanhln.identity.constant.PredefinedRole).ADMIN_ROLE)")
    public SupplierResponse createSupplier(SupplierCreationRequest request) {
        Supplier supplier = supplierMapper.toSupplier(request);
        supplierRespository.save(supplier);
        return supplierMapper.toSupplierResponse(supplier);
    }

    @PreAuthorize(
            "hasAuthority(T(cloud.thanhln.identity.constant.PredefinedPermission).SUPPLIER) or hasRole(T(cloud.thanhln.identity.constant.PredefinedRole).ADMIN_ROLE) or hasRole(T(cloud.thanhln.identity.constant.PredefinedRole).WAREHOUSE_MANAGER_ROLE)")
    public List<SupplierResponse> fetchAllSuppliers() {
        List<Supplier> suppliers = supplierRespository.findAll();
        return suppliers.stream().map(supplierMapper::toSupplierResponse).collect(Collectors.toList());
    }

    @PreAuthorize(
            "hasAuthority(T(cloud.thanhln.identity.constant.PredefinedPermission).SUPPLIER) or hasRole(T(cloud.thanhln.identity.constant.PredefinedRole).ADMIN_ROLE) or hasRole(T(cloud.thanhln.identity.constant.PredefinedRole).WAREHOUSE_MANAGER_ROLE)")
    public SupplierResponse getSupplier(String id) {
        Supplier supplier = supplierRespository.findById(id).orElseThrow();
        return supplierMapper.toSupplierResponse(supplier);
    }

    @PreAuthorize(
            "hasAuthority(T(cloud.thanhln.identity.constant.PredefinedPermission).SUPPLIER) or hasRole(T(cloud.thanhln.identity.constant.PredefinedRole).ADMIN_ROLE)")
    public SupplierResponse updateSupplier(
            @PathVariable String supplierId, @RequestBody SupplierUpdateRequest request) {
        Optional<Supplier> currentSupplier = Optional.ofNullable(
                supplierRespository.findById(supplierId).orElseThrow(() -> new RuntimeException("Supplier not found")));
        Supplier supplier = currentSupplier.get();
        supplierMapper.updateSupplier(supplier, request);
        supplierRespository.save(supplier);
        return supplierMapper.toSupplierResponse(supplier);
    }

    @PreAuthorize(
            "hasAuthority(T(cloud.thanhln.identity.constant.PredefinedPermission).SUPPLIER) or hasRole(T(cloud.thanhln.identity.constant.PredefinedRole).ADMIN_ROLE)")
    public void deleteSupplier(String id) {
        supplierRespository.deleteById(id);
    }
}
