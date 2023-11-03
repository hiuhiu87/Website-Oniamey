package com.shop.oniamey.infrastructure.config;

import com.shop.oniamey.entity.Brand;
import com.shop.oniamey.entity.Category;
import com.shop.oniamey.entity.Collar;
import com.shop.oniamey.entity.Color;
import com.shop.oniamey.entity.Material;
import com.shop.oniamey.entity.Product;
import com.shop.oniamey.entity.Size;
import com.shop.oniamey.entity.SleeveLength;
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
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FakeData {

    private final BrandRepository brandRepository;

    private final CategoryRepository categoryRepository;

    private final CollarRepository collarRepository;

    private final ColorRepository colorRepository;

    private final ImageRepository imageRepository;

    private final MaterialRepository materialRepository;

    private final ProductDetailRepository productDetailRepository;

    private final ProductRepository productRepository;

    private final SizeRepository sizeRepository;

    private final SleeveLengthRepository sleeveLengthRepository;

    @PostConstruct
    public void fakeAllDataWebsiteOniamey() {

//        fakeDataProduct();

        fakeDataBrand();

        fakeDataCategory();

        fakeDataCollar();

        fakeDataColor();

        fakeDataMaterial();

        fakeDataSize();

        fakeDataSleeveLength();

    }

//    public void fakeDataProduct() {
//        Product product = new Product();
//        product.setProductName("Áo 1");
//        product.setCode(QRCodeProduct.generateRandomCode());
//        product.setDescription("Áo Phông cao cấp");
//        product.setDeleted(false);
//        productRepository.save(product);
//
//        Product product1 = new Product();
//        product1.setProductName("Áo 2");
//        product1.setCode(QRCodeProduct.generateRandomCode());
//        product1.setDescription("Áo Phông rẻ tiền");
//        product1.setDeleted(true);
//        productRepository.save(product1);
//
//        Product product2 = new Product();
//        product2.setProductName("Áo 3");
//        product2.setCode(QRCodeProduct.generateRandomCode());
//        product2.setDescription("Áo Phông cao cấp");
//        product2.setDeleted(false);
//        productRepository.save(product2);
//
//        Product product3 = new Product();
//        product3.setProductName("Áo 4");
//        product3.setCode(QRCodeProduct.generateRandomCode());
//        product3.setDescription("Áo Phông rẻ tiền");
//        product3.setDeleted(true);
//        productRepository.save(product3);
//
//        Product product4 = new Product();
//        product4.setProductName("Áo 5");
//        product4.setCode(QRCodeProduct.generateRandomCode());
//        product4.setDescription("Áo Phông cao cấp");
//        product4.setDeleted(false);
//        productRepository.save(product4);
//    }

    public void fakeDataBrand() {
        Brand brand = new Brand();
        brand.setName("Brand 1");
        brand.setDeleted(false);
        brandRepository.save(brand);

        Brand brand1 = new Brand();
        brand1.setName("Brand 2");
        brand1.setDeleted(true);
        brandRepository.save(brand1);
    }

    public void fakeDataCategory() {
        Category category = new Category();
        category.setName("Category 1");
        category.setDeleted(false);
        categoryRepository.save(category);

        Category category1 = new Category();
        category1.setName("Category 2");
        category1.setDeleted(true);
        categoryRepository.save(category1);
    }

    public void fakeDataCollar() {
        Collar collar = new Collar();
        collar.setName("Collar 1");
        collar.setDeleted(false);
        collarRepository.save(collar);

        Collar collar1 = new Collar();
        collar1.setName("Collar 2");
        collar1.setDeleted(true);
        collarRepository.save(collar1);
    }

    public void fakeDataColor() {
        Color color = new Color();
        color.setName("Color 1");
        color.setDeleted(false);
        colorRepository.save(color);

        Color color1 = new Color();
        color1.setName("Color 2");
        color1.setDeleted(true);
        colorRepository.save(color1);
    }

    public void fakeDataMaterial() {
        Material material = new Material();
        material.setName("Material 1");
        material.setDeleted(false);
        materialRepository.save(material);

        Material material1 = new Material();
        material1.setName("Material 2");
        material1.setDeleted(true);
        materialRepository.save(material1);
    }

    public void fakeDataSize() {
        Size size = new Size();
        size.setName("S");
        size.setDeleted(false);
        sizeRepository.save(size);

        Size size2 = new Size();
        size2.setName("M");
        size2.setDeleted(true);
        sizeRepository.save(size2);

        Size size3 = new Size();
        size3.setName("L");
        size3.setDeleted(false);
        sizeRepository.save(size3);
    }

    public void fakeDataSleeveLength() {
        SleeveLength sleeveLength1 = new SleeveLength();
        sleeveLength1.setName("Ngắn tay");
        sleeveLength1.setDeleted(false);
        sleeveLengthRepository.save(sleeveLength1);

        // Tạo chiều dài tay 2
        SleeveLength sleeveLength2 = new SleeveLength();
        sleeveLength2.setName("Dài tay");
        sleeveLength2.setDeleted(true);
        sleeveLengthRepository.save(sleeveLength2);

    }

}