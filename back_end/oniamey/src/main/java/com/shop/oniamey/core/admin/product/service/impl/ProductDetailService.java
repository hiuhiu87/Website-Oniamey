package com.shop.oniamey.core.admin.product.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.DateTimeException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final AmazonS3 s3Client;

    @Override
    public Page<ProductDetailResponse> getAllWithPage(PageRequest pageRequest) {
        return productDetailRepository.getAll(pageRequest);
    }

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
    public Page<ProductDetailResponse> getAllByProductId(Long productId, PageRequest pageRequest) {
        return productDetailRepository.getAllByProductId(productId, pageRequest);
    }

    @Override
    public List<ProductDetailResponse> getAllByColorId(Long colorId) {
        return productDetailRepository.getAllByColorId(colorId);
    }

    private <T> T getPropertyById(Long id, JpaRepository<T, Long> repository, String propertyName) throws DataNotFoundException {
        return repository.findById(id)
                .orElseThrow(() ->
                        new DataNotFoundException(propertyName + " not found" + " with id: " + id));
    }

    private String generateRandomCode() {
        return "Oniamey-" + UUID.randomUUID().toString().substring(0, 8);
    }

    public void generateQRCode(ProductDetail productDetail) throws WriterException, IOException {
        String qrCodeName = productDetail.getName() + "-QRCODE.png";
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(
                "Code: " + productDetail.getCode() + "\n"
                        + "Name: " + productDetail.getName() + "\n"
                        + "Category: " + productDetail.getCategory().getName() + "\n"
                        + "Brand: " + productDetail.getBrand().getName() + "\n"
                        + "Material: " + productDetail.getMaterial().getName() + "\n"
                        + "Color: " + productDetail.getColor().getName() + "\n"
                        + "Size: " + productDetail.getSize().getName() + "\n"
                , BarcodeFormat.QR_CODE, 400, 400);

        // Tạo ảnh từ BitMatrix
        BufferedImage qrCodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        // Lưu ảnh vào file tạm
        File tempFile = File.createTempFile("qrcode", ".png");
        ImageIO.write(qrCodeImage, "png", tempFile);

        PutObjectRequest request = new PutObjectRequest(bucketName, qrCodeName, tempFile);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("image/png");
        metadata.setContentLength(tempFile.length());
        request.setMetadata(metadata);

        s3Client.putObject(request);

        tempFile.delete();

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
            List<Long> colorIds = addProductDetailRequest.getColorId();
            List<Long> sizeIds = addProductDetailRequest.getSizeId();
            List<String> names = addProductDetailRequest.getNames();
            List<Long> quantities = addProductDetailRequest.getQuantities();
            List<Float> prices = addProductDetailRequest.getPrices();

            for (int i = 0; i < colorIds.size(); i++) {
                for (int j = 0; j < sizeIds.size(); j++) {
                    Long colorId = colorIds.get(i);
                    Long sizeId = sizeIds.get(j);
                    Long quantity = quantities.get(i * sizeIds.size() + j);
                    Float price = prices.get(i * sizeIds.size() + j);
                    String name = names.get(i * sizeIds.size() + j);

                    ProductDetail existingProductDetail = productDetailRepository.getProductByProperty(
                            existingProduct.getId(),
                            colorId, sizeId, existingMaterial.getId(),
                            existingBrand.getId(), existingCollar.getId(),
                            existingSleeveLength.getId()
                    );

                    if (existingProductDetail != null) {
                        Long newQuantity = existingProductDetail.getQuantity() + quantity;
                        existingProductDetail.setQuantity(newQuantity);
                        existingProductDetail.setPrice(price);
                        productDetailRepository.save(existingProductDetail);
                        productDetails.add(existingProductDetail);
                    } else {
                        ProductDetail productDetail = new ProductDetail();
                        productDetail.setProduct(existingProduct);
                        productDetail.setColor(colorRepository.findById(colorId).orElseThrow(() -> new DataNotFoundException("Color not found")));
                        productDetail.setSize(sizeRepository.findById(sizeId).orElseThrow(() -> new DataNotFoundException("Size not found")));
                        productDetail.setCategory(existingCategory);
                        productDetail.setMaterial(existingMaterial);
                        productDetail.setBrand(existingBrand);
                        productDetail.setCollar(existingCollar);
                        productDetail.setSleeveLength(existingSleeveLength);
                        productDetail.setCode(generateRandomCode());
                        productDetail.setName(name);
                        productDetail.setGender(true);
                        productDetail.setPrice(price);
                        productDetail.setQuantity(quantity);
                        productDetail.setWeight(addProductDetailRequest.getWeight());
                        productDetail.setDeleted(false);
                        ProductDetail savedProductDetail = productDetailRepository.save(productDetail);
                        productDetails.add(savedProductDetail);
                        generateQRCode(productDetail);
                    }
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

        existingProductDetail.setCategory(existingCategory);
        existingProductDetail.setSize(existingSize);
        existingProductDetail.setMaterial(existingMaterial);
        existingProductDetail.setBrand(existingBrand);
        existingProductDetail.setColor(existingColor);
        existingProductDetail.setCollar(existingCollar);
        existingProductDetail.setSleeveLength(existingSleeveLength);
        existingProductDetail.setName(updateProductDetailRequest.getName());
        existingProductDetail.setCode(generateRandomCode());
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
