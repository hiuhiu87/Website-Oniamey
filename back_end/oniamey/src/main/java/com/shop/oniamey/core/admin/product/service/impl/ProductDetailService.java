package com.shop.oniamey.core.admin.product.service.impl;

import com.google.zxing.WriterException;
import com.shop.oniamey.core.admin.product.model.request.AddProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.request.UpdateProductDetailRequest;
import com.shop.oniamey.core.admin.product.model.response.ProductDetailResponse;
import com.shop.oniamey.core.admin.product.service.IProductDetailService;
import com.shop.oniamey.entity.Brand;
import com.shop.oniamey.entity.Category;
import com.shop.oniamey.entity.Collar;
import com.shop.oniamey.entity.Color;
import com.shop.oniamey.entity.Image;
import com.shop.oniamey.entity.Material;
import com.shop.oniamey.entity.Product;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.entity.Size;
import com.shop.oniamey.entity.SleeveLength;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.BrandRepository;
import com.shop.oniamey.repository.product.CategoryRepository;
import com.shop.oniamey.repository.product.CollarRepository;
import com.shop.oniamey.repository.product.ColorRepository;
import com.shop.oniamey.repository.product.ImageRepository;
import com.shop.oniamey.repository.product.MaterialRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import com.shop.oniamey.repository.product.ProductRepository;
import com.shop.oniamey.repository.product.SizeRepository;
import com.shop.oniamey.repository.product.SleeveLengthRepository;
import lombok.RequiredArgsConstructor;
import com.shop.oniamey.util.QRCodeProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.DateTimeException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductDetailService implements IProductDetailService {

    private final ProductRepository productRepository;

    private final ProductDetailRepository productDetailRepository;

    private final ColorRepository colorRepository;

    private final SizeRepository sizeRepository;

    private final BrandRepository brandRepository;

    private final CategoryRepository categoryRepository;

    private final CollarRepository collarRepository;

    private final MaterialRepository materialRepository;

    private final SleeveLengthRepository sleeveLengthRepository;

    private final ImageRepository imageRepository;

    @Override
    public List<ProductDetailResponse> getAll() {
        return productDetailRepository.getAll();
    }

    @Override
    public ProductDetail getById(Long id) throws DataNotFoundException {
        return productDetailRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("ProductDetail not found"));
    }

    @Override
    public List<ProductDetailResponse> getAllByProductId(Long productId) {
        return productDetailRepository.getAllByProductId(productId);
    }

    private <T> T getPropertyById(Long id, JpaRepository<T, Long> repository, String propertyName) throws DataNotFoundException {
        return repository.findById(id)
                .orElseThrow(() ->
                        new DataNotFoundException(propertyName + " not found" + " with id: " + id));
    }

    @Override
    public List<ProductDetail> create(AddProductDetailRequest addProductDetailRequest) throws IOException, DataNotFoundException, WriterException {
        Product existingProduct = getPropertyById(addProductDetailRequest.getProductId(), productRepository, "Product");
        Category existingCategory = getPropertyById(addProductDetailRequest.getCategoryId(), categoryRepository, "Category");
        Material existingMaterial = getPropertyById(addProductDetailRequest.getMaterialId(), materialRepository, "Material");
        Brand existingBrand = getPropertyById(addProductDetailRequest.getBrandId(), brandRepository, "Brand");
        Collar existingCollar = getPropertyById(addProductDetailRequest.getCollarId(), collarRepository, "Collar");
        SleeveLength existingSleeveLength = getPropertyById(addProductDetailRequest.getSleeveLengthId(), sleeveLengthRepository, "SleeveLength");

        List<ProductDetail> productDetails = new ArrayList<>();
        if (existingProduct != null) {
            Set<Long> colorIds = addProductDetailRequest.getColorId();
            Set<Long> sizeIds = addProductDetailRequest.getSizeId();

            for (Long colorId : colorIds) {
                for (Long sizeId : sizeIds) {

                    ProductDetail productDetail = new ProductDetail();

                    productDetail.setProduct(existingProduct);
                    productDetail.setColor(colorRepository.findById(colorId).orElseThrow(() ->new DataNotFoundException("Color not found")));
                    productDetail.setSize(sizeRepository.findById(sizeId).orElseThrow(() -> new DataNotFoundException("Size not found")));
                    productDetail.setCategory(existingCategory);
                    productDetail.setMaterial(existingMaterial);
                    productDetail.setBrand(existingBrand);
                    productDetail.setCollar(existingCollar);
                    productDetail.setSleeveLength(existingSleeveLength);
                    String randomCode = QRCodeProduct.generateRandomCode();
                    productDetail.setCode(randomCode);
                    productDetail.setName(existingProduct.getName() + " - " + " ["
                            + productDetail.getColor().getName() + "]" + " [" + productDetail.getSize().getName() + "]");
                    productDetail.setGender(addProductDetailRequest.getGender());
                    productDetail.setPrice(addProductDetailRequest.getPrice());
                    productDetail.setQuantity(addProductDetailRequest.getQuantity());
                    productDetail.setWeight(addProductDetailRequest.getWeight());
                    ProductDetail savedProductDetail = productDetailRepository.save(productDetail);
                    productDetails.add(savedProductDetail);
                    productDetailRepository.save(productDetail);
                    QRCodeProduct.generateQRCode(productDetail);
                }
            }
        }
        return productDetails;
    }

    @Override
    public ProductDetail update(Long id, UpdateProductDetailRequest updateProductDetailRequest) throws DataNotFoundException {
        ProductDetail existingProductDetail = productDetailRepository.findById(id)
                .orElseThrow(() -> new DateTimeException("ProductDetail not found"));
        Category existingCategory = getPropertyById(updateProductDetailRequest.getCategoryId(), categoryRepository, "Category");
        Material existingMaterial = getPropertyById(updateProductDetailRequest.getMaterialId(), materialRepository, "Material");
        Brand existingBrand = getPropertyById(updateProductDetailRequest.getBrandId(), brandRepository, "Brand");
        Collar existingCollar = getPropertyById(updateProductDetailRequest.getCollarId(), collarRepository, "Collar");
        SleeveLength existingSleeveLength = getPropertyById(updateProductDetailRequest.getSleeveLengthId(), sleeveLengthRepository, "SleeveLength");
        Color existingColor = getPropertyById(updateProductDetailRequest.getColorId(), colorRepository, "Color");
        Size existingSize = getPropertyById(updateProductDetailRequest.getSizeId(), sizeRepository, "Size");

        String randomCode = QRCodeProduct.generateRandomCode();

        existingProductDetail.setCategory(existingCategory);
        existingProductDetail.setSize(existingSize);
        existingProductDetail.setMaterial(existingMaterial);
        existingProductDetail.setBrand(existingBrand);
        existingProductDetail.setColor(existingColor);
        existingProductDetail.setCollar(existingCollar);
        existingProductDetail.setSleeveLength(existingSleeveLength);
        existingProductDetail.setName(updateProductDetailRequest.getName());
        existingProductDetail.setCode(randomCode);
        existingProductDetail.setGender(updateProductDetailRequest.getGender());
        existingProductDetail.setPrice(updateProductDetailRequest.getPrice());
        existingProductDetail.setQuantity(updateProductDetailRequest.getQuantity());
        existingProductDetail.setWeight(updateProductDetailRequest.getWeight());
        existingProductDetail.setUpdatedBy(updateProductDetailRequest.getUpdatedBy());
        existingProductDetail.setDeleted(updateProductDetailRequest.getDeleted());

        productDetailRepository.save(existingProductDetail);

        return existingProductDetail;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        ProductDetail existingProductDetail = productDetailRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("ProductDetail not found"));
        List<Image> images = imageRepository.findByProductDetailId(id);
        for (Image image : images) {
            image.setDeleted(true);
        }
        existingProductDetail.setDeleted(true);
        productDetailRepository.save(existingProductDetail);
    }

}
