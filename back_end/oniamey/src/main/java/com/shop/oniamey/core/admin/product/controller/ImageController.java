package com.shop.oniamey.core.admin.product.controller;

import com.shop.oniamey.core.admin.product.model.request.ImageRequest;
import com.shop.oniamey.core.admin.product.service.IImageService;
import com.shop.oniamey.entity.Image;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/images")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ImageController {

    private final IImageService imageService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> upload(@ModelAttribute ImageRequest imageRequest) throws IOException, DataNotFoundException {
        try {
            if (imageRequest.getImageUrl().size() > Image.MAXIMUM_IMAGE_PER_PRODUCT) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can only upload a maximum of 5 images");
            }
            imageService.uploadImages(imageRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad request: " + e.getMessage());
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Data not found: " + e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws DataNotFoundException {
        try {
            imageService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("Successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}