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
import com.shop.oniamey.util.QRCodeProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

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
    public Product create(ProductRequest productRequest) throws IOException, WriterException {
        String randomCode = QRCodeProduct.generateRandomCode();
        Product product = new Product();
        product.setCode(randomCode);
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setCreatedBy(productRequest.getCreatedBy());
        product.setUpdatedBy(productRequest.getUpdatedBy());
        Product savedProduct = productRepository.save(product);
        QRCodeProduct.generateQRCode(savedProduct);
        return savedProduct;
    }

    @Override
    public Product update(Long productId, ProductRequest productRequest) throws DataNotFoundException, IOException, WriterException {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new DataNotFoundException("Product not found"));
        String randomCode = QRCodeProduct.generateRandomCode();
        existingProduct.setName(productRequest.getName());
        existingProduct.setCode(randomCode);
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setCreatedBy(productRequest.getCreatedBy());
        existingProduct.setUpdatedBy(productRequest.getUpdatedBy());
        existingProduct.setDeleted(productRequest.getDeleted());
        productRepository.save(existingProduct);
        QRCodeProduct.generateQRCode(existingProduct);
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


    //    @Override
//    public Product create(ProductRequest productRequest) throws IOException, WriterException {
//        String randomCode = QRCodeProduct.generateRandomCode();
//        Product product = new Product();
//        product.setCode(randomCode);
//        product.setName(productRequest.getName());
//        product.setDescription(productRequest.getDescription());
//        product.setCreatedBy(productRequest.getCreatedBy());
//        product.setUpdatedBy(productRequest.getUpdatedBy());
//
//        Product savedProduct = productRepository.save(product);
//
////        if (savedProduct != null) {
////            List<ProductDetailRequest> productDetailRequests = productRequest.getProductDetail();
////            if (productDetailRequests != null) {
////                for (ProductDetailRequest productDetailRequest : productDetailRequests) {
////                    Set<Long> colorIds = productDetailRequest.getColorId();
////                    Set<Long> sizeIds = productDetailRequest.getSizeId();
////
////                    for (Long colorId : colorIds) {
////                        for (Long sizeId : sizeIds) {
////
////                            ProductDetail productDetail = new ProductDetail();
////
////                            productDetail.setProduct(savedProduct);
////                            productDetail.setColor(colorRepository.findById(colorId).orElse(null));
////                            productDetail.setSize(sizeRepository.findById(sizeId).orElse(null));
////                            productDetail.setCategory(categoryRepository.findById(productDetailRequest.getCategoryId()).orElse(null));
////                            productDetail.setMaterial(materialRepository.findById(productDetailRequest.getMaterialId()).orElse(null));
////                            productDetail.setBrand(brandRepository.findById(productDetailRequest.getBrandId()).orElse(null));
////                            productDetail.setCollar(collarRepository.findById(productDetailRequest.getCollarId()).orElse(null));
////                            productDetail.setSleeveLenght(sleeveLenghtRepository.findById(productDetailRequest.getSleeveLengthId()).orElse(null));
////                            productDetail.setGender(productDetailRequest.getGender());
////                            productDetail.setPrice(productDetailRequest.getPrice());
////                            productDetail.setQuantity(productDetailRequest.getQuantity());
////                            productDetail.setWeight(productDetailRequest.getWeight());
////                            productDetail.setCreatedBy(productDetailRequest.getCreatedBy());
////                            productDetail.setUpdatedBy(productDetailRequest.getUpdatedBy());
////                            productDetailRepository.save(productDetail);
////
////                        }
////                    }
////                }
////            }
//            QRCodeProduct.generateQRCode(savedProduct);
//            return savedProduct;
//        }
////        return null;
////    }
}
