package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.entity.Image;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.repository.product.ImageRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyDeleteService {

    private final ProductDetailRepository productDetailRepository;

    private final ImageRepository imageRepository;

    public void deleteProductDetail(ProductDetail productDetail) {
        productDetail.setDeleted(true);
        List<Image> existingImages = imageRepository.findByProductDetailId(productDetail.getId());
        for (Image image : existingImages) {
            image.setDeleted(true);
        }
        imageRepository.saveAll(existingImages);
        productDetailRepository.save(productDetail);
    }

}
