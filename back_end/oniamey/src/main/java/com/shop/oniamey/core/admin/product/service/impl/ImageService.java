package com.shop.oniamey.core.admin.product.service.impl;

import com.shop.oniamey.core.admin.product.model.request.ImageRequest;
import com.shop.oniamey.core.admin.product.service.IImageService;
import com.shop.oniamey.entity.Image;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.ImageRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService implements IImageService {

    private final ProductDetailRepository productDetailRepository;

    private final ImageRepository imageRepository;

    @Override
    public Image getById(Long id) throws DataNotFoundException {
        return imageRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Image not found"));
    }

    @Override
    public List<Image> uploadImages(ImageRequest imageRequest) throws DataNotFoundException, IOException {
        List<Image> images = new ArrayList<>();

        for (Long productDetailId : imageRequest.getProductDetailId()) {
            ProductDetail existingProductDetail = productDetailRepository.findById(productDetailId)
                    .orElseThrow(() -> new DataNotFoundException("ProductDetail not found"));

            if (existingProductDetail.getColor().getId() != imageRequest.getColorId()) {
                continue;
            }

            for (MultipartFile imageFile : imageRequest.getImageUrl()) {
                if (imageFile.getSize() == 0) {
                    continue;
                }
                if (imageFile.getSize() > 10 * 1024 * 1024) {
                    throw new IllegalArgumentException("File is too large");
                }
                if (!isImageFile(imageFile)) {
                    throw new IllegalArgumentException("File must be an image");
                }

                String filename = storeFile(imageFile);

                Image image = new Image();
                image.setProductDetail(existingProductDetail);
                image.setImageUrl(filename);
                image.setCreatedBy(1L);
                image.setUpdatedBy(1L);
                image.setDeleted(false);

                images.add(imageRepository.save(image));
            }
        }
        return images;
    }

    @Override
    public void delete(Long id) throws DataNotFoundException {
        Image existingImage = getById(id);
        existingImage.setDeleted(true);
        imageRepository.save(existingImage);
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (!isImageFile(file) || file.getOriginalFilename() == null) {
            throw new IOException(("Invalid image format"));
        }
        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }

    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    //    @Override
//    public List<Image> uploadImagesForMultipleProductDetails(List<Long> productDetailIds, Long colorId, List<MultipartFile> imageFiles) throws DataNotFoundException, IOException {
//        List<Image> images = new ArrayList<>();
//
//        for (Long productDetailId : productDetailIds) {
//            ProductDetail existingProductDetail = productDetailRepository.findById(productDetailId)
//                    .orElseThrow(() -> new DataNotFoundException("ProductDetail not found"));
//
//            if (existingProductDetail.getColor().getId() != colorId) {
//                continue;
//            }
//
//            for (MultipartFile imageFile : imageFiles) {
//
//                if (imageFile.getSize() == 0) {
//                    continue;
//                }
//
//                if (imageFile.getSize() > 10 * 1024 * 1024) {
//                    throw new IllegalArgumentException("File is too large");
//                }
//
//                if (!isImageFile(imageFile)) {
//                    throw new IllegalArgumentException("File must be an image");
//                }
//
//                String filename = storeFile(imageFile);
//
//                Image image = new Image();
//                image.setProductDetail(existingProductDetail);
//                image.setImageUrl(filename);
//                image.setCreatedBy(1L);
//                image.setUpdatedBy(1L);
//                image.setDeleted(false);
//
//                images.add(imageRepository.save(image));
//            }
//        }
//        return images;
//    }

}
