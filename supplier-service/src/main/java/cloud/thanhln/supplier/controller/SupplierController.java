package cloud.thanhln.supplier.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cloud.thanhln.supplier.dto.request.SupplierCreationRequest;
import cloud.thanhln.supplier.dto.request.SupplierUpdateRequest;
import cloud.thanhln.supplier.dto.response.ApiResponse;
import cloud.thanhln.supplier.dto.response.SupplierResponse;
import cloud.thanhln.supplier.service.SupplierService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/suppliers")
@Slf4j
public class SupplierController {

    SupplierService supplierService;

    @PostMapping("/createSupplier")
    ApiResponse<SupplierResponse> createSupplier(@RequestBody SupplierCreationRequest request) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.createSupplier(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<SupplierResponse>> getAllSupplier() {
        return ApiResponse.<List<SupplierResponse>>builder()
                .result(supplierService.fetchAllSuppliers())
                .build();
    }

    @GetMapping("/{supplierId}")
    public ApiResponse<SupplierResponse> getSupplier(String supplierId) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.getSupplier(supplierId))
                .build();
    }

    @PutMapping("/{supplierId}")
    public ApiResponse<SupplierResponse> updateSupplier(
            @PathVariable String supplierId, @RequestBody SupplierUpdateRequest request) {
        return ApiResponse.<SupplierResponse>builder()
                .result(supplierService.updateSupplier(supplierId, request))
                .build();
    }

    @DeleteMapping("/{supplierId}")
    public ApiResponse<String> deleteSupplier(String supplierId) {
        supplierService.deleteSupplier(supplierId);
        return ApiResponse.<String>builder()
                .result("Supplier have been deleted")
                .build();
    }
}
