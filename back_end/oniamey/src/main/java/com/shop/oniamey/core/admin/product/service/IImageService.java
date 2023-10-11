package com.shop.oniamey.core.admin.product.service;

import com.shop.oniamey.core.admin.product.model.request.ImageRequest;
import com.shop.oniamey.entity.Image;
import com.shop.oniamey.infrastructure.exception.DataNotFoundException;

import java.io.IOException;
import java.util.List;

public interface IImageService {

//    List<Image> uploadImagesForMultipleProductDetails(List<Long> productDetailIds, Long colorId, List<MultipartFile> imageFiles) throws DataNotFoundException, IOException;

    Image getById(Long id) throws DataNotFoundException;

    List<Image> uploadImages(ImageRequest imageRequest) throws DataNotFoundException, IOException;

    void delete(Long id) throws DataNotFoundException;

}
