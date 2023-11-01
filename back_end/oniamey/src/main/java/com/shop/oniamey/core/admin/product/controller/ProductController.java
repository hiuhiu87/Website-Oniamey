package com.shop.oniamey.core.admin.product.controller;

import com.shop.oniamey.core.admin.product.model.request.AddProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.request.DeleteProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.request.ProductRequest;
import com.shop.oniamey.core.admin.product.model.request.UpdateProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.response.ProductDetailListResponse;
import com.shop.oniamey.core.admin.product.model.response.ProductDetailResponse;
import com.shop.oniamey.core.admin.product.model.response.ProductListResponse;
import com.shop.oniamey.core.admin.product.model.response.ProductResponse;
import com.shop.oniamey.core.admin.product.service.IProductDetailService;
import com.shop.oniamey.core.admin.product.service.IProductService;
import com.shop.oniamey.entity.Product;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/product")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;

    private final IProductDetailService productDetailService;

    @GetMapping
    public ResponseEntity<?> getAll(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        if (page < 0 || limit <= 0) {
            return ResponseEntity.badRequest().body("Invalid page or limit");
        }
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        Page<ProductResponse> productPage = productService.getAll(pageRequest);

        int totalPages = productPage.getTotalPages();
        List<ProductResponse> products = productPage.getContent();

        return ResponseEntity.ok(new ProductListResponse(products, totalPages));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllProduct() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProduct());
    }

    @PostMapping
    public ResponseEntity<Product> create(@ModelAttribute ProductRequest productRequest) {
        try {
            Product savedProduct = productService.create(productRequest);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @ModelAttribute ProductRequest productRequest) {
        try {
            productService.update(id, productRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws DataNotFoundException {
        try {
            productService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/product-details")
    public ResponseEntity<?> getAllProductDetail() {
        return ResponseEntity.status(HttpStatus.OK).body(productDetailService.getAll());
    }

    @GetMapping("/product-details-page")
    public ResponseEntity<?> getAllWithPage(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        if (page < 0 || limit <= 0) {
            return ResponseEntity.badRequest().body("Invalid page or limit");
        }
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        Page<ProductDetailResponse> productDetailPage = productDetailService.getAllWithPage(pageRequest);

        int totalPages = productDetailPage.getTotalPages();
        List<ProductDetailResponse> productDetails = productDetailPage.getContent();

        return ResponseEntity.ok(new ProductDetailListResponse(productDetails, totalPages));
    }

    @GetMapping("/product-details/{productId}")
    public ResponseEntity<?> getAllByProductIdWithPage(
            @PathVariable Long productId, @RequestParam("page") int page, @RequestParam("limit") int limit) {
        if (page < 0 || limit <= 0) {
            return ResponseEntity.badRequest().body("Invalid page or limit");
        }
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        Page<ProductDetailResponse> productDetailPage = productDetailService.getAllByProductId(productId, pageRequest);

        int totalPages = productDetailPage.getTotalPages();
        List<ProductDetailResponse> productDetails = productDetailPage.getContent();

        return ResponseEntity.ok(new ProductDetailListResponse(productDetails, totalPages));
    }

    @GetMapping("/product-details/by-colorId/{colorId}")
    public ResponseEntity<?> getAllProductDetailByColorId(@PathVariable Long colorId) {
        return ResponseEntity.status(HttpStatus.OK).body(productDetailService.getAllByColorId(colorId));
    }

    @PostMapping("/product-details")
    public ResponseEntity<?> createProductDetail(@ModelAttribute AddProductDetailRequest addProductDetailRequest) {
        try {
            List<ProductDetail> saveProductDetail = productDetailService.create(addProductDetailRequest);
            return ResponseEntity.status(HttpStatus.OK).body(saveProductDetail);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/product-details/{id}")
    public ResponseEntity<?> updateProductDetail(
            @PathVariable Long id, @ModelAttribute UpdateProductDetailRequest updateProductDetailRequest) {
        try {
            productDetailService.update(id, updateProductDetailRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/product-details/{id}")
    public ResponseEntity<String> deleteProductDetail(@PathVariable Long id) {
        try {
            productDetailService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

//    @DeleteMapping("/product-details")
//    public ResponseEntity<String> deleteProductDetailByProperty(@ModelAttribute DeleteProductDetailRequest request) {
//        productDetailService.deleteByColorIdAndSizeId(request);
//        return ResponseEntity.ok("Xóa thông tin cũ thành công");
//    }

}
