package com.shop.oniamey.core.admin.product.service.impl;

import com.google.zxing.WriterException;
import com.shop.oniamey.core.admin.product.model.request.ProductRequest;
import com.shop.oniamey.core.admin.product.model.response.ProductResponse;
import com.shop.oniamey.core.admin.product.service.IProductService;
import com.shop.oniamey.entity.Image;
import com.shop.oniamey.entity.Product;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.ImageRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import com.shop.oniamey.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final ProductRepository productRepository;

    private final ProductDetailRepository productDetailRepository;

    private final ImageRepository imageRepository;

    @Override
    public Product getById(Long productId) throws DataNotFoundException {
        return productRepository.findById(productId)
                .orElseThrow(() -> new DataNotFoundException("Product not found with id: " + productId));
    }

    @Override
    public Page<ProductResponse> getAll(PageRequest pageRequest) {
        return productRepository.getAll(pageRequest);
    }

    @Override
    public List<ProductResponse> getAllProduct() {
        return productRepository.getAll();
    }

    private String generateRandomCode() {
        return "Oniamey-" + UUID.randomUUID().toString().substring(0, 8);
    }

    @Override
    public Product create(ProductRequest productRequest) throws IOException, WriterException {
        Product product = new Product();
        product.setCode(generateRandomCode());
        product.setProductName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setDeleted(false);
        Product savedProduct = productRepository.save(product);
        return savedProduct;
    }

    @Override
    public Product update(Long productId, ProductRequest productRequest) throws DataNotFoundException, IOException, WriterException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new DataNotFoundException("Product not found"));
        existingProduct.setDescription(productRequest.getDescription());
        productRepository.save(existingProduct);
        return existingProduct;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Product existingProduct = getById(id);
        existingProduct.setDeleted(true);
        List<ProductDetail> existingProductDetail = productDetailRepository.findAllByProductId(id);
        for (ProductDetail productDetail : existingProductDetail) {
            productDetail.setDeleted(true);
            List<Image> existingImage = imageRepository.findByProductDetailId(productDetail.getId());
            for (Image image : existingImage) {
                image.setDeleted(true);
            }
        }
        productDetailRepository.saveAll(existingProductDetail);
        productRepository.save(existingProduct);
    }
}