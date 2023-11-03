package com.shop.oniamey.core.admin.product.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.shop.oniamey.core.admin.product.model.request.ImageRequest;
import com.shop.oniamey.core.admin.product.service.IImageService;
import com.shop.oniamey.entity.Image;
import com.shop.oniamey.entity.ProductDetail;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import com.shop.oniamey.repository.product.ImageRepository;
import com.shop.oniamey.repository.product.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService implements IImageService {

    private final ProductDetailRepository productDetailRepository;

    private final ImageRepository imageRepository;

    @Value("${aws.bucket.name}")
    private String bucketName;

    private final AmazonS3 s3Client;

    @Override
    public Image getById(Long id) throws DataNotFoundException {
        return imageRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Image not found"));
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    private boolean isImageFile(String fileExtension) {
        List<String> imageExtensions = Arrays.asList("jpg", "jpeg", "png", "gif", "bmp");
        return imageExtensions.contains(fileExtension.toLowerCase());
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

            List<Image> temporaryImages = new ArrayList<>();

            for (MultipartFile imageFile : imageRequest.getImageUrl()) {
                if (imageFile.getSize() == 0) {
                    continue;
                }

                String fileExtension = FilenameUtils.getExtension(imageFile.getOriginalFilename());
                if (!isImageFile(fileExtension)) {
                    continue;
                }

                File file = new File(imageFile.getOriginalFilename());
                try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {
                    fileOutputStream.write(imageFile.getBytes());
                }
                String fileName = generateFileName(imageFile);

                PutObjectRequest request = new PutObjectRequest(bucketName, fileName, file);
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentType("plain/" + FilenameUtils.getExtension(imageFile.getOriginalFilename()));
                metadata.addUserMetadata("Title", "File Upload - " + fileName);
                metadata.setContentLength(file.length());
                request.setMetadata(metadata);
                s3Client.putObject(request);

                Image image = new Image();
                image.setProductDetail(existingProductDetail);
                image.setImageUrl(fileName);
                image.setCreatedBy(1L);
                image.setUpdatedBy(1L);
                image.setDeleted(false);

                temporaryImages.add(image);

                images.add(imageRepository.save(image));
                if (!temporaryImages.isEmpty()) {
                    existingProductDetail.setCover(temporaryImages.get(0).getImageUrl());
                    productDetailRepository.save(existingProductDetail);
                }
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

}
